// projectsData.js
// Central mock/data source for the "My Projects" intern dashboard.
// Replace these exports with real API/DB calls later without changing components.

/* =========================================================
   SUMMARY STATS
========================================================= */

export const summaryStats = [
  {
    id: "total-projects",
    label: "Total Projects",
    value: "4",
    icon: "source",
    trendLabel: "+1 this month",
    trendIcon: "trending_up",
    trendTone: "secondary",
    footerRight: "1 completed",
  },

  {
    id: "active-projects",
    label: "Active Projects",
    value: "3",
    icon: "bolt",
    valueTone: "primary",
    iconTone: "primary",
    footerDotTone: "secondary",
    footerLeftText: "2 In Progress",
    footerRightBadge: "Current Sprint",
  },

  {
    id: "milestones",
    label: "Milestones Completed",
    value: "12",
    valueSuffix: "/ 16",
    icon: "flag_circle",
    iconTone: "secondary",
    progress: {
      label: "Overall Progress",
      percent: 75,
    },
  },

  {
    id: "mentorship",
    label: "Mentorship Hours",
    value: "16.5",
    valueUnit: "hrs",
    icon: "supervised_user_circle",
    iconTone: "tertiary",
    footerLeftIcon: "event_upcoming",
    footerLeftText: "Next Review Tomorrow",
    footerDotTone: "secondary",
  },
];

/* =========================================================
   ACTIVE PROJECTS
========================================================= */

export const activeProjects = [
  {
    id: "intern-dashboard",
    name: "Intern Dashboard UI",
    repoPath: "loyanox-mentor / intern-dashboard",
    icon: "learning",
    featured: true,

    statusLabel: "In Progress",
    statusTone: "primary",

    progressLabel: "78% Completed",

    description:
      "Building responsive dashboard screens for tracking internship tasks, project progress, feedback, submissions, and learning activities.",

    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
    ],

    extraTagCount: 2,

    dueLabel: "12 Days Remaining",

    phaseLabel: "Phase 3 of 4: Dashboard Development",

    progressSegments: [
      {
        widthPercent: 45,
        tone: "secondary",
        title: "Completed work",
      },
      {
        widthPercent: 33,
        tone: "primary-container",
        title: "Current sprint",
        pulse: true,
      },
      {
        widthPercent: 22,
        tone: "surface-dim",
        title: "Remaining tasks",
      },
    ],

    contributors: 2,

    tasksCompleted: 18,
    tasksTotal: 23,

    mentorName: "Rahul Patil",

    approvalText: "Mentor Reviewed",
  },

  {
    id: "task-management",
    name: "Task Management Module",
    repoPath: "loyanox-mentor / task-management",
    icon: "learning",

    statusLabel: "Under Review",
    statusTone: "secondary",

    progressLabel: "92% Completed",

    description:
      "Developing an interactive task management module where interns can view assigned tasks, track deadlines, update progress, and manage task status.",

    tags: [
      "React",
      "JavaScript",
      "Tailwind CSS",
    ],

    footerIcon: "verified",

    footerText: "Mentor review in progress",

    updatedLabel: "Updated 3h ago",
  },

  {
    id: "feedback-module",
    name: "Feedback & Progress Module",
    repoPath: "loyanox-mentor / feedback-module",
    icon: "certificate",

    statusLabel: "Planning",
    statusTone: "primary",

    progressLabel: "25% Started",

    description:
      "Creating a feedback experience for interns to review mentor comments, understand improvement areas, track action items, and request feedback.",

    tags: [
      "Next.js",
      "React",
      "shadcn/ui",
      "Lucide",
    ],

    footerIcon: "design_services",

    footerText: "Initial requirements reviewed",

    updatedLabel: "Created 2 days ago",
  },
];

/* =========================================================
   CURRENT PROJECT TASKS
========================================================= */

