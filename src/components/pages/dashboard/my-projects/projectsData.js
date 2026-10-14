// projectsData.js
// Central mock/data source for the "My Projects" intern dashboard.
// Replace these exports with real API/DB calls later without changing components.
//
// Data model notes:
// - Each project owns its own `tasks` (used for roadmap progress), its
//   `roadmap` (Learning & Task Roadmap phases) and its mentor-shared
//   `documentation` (requirements & specs, see documentationData.js).
// - Every task carries a `phaseId` that points at one of its project's
//   roadmap phases, so the roadmap can show live "x/y deliverables done"
//   progress per phase instead of a static timeline.
// - Every project points at a `mentorId` in `mentors`, and carries its own
//   `mentorFeedback` so the compact mentor card is specific to that project.
// - `resources` are project-specific; `programResources` are shared across
//   every project (shown as "Program-wide" in Resources & Specs).

import { projectDocumentation } from "./documentationData";

/* =========================================================
   SUMMARY STATS (top stat cards — unchanged)
========================================================= */

export const summaryStats = {
  totalProjects: 4,
  activeProjects: 3,
  completedProjects: 1,
  pendingTasks: 5,
};

/* =========================================================
   MENTORS
========================================================= */

export const mentors = {
  "mayur-patil": {
    id: "mayur-patil",
    name: "Mayur Patil",
    title: "Senior Software Developer • Internship Mentor",
    online: true,
    verified: true,
  },
};

/* =========================================================
   PROJECTS
   Each project is the single source of truth for its own
   overview, roadmap, action items, mentor feedback and
   resources — everything the detail panel renders.
========================================================= */

