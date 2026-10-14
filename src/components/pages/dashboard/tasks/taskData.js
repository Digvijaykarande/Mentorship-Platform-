export const MENTEES = [
  "Alex Rivera",
  "Sarah Chen",
  "Marcus Vance",
  "Elena Rostova",
  "David Kim",
  "Liam Zhang",
  "Sophia Patel",
  "Jordan Blake",
  "Maya Lin",
];

export const PROJECTS = [
  "Auth Service",
  "Customer Portal",
  "Data Platform",
  "DevOps",
];

export const TABS = [
  { value: "all", label: "All" },
  { value: "todo", label: "To do" },
  { value: "active", label: "In progress" },
  { value: "done", label: "Done" },
];

export const STATUS_STYLES = {
  "To do":
    "bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-300",
  "In progress":
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  Done: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
};

export const groupOf = (task) =>
  task.status === "To do" ? "todo" : task.status === "Done" ? "done" : "active";

export const initialsOf = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const newId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

const subs = (taskId, texts, doneCount) =>
  texts.map((text, i) => ({
    id: `${taskId}-${i}`,
    text,
    done: i < doneCount, // intern marked it complete
    approved: i < doneCount, // mentor confirmed it and unlocked the next step
  }));

export const INITIAL_TASKS = [
  {
    id: 1,
    title: "JWT refresh token rotation",
    project: "Auth Service",
    mentee: "Alex Rivera",
    status: "In progress",
    due: "Tomorrow",
    overdue: false,
    subtasks: subs(
      1,
      [
        "Generate refresh tokens",
        "Store tokens in Redis",
        "Detect token reuse",
        "Write unit tests",
        "Document endpoints",
      ],
      4,
    ),
  },
  {
    id: 2,
    title: "Multi-tenant database schema",
    project: "Data Platform",
    mentee: "Sarah Chen",
    status: "In progress",
    due: "In 3 days",
    overdue: false,
    subtasks: subs(
      2,
      [
        "Draft ER diagram",
        "Define tenant model",
        "Write migrations",
        "Add indexes",
        "Seed test data",
        "Review with team",
      ],
      2,
    ),
  },
  {
    id: 3,
    title: "GraphQL query optimization",
    project: "Customer Portal",
    mentee: "Marcus Vance",
    status: "Done",
    due: "Oct 26",
    overdue: false,
    subtasks: subs(
      3,
      [
        "Profile slow queries",
        "Add DataLoader",
        "Batch resolvers",
        "Benchmark results",
        "Update docs",
      ],
      5,
    ),
  },
  {
    id: 4,
    title: "Playwright integration tests",
    project: "Customer Portal",
    mentee: "Elena Rostova",
    status: "In progress",
    due: "Oct 28",
    overdue: false,
    subtasks: subs(
      4,
      [
        "Set up Playwright",
        "Mock API responses",
        "Cover login flow",
        "Cover checkout flow",
      ],
      1,
    ),
  },
  {
    id: 5,
    title: "CI/CD pipeline on AWS",
    project: "DevOps",
    mentee: "David Kim",
    status: "To do",
    due: "1 day overdue",
    overdue: true,
    subtasks: subs(
      5,
      [
        "Write GitHub Actions workflow",
        "Configure ECS service",
        "Add deploy step",
      ],
      0,
    ),
  },
  {
    id: 6,
    title: "Rate limiting middleware",
    project: "Auth Service",
    mentee: "Liam Zhang",
    status: "In progress",
    due: "In 2 days",
    overdue: false,
    subtasks: subs(
      6,
      [
        "Design token bucket",
        "Implement middleware",
        "Add Redis store",
        "Write tests",
      ],
      3,
    ),
  },
  {
    id: 7,
    title: "OAuth2 social login refactor",
    project: "Auth Service",
    mentee: "Sophia Patel",
    status: "In progress",
    due: "Oct 27",
    overdue: false,
    subtasks: subs(
      7,
      ["Refactor callbacks", "Add PKCE flow", "Test with providers"],
      1,
    ),
  },
  {
    id: 8,
    title: "Docker build size reduction",
    project: "DevOps",
    mentee: "Jordan Blake",
    status: "Done",
    due: "Oct 29",
    overdue: false,
    subtasks: subs(
      8,
      [
        "Switch to multi-stage build",
        "Use slim base image",
        "Remove dev dependencies",
        "Compare image sizes",
      ],
      4,
    ),
  },
  {
    id: 9,
    title: "Cypress end-to-end suite",
    project: "Customer Portal",
    mentee: "Maya Lin",
    status: "In progress",
    due: "Oct 30",
    overdue: false,
    subtasks: subs(
      9,
      [
        "Install Cypress",
        "Write smoke tests",
        "Cover main flows",
        "Run in CI",
        "Fix flaky tests",
      ],
      2,
    ),
  },
];

// ---- Sequential flow helpers ----------------------------------------------
// A step is one of:
//   "done"    intern completed it and the mentor approved it
//   "review"  intern completed it, waiting for the mentor to unlock the next one
//   "current" the step the intern is working on now
//   "locked"  not available yet
export const stepStates = (subtasks = []) => {
  let blocked = false;
  return subtasks.map((s) => {
    if (s.done && s.approved) return "done";
    if (s.done) {
      blocked = true;
      return "review";
    }
    if (blocked) return "locked";
    blocked = true;
    return "current";
  });
};

export const progressOf = (task) => {
  const steps = task.subtasks || [];
  const states = stepStates(steps);
  const done = states.filter((s) => s === "done").length;
  return {
    done,
    total: steps.length,
    percent: steps.length ? Math.round((done / steps.length) * 100) : 0,
    current: steps[states.indexOf("current")] ?? null,
    review: steps[states.indexOf("review")] ?? null,
    states,
  };
};

// Intern action: mark the current step as completed.
export const completeCurrentStep = (subtasks = []) => {
  const i = stepStates(subtasks).indexOf("current");
  return i === -1
    ? subtasks
    : subtasks.map((s, idx) => (idx === i ? { ...s, done: true } : s));
};

// Mentor/admin action (use it in the admin dashboard): approve the step that
// is waiting for review, which unlocks the next step for the intern.
export const approveReviewStep = (subtasks = []) => {
  const i = stepStates(subtasks).indexOf("review");
  return i === -1
    ? subtasks
    : subtasks.map((s, idx) => (idx === i ? { ...s, approved: true } : s));
};
