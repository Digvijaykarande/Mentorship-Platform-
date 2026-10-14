"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SubmitWorkHeader from "@/components/pages/dashboard/submit-work/SubmitWorkHeader";
import SubmissionSummary from "@/components/pages/dashboard/submit-work/SubmissionSummary";
import SubmissionToolbar from "@/components/pages/dashboard/submit-work/SubmissionToolbar";
import SubmissionHistory from "@/components/pages/dashboard/submit-work/SubmissionHistory";
import SubmissionDetails from "@/components/pages/dashboard/submit-work/SubmissionDetails";
import VersionHistory from "@/components/pages/dashboard/submit-work/VersionHistory";
import SubmissionReviewSnapshot from "@/components/pages/dashboard/submit-work/SubmissionReviewSnapshot";
import NewSubmissionDialog from "@/components/pages/dashboard/submit-work/NewSubmissionDialog";
import ConfirmDialog from "@/components/pages/dashboard/submit-work/ConfirmDialog";
import { statusKey } from "@/components/pages/dashboard/submit-work/Status";
import {
  applyEdit,
  applyRestore,
  applyRevision,
  applyWithdraw,
  createSubmission,
  maxSubmissionNumber,
} from "@/components/pages/dashboard/submit-work/submissionLogic";
import { INITIAL_SUBMISSIONS } from "@/components/pages/dashboard/submit-work/submissionData";
import { INITIAL_TASKS, stepStates } from "@/components/pages/dashboard/tasks/taskData";
import {
  getWorkspace,
  resolveSubmissionLink,
  saveWorkspace,
  subscribeToWorkspace,
} from "@/components/pages/dashboard/workspaceStore";

const SUMMARY_FILTERS = {
  "total-submissions": "All",
  "submitted-work": "pending",
  "under-review": "changes",
  "approved-work": "approved",
};