export const projects = [
  {
    id: "intern-dashboard",
    name: "Intern Dashboard UI",
    repoPath: "loyanox-mentor / intern-dashboard",
    icon: "learning",
    featured: true,

    statusLabel: "In Progress",
    progressPercent: 78,

    description:
      "Building responsive dashboard screens for tracking internship tasks, project progress, feedback, submissions, and learning activities.",

    tags: ["Next.js", "React", "Tailwind CSS", "shadcn/ui"],
    extraTagCount: 2,

    dueLabel: "12 Days Remaining",
    contributors: 2,
    mentorId: "mayur-patil",

    eyebrow: "Current Project",
    cohort: "Cohort 2026-Q3",
    reviewStatus: "Approved by Mentor",
    commitHash: "9f14bd8",
    branch: "main",
    ciStatus: "CI/CD Passing",
    gauges: {
      completionPercent: 78,
      learningHours: 18,
      evaluationScore: 92,
    },

    mentorFeedback: {
      label: "Latest Mentor Feedback",
      timeAgo: "2 days ago",
      quote:
        "Good progress on the dashboard implementation. Focus next on responsive behavior, reusable components, and keeping the user experience consistent across the remaining modules.",
    },

    documentation: projectDocumentation["intern-dashboard"],

    roadmap: [
      {
        id: "intern-dashboard-phase-1",
        title: "Phase 1: Project Setup & Planning",
        status: "done",
        dateLabel: "Aug 12 • Done",
        description:
          "Project requirements reviewed, repository created, development environment configured, and initial project structure completed.",
      },
      {
        id: "intern-dashboard-phase-2",
        title: "Phase 2: Core Dashboard Development",
        status: "done",
        dateLabel: "Aug 22 • Done",
        description:
          "Dashboard layout, navigation, reusable components, summary cards, and responsive page structure completed.",
      },
      {
        id: "intern-dashboard-phase-3",
        title: "Phase 3: Tasks & Feedback Modules",
        status: "current",
        dateLabel: "Active Sprint",
        description:
          "Implementing task management, project progress, feedback requests, mentor comments, and action item tracking.",
      },
      {
        id: "intern-dashboard-phase-4",
        title: "Phase 4: Testing & Final Review",
        status: "upcoming",
        dateLabel: "Target Sep 18",
        description:
          "Responsive testing, UI improvements, bug fixing, mentor review, and final project submission.",
      },
    ],

    tasks: [
      {
        id: "task-login",
        title: "Complete login and authentication screen integration",
        badgeLabel: "Completed",
        badgeTone: "secondary",
        completed: true,
        completedLabel: "Passed",
        assignee: { initials: "DK", tone: "primary" },
        phaseId: "intern-dashboard-phase-2",
      },
      {
        id: "task-dashboard-responsive",
        title: "Complete responsive layout for the intern dashboard",
        badgeLabel: "High Priority",
        badgeTone: "primary",
        dueLabel: "Due Today",
        dueTone: "error",
        assignee: { initials: "DK", tone: "primary" },
        completed: false,
        phaseId: "intern-dashboard-phase-3",
      },
      {
        id: "task-feedback-modal",
        title: "Implement Request Feedback modal and submission flow",
        badgeLabel: "Medium Priority",
        badgeTone: "primary-fixed",
        dueLabel: "In 2d",
        assignee: { initials: "DK", tone: "tertiary" },
        completed: false,
        phaseId: "intern-dashboard-phase-3",
      },
      {
        id: "task-project-cards",
        title: "Align project cards and improve project progress display",
        badgeLabel: "UI Improvement",
        badgeTone: "neutral",
        dueLabel: "In 5d",
        assignee: { initials: "DK", tone: "neutral" },
        completed: false,
        phaseId: "intern-dashboard-phase-3",
      },
    ],

    resources: [
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
    ],
  },

  {
    id: "task-management",
    name: "Task Management Module",
    repoPath: "loyanox-mentor / task-management",
    icon: "learning",

    statusLabel: "Under Review",
    progressPercent: 92,

    description:
      "Developing an interactive task management module where interns can view assigned tasks, track deadlines, update progress, and manage task status.",

    tags: ["React", "JavaScript", "Tailwind CSS"],

    dueLabel: "Updated 3h ago",
    contributors: 1,
    mentorId: "mayur-patil",

    eyebrow: "Cohort Project",
    cohort: "Cohort 2026-Q3",
    reviewStatus: "In Mentor Review",
    commitHash: "c72a91e",
    branch: "feature/task-store",
    ciStatus: "CI/CD Passing",
    gauges: {
      completionPercent: 92,
      learningHours: 14,
      evaluationScore: 88,
    },

    mentorFeedback: {
      label: "Latest Mentor Feedback",
      timeAgo: "5 hours ago",
      quote:
        "Drag-and-drop and filtering both work well. Add test coverage for the task store before I sign this off for final review.",
    },

    documentation: projectDocumentation["task-management"],

    roadmap: [
      {
        id: "task-management-phase-1",
        title: "Phase 1: Module Setup & Data Model",
        status: "done",
        dateLabel: "Aug 6 • Done",
        description:
          "Task store, status enum, and base component structure scaffolded and reviewed.",
      },
      {
        id: "task-management-phase-2",
        title: "Phase 2: Core Interactions",
        status: "done",
        dateLabel: "Aug 20 • Done",
        description:
          "Drag-and-drop reordering, priority filtering, and deadline tracking implemented.",
      },
      {
        id: "task-management-phase-3",
        title: "Phase 3: QA & Mentor Review",
        status: "current",
        dateLabel: "Active Sprint",
        description:
          "Writing unit tests, fixing review comments, and preparing the module for final sign-off.",
      },
    ],

    tasks: [
      {
        id: "task-mgmt-dnd",
        title: "Implement drag-and-drop task reordering",
        badgeLabel: "Completed",
        badgeTone: "secondary",
        completed: true,
        completedLabel: "Passed",
        assignee: { initials: "DK", tone: "primary" },
        phaseId: "task-management-phase-2",
      },
      {
        id: "task-mgmt-filter",
        title: "Add task filtering by priority and status",
        badgeLabel: "Completed",
        badgeTone: "secondary",
        completed: true,
        completedLabel: "Passed",
        assignee: { initials: "DK", tone: "primary" },
        phaseId: "task-management-phase-2",
      },
      {
        id: "task-mgmt-tests",
        title: "Write unit tests for the task store",
        badgeLabel: "High Priority",
        badgeTone: "primary",
        dueLabel: "Due Tomorrow",
        dueTone: "error",
        assignee: { initials: "DK", tone: "primary" },
        completed: false,
        phaseId: "task-management-phase-3",
      },
      {
        id: "task-mgmt-review-notes",
        title: "Resolve mentor review comments on PR #42",
        badgeLabel: "Mentor Review",
        badgeTone: "primary-fixed",
        dueLabel: "In 2d",
        assignee: { initials: "DK", tone: "tertiary" },
        completed: false,
        phaseId: "task-management-phase-3",
      },
    ],

    resources: [
      {
        id: "task-state-diagram",
        name: "Task State Diagram.pdf",
        meta: "420 KB • PDF Document",
        icon: "picture_as_pdf",
        tone: "error-container",
        action: "download",
      },
      {
        id: "dnd-library-docs",
        name: "Drag & Drop Library Docs",
        meta: "External • Reference",
        icon: "terminal",
        tone: "neutral",
        action: "link",
      },
    ],
  },

  {
    id: "feedback-module",
    name: "Feedback & Progress Module",
    repoPath: "loyanox-mentor / feedback-module",
    icon: "certificate",

    statusLabel: "Planning",
    progressPercent: 25,

    description:
      "Creating a feedback experience for interns to review mentor comments, understand improvement areas, track action items, and request feedback.",

    tags: ["Next.js", "React", "shadcn/ui", "Lucide"],

    dueLabel: "Created 2 days ago",
    contributors: 1,
    mentorId: "mayur-patil",

    eyebrow: "New Project",
    cohort: "Cohort 2026-Q3",
    reviewStatus: "Requirements Reviewed",
    commitHash: "1a2f6c0",
    branch: "main",
    ciStatus: "CI/CD Not Yet Configured",
    gauges: {
      completionPercent: 25,
      learningHours: 6,
      evaluationScore: 0,
    },

    mentorFeedback: {
      label: "Latest Mentor Feedback",
      timeAgo: "1 day ago",
      quote:
        "Requirements look solid. Get wireframes in front of me before you start building the form components.",
    },

    documentation: projectDocumentation["feedback-module"],

    roadmap: [
      {
        id: "feedback-module-phase-1",
        title: "Phase 1: Requirements & Scope",
        status: "done",
        dateLabel: "Sep 2 • Done",
        description:
          "Feedback flow requirements gathered and reviewed with the mentor.",
      },
      {
        id: "feedback-module-phase-2",
        title: "Phase 2: UX & Wireframes",
        status: "current",
        dateLabel: "Active Sprint",
        description:
          "Drafting the feedback form schema and reviewing wireframes before development starts.",
      },
      {
        id: "feedback-module-phase-3",
        title: "Phase 3: Build & Integrate",
        status: "upcoming",
        dateLabel: "Target Sep 24",
        description:
          "Build feedback components, connect to mentor comments, and wire up action item tracking.",
      },
      {
        id: "feedback-module-phase-4",
        title: "Phase 4: Review & Launch",
        status: "upcoming",
        dateLabel: "Target Oct 1",
        description: "Mentor review, polish, and rollout to the cohort.",
      },
    ],

    tasks: [
      {
        id: "feedback-schema",
        title: "Draft feedback form schema",
        badgeLabel: "Completed",
        badgeTone: "secondary",
        completed: true,
        completedLabel: "Passed",
        assignee: { initials: "DK", tone: "primary" },
        phaseId: "feedback-module-phase-1",
      },
      {
        id: "feedback-wireframes",
        title: "Review UX wireframes with mentor",
        badgeLabel: "Medium Priority",
        badgeTone: "primary-fixed",
        dueLabel: "In 3d",
        assignee: { initials: "DK", tone: "tertiary" },
        completed: false,
        phaseId: "feedback-module-phase-2",
      },
    ],

    resources: [
      {
        id: "feedback-wireframes-file",
        name: "Feedback Form Wireframes",
        meta: "Figma • Design Reference",
        icon: "draw",
        tone: "primary-fixed",
        action: "link",
      },
      {
        id: "rubric-guidelines",
        name: "Evaluation Rubric Guidelines.pdf",
        meta: "640 KB • PDF Document",
        icon: "picture_as_pdf",
        tone: "error-container",
        action: "download",
      },
    ],
  },
];

/* =========================================================
   PROGRAM-WIDE RESOURCES
   Shown alongside every project's own resources.
========================================================= */

export const programResources = [
  {
    id: "intern-guidelines",
    name: "Internship Development Guidelines",
    meta: "Markdown • Program-wide Reference",
    icon: "terminal",
    tone: "secondary-container",
    action: "download",
  },
];

/* =========================================================
   LEGACY SINGLE-MENTOR EXPORT
   Other pages in the app (e.g. the dashboard Overview page) still
   import a single `mentor` object with the old shape. Keep it working
   without forcing every consumer to switch to the new `mentors` map —
   it's just the featured project's mentor + feedback, reshaped.
========================================================= */

const featuredProject = projects.find((p) => p.featured) ?? projects[0];
const featuredMentor = mentors[featuredProject?.mentorId];

export const mentor = featuredMentor
  ? {
      ...featuredMentor,
      feedback: featuredProject.mentorFeedback,
    }
  : null;

/* =========================================================
   PROJECT FILTER OPTIONS
========================================================= */

export const projectStatusOptions = [
  "All",
  "In Progress",
  "Under Review",
  "Planning",
  "Completed",
];