export const sprintTasks = [
  {
    id: "task-dashboard-responsive",
    title:
      "Complete responsive layout for the intern dashboard",

    badgeLabel: "High Priority",
    badgeTone: "primary",

    dueLabel: "Due Today",
    dueTone: "error",

    assignee: {
      initials: "SM",
      tone: "primary",
    },

    completed: false,
  },

  {
    id: "task-feedback-modal",
    title:
      "Implement Request Feedback modal and submission flow",

    badgeLabel: "Medium Priority",
    badgeTone: "primary-fixed",

    dueLabel: "In 2d",

    assignee: {
      initials: "SM",
      tone: "tertiary",
    },

    completed: false,
  },

  {
    id: "task-project-cards",
    title:
      "Align project cards and improve project progress display",

    badgeLabel: "UI Improvement",
    badgeTone: "neutral",

    dueLabel: "In 5d",

    assignee: {
      initials: "SM",
      tone: "neutral",
    },

    completed: false,
  },

  {
    id: "task-login",
    title:
      "Complete login and authentication screen integration",

    badgeLabel: "Completed",
    badgeTone: "secondary",

    completed: true,

    completedLabel: "Passed",
  },
];

/* =========================================================
   TASK COUNTS
========================================================= */

export const taskCounts = {
  all: 17,
  pending: 5,
  completed: 12,
  shown: 4,
};

/* =========================================================
   ACTIVE PROJECT DETAILS
========================================================= */

export const activeProjectDetail = {
  eyebrow: "Current Project",

  name: "Intern Dashboard UI",

  description:
    "A responsive internship dashboard that helps interns manage assigned tasks, monitor project progress, review mentor feedback, submit work, and stay on top of deadlines.",

  gauges: {
    testCoveragePercent: 88,
    sprintVelocity: "24.5",
    burndownChangePercent: 14,
  },

  commitHash: "9f14bd8",

  branch: "main",

  ciStatus: "CI/CD Passing",
};

/* =========================================================
   PROJECT MILESTONES
========================================================= */

export const milestones = [
  {
    id: "phase-1",

    title: "Phase 1: Project Setup & Planning",

    status: "done",

    dateLabel: "Aug 12 • Done",

    description:
      "Project requirements reviewed, repository created, development environment configured, and initial project structure completed.",
  },

  {
    id: "phase-2",

    title: "Phase 2: Core Dashboard Development",

    status: "done",

    dateLabel: "Aug 22 • Done",

    description:
      "Dashboard layout, navigation, reusable components, summary cards, and responsive page structure completed.",
  },

  {
    id: "phase-3",

    title: "Phase 3: Tasks & Feedback Modules",

    status: "current",

    dateLabel: "Active Sprint",

    description:
      "Implementing task management, project progress, feedback requests, mentor comments, and action item tracking.",
  },

  {
    id: "phase-4",

    title: "Phase 4: Testing & Final Review",

    status: "upcoming",

    dateLabel: "Target Sep 18",

    description:
      "Responsive testing, UI improvements, bug fixing, mentor review, and final project submission.",
  },
];

/* =========================================================
   PROJECT MENTOR
========================================================= */

export const mentor = {
  name: "Rahul Patil",

  title: "Senior Software Developer • Internship Mentor",

  online: true,

  verified: true,

  avatarAlt:
    "Professional portrait of an experienced software development mentor",

  feedback: {
    label: "Latest Mentor Feedback",

    timeAgo: "2 days ago",

    quote:
      "Good progress on the dashboard implementation. Focus next on responsive behavior, reusable components, and keeping the user experience consistent across the remaining modules.",
  },
};

/* =========================================================
   PROJECT RESOURCES
========================================================= */

export const resources = [
  {
    id: "figma-design",
    name: "Intern Dashboard UI Design",
    meta: "Figma • Design Reference",
    icon: "draw",
    tone: "primary-fixed",
    action: "link",
  },

  {
    id: "project-requirements",
    name: "Project Requirements.pdf",
    meta: "1.8 MB • PDF Document",
    icon: "picture_as_pdf",
    tone: "error-container",
    action: "download",
  },

  {
    id: "api-documentation",
    name: "API Documentation",
    meta: "REST API • Reference",
    icon: "database",
    tone: "neutral",
    action: "download",
  },

  {
    id: "intern-guidelines",
    name: "Internship Development Guidelines",
    meta: "Markdown • Reference",
    icon: "terminal",
    tone: "secondary-container",
    action: "download",
  },
];

/* =========================================================
   PROJECT FILTER OPTIONS
========================================================= */

export const projectStatusOptions = [
  "All Active",
  "In Progress",
  "Under Review",
  "Planning",
  "Completed",
];

export const priorityOptions = [
  "High & Medium",
  "High",
  "Medium",
  "Low",
];