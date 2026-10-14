import { stepStates } from "./tasks/taskData";

const STORAGE_KEY = "intern-workspace-v1";
const STORAGE_VERSION = 2;
const CHANGE_EVENT = "intern-workspace-changed";

const canUseStorage = () => typeof window !== "undefined" && Boolean(window.localStorage);

const clone = (value) => JSON.parse(JSON.stringify(value));

const readStored = () => {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const statusFor = (subtasks = []) => {
  if (subtasks.length > 0 && subtasks.every((step) => step.done && step.approved)) return "Done";
  if (subtasks.some((step) => step.done)) return "In progress";
  return "To do";
};

export const getWorkspace = (initialTasks = [], initialFeedback = [], initialSubmissions) => {
  const stored = readStored();
  const shouldResetLegacySuggestions = Boolean(stored && stored.version !== STORAGE_VERSION);
  const storedFeedback = (stored?.feedback?.length ? stored.feedback : clone(initialFeedback)).map((item) => {
    const canonical = initialFeedback.find((entry) => entry.id === item.id);
    return canonical
      ? { ...item, taskId: canonical.taskId, title: canonical.title, project: canonical.project }
      : item;
  });
  const storedTasks = stored?.tasks?.length
    ? stored.tasks.map((task) => ({
        ...task,
        subtasks: (task.subtasks || []).filter((step) => {
          return !shouldResetLegacySuggestions || !step.sourceFeedbackId;
        }),
      }))
    : null;
  const tasks = storedTasks || clone(initialTasks);
  const feedback = storedFeedback.map((item) => {
    const task = tasks.find((entry) => String(entry.id) === String(item.taskId));
    if (shouldResetLegacySuggestions) {
      const { addedSuggestionIds, ...cleanItem } = item;
      return task?.project ? { ...cleanItem, project: task.project } : cleanItem;
    }
    const existing = (task?.subtasks || [])
      .map((step) => step.sourceFeedbackId === item.id ? step.id : null)
      .filter(Boolean)
      .map((id) => Number(id.split("-").pop()))
      .filter((index) => Number.isInteger(index));
    const addedSuggestionIds = [...new Set([...(item.addedSuggestionIds || []), ...existing])];
    const normalized = task?.project && item.project !== task.project ? { ...item, project: task.project } : item;
    return addedSuggestionIds.length ? { ...normalized, addedSuggestionIds } : normalized;
  });
  // Submissions are optional so older callers keep working. They are seeded once
  // (when never stored) and then always win over the step state they are linked to.
  const storedSubmissions = stored?.submissions;
  let submissions = storedSubmissions ?? (initialSubmissions ? clone(initialSubmissions) : undefined);
  let syncedTasks = tasks;
  if (submissions) {
    syncedTasks = applySubmissionsToTasks(tasks, submissions);
    submissions = decorateSubmissions(submissions, syncedTasks);
  }
  const syncChanged =
    JSON.stringify(syncedTasks) !== JSON.stringify(tasks) ||
    (storedSubmissions !== undefined && JSON.stringify(submissions) !== JSON.stringify(storedSubmissions));
  const justSeeded = storedSubmissions === undefined && submissions !== undefined;
  return {
    tasks: syncedTasks,
    feedback,
    submissions,
    changed: !stored || shouldResetLegacySuggestions || justSeeded || syncChanged,
  };
};

export const addSuggestionToTask = (tasks = [], feedbackItem, suggestionIndex) => {
  if (!feedbackItem?.taskId || !feedbackItem.improvements?.[suggestionIndex]) return tasks;
  const suggestionId = `feedback-${feedbackItem.id}-${suggestionIndex}`;
  return tasks.map((task) => {
    if (task.id !== feedbackItem.taskId && String(task.id) !== String(feedbackItem.taskId)) return task;
    if ((task.subtasks || []).some((step) => step.id === suggestionId)) return task;
    const subtasks = [
      ...(task.subtasks || []),
      {
        id: suggestionId,
        text: feedbackItem.improvements[suggestionIndex],
        done: false,
        approved: true,
        sourceFeedbackId: feedbackItem.id,
      },
    ];
    const status = statusFor(subtasks);
    return { ...task, subtasks, status, overdue: status === "Done" ? false : task.overdue };
  });
};

// Pass only what changed, for example saveWorkspace({ submissions }). Anything left out is
// taken from storage, and linked steps are re-synced from their submissions every time.
export const saveWorkspace = (partial = {}) => {
  if (!canUseStorage()) return;
  const stored = readStored() || {};
  let tasks = partial.tasks ?? stored.tasks;
  const feedback = partial.feedback ?? stored.feedback ?? [];
  let submissions = partial.submissions ?? stored.submissions;
  if (tasks && submissions) {
    tasks = applySubmissionsToTasks(tasks, submissions);
    submissions = decorateSubmissions(submissions, tasks);
  }
  const payload = {
    version: STORAGE_VERSION,
    tasks: clone(tasks || []),
    feedback: clone(feedback),
    ...(submissions ? { submissions: clone(submissions) } : {}),
    updatedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: payload }));
  } catch {
    // The pages remain usable if storage is unavailable or full.
  }
};