export default function SubmitWorkPage() {
  const router = useRouter();
  // First render uses the seed data so server and client match; the saved
  // workspace is loaded right after mount.
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [hydrated, setHydrated] = useState(false);
  const lastJsonRef = useRef("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(INITIAL_SUBMISSIONS[0].id);
  const [dialog, setDialog] = useState({
    open: false,
    mode: "create",
    type: "Source Code",
    submissionId: null,
    preset: null, // { taskId, stepId, title, context } when opened from a task
    key: 0,
  });
  const [confirm, setConfirm] = useState(null); // { kind, id, title }
  const [toast, setToast] = useState(null); // { message, action? }
  const nextIdRef = useRef(maxSubmissionNumber(INITIAL_SUBMISSIONS));

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), toast.action ? 6000 : 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const notify = (message, action) => setToast({ message, action });

  // Load the shared workspace, then react to a link coming from the Tasks page.
  useEffect(() => {
    const workspace = getWorkspace(INITIAL_TASKS, [], INITIAL_SUBMISSIONS);
    const loaded = workspace.submissions ?? INITIAL_SUBMISSIONS;
    setTasks(workspace.tasks);
    setSubmissions(loaded);
    lastJsonRef.current = JSON.stringify(loaded);
    nextIdRef.current = Math.max(nextIdRef.current, maxSubmissionNumber(loaded));
    setSelectedId((current) =>
      loaded.some((item) => item.id === current) ? current : (loaded[0]?.id ?? null),
    );
    if (workspace.changed) {
      saveWorkspace({
        tasks: workspace.tasks,
        feedback: workspace.feedback,
        submissions: loaded,
      });
    }
    setHydrated(true);

    // ?task=ID&step=STEP  -> "Submit work" pressed on a step
    // ?submission=ID[&action=revise] -> "View submission" / "Revise" on a step
    const params = new URLSearchParams(window.location.search);
    const taskParam = params.get("task");
    const stepParam = params.get("step");
    const submissionParam = params.get("submission");
    if (submissionParam) {
      const target = loaded.find((item) => item.id === submissionParam);
      if (target) {
        setSelectedId(target.id);
        if (params.get("action") === "revise" && statusKey(target.status) === "changes") {
          setDialog({ open: true, mode: "revise", type: target.type, submissionId: target.id, preset: null, key: Date.now() });
        }
      }
    } else if (taskParam) {
      const task = workspace.tasks.find((item) => String(item.id) === taskParam);
      const steps = task?.subtasks || [];
      const index = steps.findIndex((step) => step.id === stepParam);
      if (task && index >= 0 && stepStates(steps)[index] === "current") {
        setDialog({
          open: true,
          mode: "create",
          type: "Source Code",
          submissionId: null,
          preset: {
            taskId: task.id,
            stepId: steps[index].id,
            title: steps[index].text,
            context: { stepText: steps[index].text, stepNumber: index + 1, total: steps.length },
          },
          key: Date.now(),
        });
      } else if (task && index >= 0 && steps[index].submissionId) {
        setSelectedId(steps[index].submissionId);
      }
    }
    if (taskParam || submissionParam) window.history.replaceState(null, "", window.location.pathname);
  }, []);

  // Pick up changes made elsewhere (other tab, mentor decisions, task page).
  useEffect(
    () =>
      subscribeToWorkspace((workspace) => {
        if (workspace.tasks?.length) setTasks(workspace.tasks);
        if (!workspace.submissions) return;
        const json = JSON.stringify(workspace.submissions);
        if (json === lastJsonRef.current) return;
        lastJsonRef.current = json;
        setSubmissions(workspace.submissions);
      }),
    [],
  );

  // Save every change. The store re-syncs the linked task steps from this.
  useEffect(() => {
    if (!hydrated) return;
    const json = JSON.stringify(submissions);
    if (json === lastJsonRef.current) return;
    lastJsonRef.current = json;
    saveWorkspace({ submissions });
  }, [submissions, hydrated]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
  };

  const filteredSubmissions = useMemo(() => {
    const q = search.trim().toLowerCase();
    return submissions.filter((sub) => {
      const matchSearch =
        !q ||
        [
          sub.id,
          sub.title,
          sub.type,
          sub.scope,
          sub.task,
          sub.milestone,
          sub.status,
          sub.version,
        ]
          .filter(Boolean)
          .some((val) => String(val).toLowerCase().includes(q));
      return (
        matchSearch &&
        (statusFilter === "All" || statusKey(sub.status) === statusFilter) &&
        (typeFilter === "All" || sub.type === typeFilter)
      );
    });
  }, [submissions, search, statusFilter, typeFilter]);

  const selectedSubmission = useMemo(
    () =>
      filteredSubmissions.find((s) => s.id === selectedId) ||
      filteredSubmissions[0] ||
      null,
    [filteredSubmissions, selectedId],
  );

  const dialogSubmission = useMemo(
    () => submissions.find((s) => s.id === dialog.submissionId) || null,
    [submissions, dialog.submissionId],
  );

  // Tasks the intern can attach work to: unfinished ones, plus the one this dialog is about.
  const dialogTasks = useMemo(() => {
    const keepId = dialog.preset?.taskId ?? dialogSubmission?.taskId;
    return tasks
      .filter((t) => t.status !== "Done" || String(t.id) === String(keepId))
      .map((t) => ({ id: t.id, title: t.title, project: t.project, label: `${t.title} · ${t.project}` }));
  }, [tasks, dialog.preset, dialogSubmission]);

  /* ------------------------------ dialogs ----------------------------- */

  const openDialog = (mode, submissionId = null, type = "Source Code") =>
    setDialog({ open: true, mode, type, submissionId, preset: null, key: Date.now() });

  const openNewSubmission = (type = "Source Code") =>
    openDialog("create", null, type);
  const openEdit = (id) => {
    setSelectedId(id);
    openDialog("edit", id);
  };
  const openRevision = (id) => {
    setSelectedId(id);
    openDialog("revise", id);
  };
  const closeDialog = () => setDialog((d) => ({ ...d, open: false }));

  const handleDialogSubmit = (form) => {
    if (dialog.mode === "create") {
      nextIdRef.current += 1;
      const link = resolveSubmissionLink(tasks, form.taskId, dialog.preset?.stepId);
      const created = createSubmission(form, `SUB-${nextIdRef.current}`, link);
      setSubmissions((prev) => [created, ...prev]);
      setSelectedId(created.id);
      resetFilters();
      if (link.stepId) {
        notify(`Sent to your mentor as ${created.version}. The step now waits for review.`, {
          label: "View task",
          run: () => router.push(`/dashboard/tasks?task=${link.taskId}`),
        });
      } else {
        notify(`Submitted as ${created.version}`);
      }
    } else if (dialogSubmission) {
      const target = dialogSubmission;
      const updated =
        dialog.mode === "revise"
          ? applyRevision(target, form)
          : applyEdit(target, form);
      if (updated === target) {
        notify("No changes to save");
      } else {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === target.id ? updated : s)),
        );
        setSelectedId(target.id);
        notify(
          dialog.mode === "revise"
            ? `Revision sent as ${updated.version}`
            : `Changes saved as ${updated.version}`,
        );
      }
    }
    closeDialog();
  };

  /* ----------------------- withdraw / restore / delete ---------------- */

  const requestWithdraw = (id) => {
    const target = submissions.find((s) => s.id === id);
    if (target) setConfirm({ kind: "withdraw", id, title: target.title });
  };

  const requestDelete = (id) => {
    const target = submissions.find((s) => s.id === id);
    if (target) setConfirm({ kind: "delete", id, title: target.title });
  };

  const handleRestore = (id) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? applyRestore(s) : s)),
    );
    setSelectedId(id);
    notify("Submission restored");
  };

  const handleConfirm = () => {
    if (!confirm) return;
    const target = submissions.find((s) => s.id === confirm.id);
    if (!target) {
      setConfirm(null);
      return;
    }
    if (confirm.kind === "withdraw") {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === target.id ? applyWithdraw(s) : s)),
      );
      notify("Submission withdrawn", {
        label: "Undo",
        run: () =>
          setSubmissions((prev) =>
            prev.map((s) => (s.id === target.id ? applyRestore(s) : s)),
          ),
      });
    } else {
      const index = submissions.findIndex((s) => s.id === target.id);
      setSubmissions((prev) => prev.filter((s) => s.id !== target.id));
      notify(`Deleted "${target.title}"`, {
        label: "Undo",
        run: () => {
          setSubmissions((prev) =>
            prev.some((s) => s.id === target.id)
              ? prev
              : [...prev.slice(0, index), target, ...prev.slice(index)],
          );
          setSelectedId(target.id);
        },
      });
    }
    setConfirm(null);
  };

  const handleSummaryCardClick = (card) => {
    if (!card) return;
    setSearch("");
    setStatusFilter(SUMMARY_FILTERS[card.key] || "All");
    setTypeFilter("All");
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#f7f8fc] px-4 py-5 font-sans text-slate-800 antialiased sm:px-6 lg:px-8 lg:py-7 dark:bg-background dark:text-slate-200">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
        <SubmitWorkHeader
          totalSubmissions={submissions.length}
          onNewSubmission={() => openNewSubmission("Source Code")}
        />

        <section className="space-y-3">
          <div className="flex items-end justify-between gap-4 px-1">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-500">
                Submission workspace
              </p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                Keep every review in one place
              </h2>
            </div>
            <span className="hidden text-xs text-slate-400 sm:block">
              Select a record to inspect its details and versions
            </span>
          </div>
          <SubmissionSummary
            submissions={submissions}
            onCardClick={handleSummaryCardClick}
          />
        </section>

        <section className="space-y-3">
          <div className="px-1">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              Your submissions
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Search your history, then review or revise the selected
              submission.
            </p>
          </div>
          <SubmissionToolbar
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            onReset={resetFilters}
          />
        </section>

        <div className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(340px,0.9fr)_minmax(0,1.45fr)] xl:gap-6">
          <SubmissionHistory
            submissions={filteredSubmissions}
            selectedSubmissionId={selectedSubmission?.id || null}
            onSelect={setSelectedId}
            onEdit={openEdit}
            onWithdraw={requestWithdraw}
            onRestore={handleRestore}
            onDelete={requestDelete}
            onSubmitRevision={openRevision}
          />
          <SubmissionDetails
            submission={selectedSubmission}
            onEdit={openEdit}
            onWithdraw={requestWithdraw}
            onRestore={handleRestore}
            onDelete={requestDelete}
            onSubmitRevision={openRevision}
          />
        </div>

        {selectedSubmission && (
          <div className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.75fr)] xl:gap-6">
            <VersionHistory
              versions={selectedSubmission.versions}
              submission={selectedSubmission}
            />
            <SubmissionReviewSnapshot submission={selectedSubmission} />
          </div>
        )}
      </div>

      <NewSubmissionDialog
        key={dialog.key}
        open={dialog.open}
        mode={dialog.mode}
        submission={dialogSubmission}
        tasks={dialogTasks}
        presetTaskId={dialog.preset?.taskId ?? null}
        presetTitle={dialog.preset?.title ?? ""}
        context={dialog.preset?.context ?? null}
        initialType={dialog.type}
        onClose={closeDialog}
        onSubmit={handleDialogSubmit}
      />

      <ConfirmDialog
        open={Boolean(confirm)}
        destructive
        title={
          confirm?.kind === "delete"
            ? "Delete this submission?"
            : "Withdraw this submission?"
        }
        description={
          confirm?.kind === "delete"
            ? `"${confirm?.title}" and its version history will be removed. You can undo right after.`
            : `"${confirm?.title}" will be pulled back from mentor review. You can restore it any time.`
        }
        confirmLabel={confirm?.kind === "delete" ? "Delete" : "Withdraw"}
        onConfirm={handleConfirm}
        onCancel={() => setConfirm(null)}
      />

      {toast && (
        <div
          role="status"
          className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
        >
          <div className="pointer-events-auto flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-2.5 text-sm text-white shadow-lg dark:bg-slate-100 dark:text-slate-900">
            <span>{toast.message}</span>
            {toast.action && (
              <button
                type="button"
                onClick={() => {
                  toast.action.run();
                  setToast(null);
                }}
                className="font-semibold text-indigo-300 hover:text-indigo-200 dark:text-indigo-600 dark:hover:text-indigo-700"
              >
                {toast.action.label}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}