/* ------------------------------------------------------------------ *
 * Tasks <-> Submit work
 *
 * A step can be linked to a submission (submission.taskId + submission.stepId).
 * The submission status is the source of truth for that step:
 *
 *   Pending            -> step done, waiting for the mentor   ("review")
 *   Approved           -> step done and approved               ("done", next step unlocks)
 *   Changes Requested  -> step back to "current", with the mentor note
 *   Withdrawn/deleted  -> step back to "current"
 * ------------------------------------------------------------------ */

const PENDING_STATUSES = ["Pending", "Submitted", "Under Review"];
const CHANGES_STATUSES = ["Changes Requested", "Needs Revision", "Revision Requested"];
const stepKey = (taskId, stepId) => `${taskId}::${stepId}`;

const stepFromSubmission = (step, submission) => {
  const { changesRequested, reviewNote, ...rest } = step;
  const base = { ...rest, submissionId: submission.id };
  if (submission.status === "Approved") return { ...base, done: true, approved: true };
  if (CHANGES_STATUSES.includes(submission.status)) {
    return { ...base, done: false, approved: false, changesRequested: true, reviewNote: submission.feedback || "" };
  }
  return { ...base, done: true, approved: false };
};

const resetStep = (step) => {
  const { submissionId, changesRequested, reviewNote, ...rest } = step;
  return { ...rest, done: false, approved: false };
};

export const applySubmissionsToTasks = (tasks = [], submissions = []) => {
  const best = new Map(); // newest non-withdrawn submission per step (list is newest first)
  submissions.forEach((submission) => {
    if (submission.taskId == null || !submission.stepId || submission.status === "Withdrawn") return;
    const key = stepKey(submission.taskId, submission.stepId);
    if (!best.has(key)) best.set(key, submission);
  });

  return tasks.map((task) => {
    let changed = false;
    const subtasks = (task.subtasks || []).map((step) => {
      const submission = best.get(stepKey(task.id, step.id));
      let next = step;
      if (submission) next = stepFromSubmission(step, submission);
      else if (step.submissionId) next = resetStep(step); // submission withdrawn or deleted
      else if (step.done && !step.approved) next = resetStep(step); // old "mark as completed" with no submission behind it
      if (JSON.stringify(next) !== JSON.stringify(step)) changed = true;
      return next;
    });
    if (!changed) return task;
    const status = statusFor(subtasks);
    return { ...task, subtasks, status, overdue: status === "Done" ? false : task.overdue };
  });
};

// Keeps task title, project and step number on a submission in sync with its task.
export const decorateSubmissions = (submissions = [], tasks = []) =>
  submissions.map((submission) => {
    if (submission.taskId == null) return submission;
    const task = tasks.find((entry) => String(entry.id) === String(submission.taskId));
    if (!task) return submission;
    const steps = task.subtasks || [];
    const index = submission.stepId ? steps.findIndex((step) => step.id === submission.stepId) : -1;
    const milestone = index >= 0 ? `Step ${index + 1} of ${steps.length}` : submission.milestone;
    if (submission.task === task.title && submission.scope === task.project && submission.milestone === milestone) {
      return submission;
    }
    return { ...submission, task: task.title, scope: task.project, milestone };
  });

// Which step a new submission belongs to: the one the intern was working on.
export const resolveSubmissionLink = (tasks = [], taskId, presetStepId = null) => {
  if (taskId == null) return { taskId: null, stepId: null };
  const task = tasks.find((entry) => String(entry.id) === String(taskId));
  if (!task) return { taskId: null, stepId: null };
  const steps = task.subtasks || [];
  const states = stepStates(steps);
  const presetIndex = presetStepId ? steps.findIndex((step) => step.id === presetStepId) : -1;
  const index = presetIndex >= 0 && states[presetIndex] === "current" ? presetIndex : states.indexOf("current");
  return { taskId: task.id, stepId: index >= 0 ? steps[index].id : null };
};

// Mentor decision. This is what the admin dashboard / backend will call.
export const reviewSubmission = (submissionId, decision, note = "") => {
  const stored = readStored();
  if (!stored?.submissions) return false;
  const approve = decision === "approve";
  const status = approve ? "Approved" : "Changes Requested";
  let found = false;
  const submissions = stored.submissions.map((submission) => {
    if (submission.id !== submissionId || submission.status === "Withdrawn") return submission;
    found = true;
    return {
      ...submission,
      status,
      feedback: note || (approve ? "Approved. Great work." : "Please review the notes and resubmit."),
      versions: (submission.versions || []).map((v, i) => (i === 0 ? { ...v, status } : v)),
    };
  });
  if (!found) return false;
  saveWorkspace({ submissions });
  return true;
};

// Dev helper so the mentor side can be tried before the backend exists:
//   workspaceDev.approve("SUB-1045")  /  workspaceDev.requestChanges("SUB-1045", "note")
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  window.workspaceDev = {
    approve: (id) => reviewSubmission(id, "approve"),
    requestChanges: (id, note) => reviewSubmission(id, "changes", note),
    reset: () => {
      window.localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    },
  };
}

export const subscribeToWorkspace = (onChange) => {
  if (typeof window === "undefined") return () => {};
  const handleChange = (event) => {
    const payload = event?.detail || readStored();
    if (payload) onChange(payload);
  };
  window.addEventListener(CHANGE_EVENT, handleChange);
  window.addEventListener("storage", handleChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
};

export { STORAGE_KEY, CHANGE_EVENT };
