// documentationData.js
// Mentor-shared project documentation (requirements, scope, specs).
// Keyed by project id and attached to each project in projectsData.js.
//
// Section shape: { id, title, type, content }
// Supported `type` values and the `content` each one expects:
//   "text"      -> string[]                       paragraphs
//   "list"      -> string[]                       simple bullet list
//   "checklist" -> string[]                       tick-marked rows
//   "points"    -> { title, description }[]       highlighted items
//   "groups"    -> { title, items: string[] }[]   titled bullet groups
//   "steps"     -> string[]                       numbered flow

export const projectDocumentation = {
  "intern-dashboard": {
    version: "v1.3",
    updatedLabel: "Updated 2 days ago",
    sections: [
      {
        id: "context",
        title: "Context",
        type: "text",
        content: [
          "Interns currently track tasks, project progress, mentor feedback and submissions across separate tools and chats. Mentors have no single place to see how each intern is doing.",
          "The Intern Dashboard brings these together in one responsive web application used throughout the internship.",
        ],
      },
      {
        id: "problem",
        title: "Problem Statement",
        type: "text",
        content: [
          "Progress, deadlines and feedback are scattered, which makes it hard for interns to know what to do next and for mentors to give timely, consistent guidance.",
        ],
      },
      {
        id: "objectives",
        title: "Primary Objectives",
        type: "list",
        content: [
          "Give every intern one clear view of tasks, deadlines and project progress",
          "Make mentor feedback easy to find, understand and act on",
          "Provide a simple submission flow for completed work",
          "Keep the experience consistent across desktop, tablet and mobile",
        ],
      },
      {
        id: "secondary",
        title: "Secondary Objectives",
        type: "list",
        content: [
          "Support light and dark themes across all modules",
          "Keep components reusable so new modules can be added quickly",
          "Follow accessibility best practices for forms, dialogs and navigation",
        ],
      },
      {
        id: "users",
        title: "Target Users",
        type: "list",
        content: [
          "Interns tracking their own work and learning progress",
          "Mentors reviewing submissions and giving feedback",
          "Programme coordinators monitoring cohort progress",
        ],
      },
      {
        id: "scope",
        title: "Scope of Work",
        type: "groups",
        content: [
          {
            title: "In-Scope",
            items: [
              "Dashboard overview with progress, tasks and activity summaries",
              "My Projects, Tasks, Submit Work, Feedback, Progress and Notification pages",
              "Profile and settings pages including theme switching",
              "Responsive layout with collapsible sidebar navigation",
            ],
          },
          {
            title: "Out-of-Scope",
            items: [
              "Real-time chat between interns and mentors",
              "Payroll, certificates and HR workflows",
              "Native mobile applications",
            ],
          },
        ],
      },
      {
        id: "functional",
        title: "Functional Requirements",
        type: "points",
        content: [
          {
            title: "Overview & Progress",
            description:
              "Show completion percentage, active tasks, recent activity and the latest mentor feedback at a glance.",
          },
          {
            title: "Project Workspace",
            description:
              "List assigned projects with status, roadmap phases, resources and mentor details for the selected project.",
          },
          {
            title: "Task Management",
            description:
              "Display tasks with priority, due date and status, with filters and search.",
          },
          {
            title: "Work Submission",
            description:
              "Submit files or links with a title, type and note, and track review status and version history.",
          },
          {
            title: "Feedback & Notifications",
            description:
              "Browse mentor feedback, request new feedback, and manage read or unread notifications.",
          },
        ],
      },
      {
        id: "non-functional",
        title: "Non-Functional Requirements",
        type: "checklist",
        content: [
          "Responsive design (desktop, tablet, mobile)",
          "Consistent look in light and dark mode",
          "Fast page loads and smooth interactions",
          "Accessible dialogs, forms and keyboard navigation",
          "Reusable, well-structured component code",
        ],
      },
      {
        id: "tech",
        title: "Technology Stack (Suggested)",
        type: "groups",
        content: [
          { title: "Frontend", items: ["Next.js (App Router)", "React", "JavaScript"] },
          { title: "Styling & UI", items: ["Tailwind CSS", "shadcn/ui", "Lucide icons"] },
          { title: "Tooling", items: ["ESLint", "Git & GitHub", "GitHub Actions for CI"] },
        ],
      },
      {
        id: "flow",
        title: "User Flow (High-Level)",
        type: "steps",
        content: [
          "Intern signs in and lands on the dashboard overview",
          "Opens My Projects and reviews the roadmap and documentation",
          "Works through tasks and updates progress",
          "Submits completed work for mentor review",
          "Reads feedback and requests a follow-up review if needed",
        ],
      },
      {
        id: "data",
        title: "Data Requirements",
        type: "list",
        content: [
          "Intern profile and cohort details",
          "Projects with status, roadmap phases, tasks and resources",
          "Submissions with versions and review status",
          "Mentor feedback with rating, strengths and improvements",
          "Notifications with read state",
        ],
      },
      {
        id: "kpis",
        title: "Key Performance Indicators (KPIs)",
        type: "checklist",
        content: [
          "Task completion rate",
          "On-time submission rate",
          "Average mentor rating",
          "Time taken to act on feedback",
        ],
      },
      {
        id: "assumptions",
        title: "Assumptions & Constraints",
        type: "groups",
        content: [
          {
            title: "Assumptions",
            items: [
              "Mock data is used until the backend APIs are ready",
              "Interns have a modern browser and a stable connection",
            ],
          },
          {
            title: "Constraints",
            items: [
              "Fixed internship timeline and review dates",
              "Web-only delivery",
              "UI changes must be approved by the mentor",
            ],
          },
        ],
      },
      {
        id: "deliverables",
        title: "Deliverables",
        type: "points",
        content: [
          {
            title: "Working Application",
            description: "All dashboard modules running locally and deployed to a preview URL.",
          },
          {
            title: "Source Repository",
            description: "Clean commit history, README with setup steps and a documented folder structure.",
          },
          {
            title: "Final Review",
            description: "Short demo to the mentor covering features, decisions and learnings.",
          },
        ],
      },
      {
        id: "impact",
        title: "Expected Impact",
        type: "list",
        content: [
          "Less time spent searching for tasks, feedback and deadlines",
          "Faster, more consistent mentor reviews",
          "A reusable foundation for future cohorts",
        ],
      },
      {
        id: "future",
        title: "Future Enhancements",
        type: "list",
        content: [
          "Backend integration with authentication and role-based access",
          "Email and in-app reminders for upcoming deadlines",
          "Cohort-level analytics for mentors and coordinators",
        ],
      },
    ],
  },

  "task-management": {
    version: "v1.1",
    updatedLabel: "Updated 1 week ago",
    sections: [
      {
        id: "context",
        title: "Context",
        type: "text",
        content: [
          "Interns receive tasks from mentors with different priorities and deadlines. Without a clear task view, deadlines are missed and status updates are inconsistent.",
        ],
      },
      {
        id: "objectives",
        title: "Primary Objectives",
        type: "list",
        content: [
          "Let interns see all assigned tasks with priority and due date",
          "Allow status updates as work progresses",
          "Highlight overdue and upcoming tasks clearly",
        ],
      },
      {
        id: "users",
        title: "Target Users",
        type: "list",
        content: [
          "Interns managing their own task list",
          "Mentors checking task status during reviews",
        ],
      },
      {
        id: "scope",
        title: "Scope of Work",
        type: "groups",
        content: [
          {
            title: "In-Scope",
            items: [
              "Task list with search, filters and sorting",
              "Task details with status, priority and deadline",
              "Create, update and delete task actions",
            ],
          },
          {
            title: "Out-of-Scope",
            items: ["Task assignment between interns", "Calendar integrations"],
          },
        ],
      },
      {
        id: "functional",
        title: "Functional Requirements",
        type: "points",
        content: [
          {
            title: "Task List",
            description: "Show title, priority, due date and status with filters for pending, in progress and completed.",
          },
          {
            title: "Status Updates",
            description: "Change task status in one click and reflect the change in project progress.",
          },
          {
            title: "Deadline Tracking",
            description: "Mark tasks due today or overdue with clear visual indicators.",
          },
          {
            title: "Task Details",
            description: "Open a detail view with description, linked project phase and mentor notes.",
          },
        ],
      },
      {
        id: "non-functional",
        title: "Non-Functional Requirements",
        type: "checklist",
        content: [
          "Responsive layout for desktop and mobile",
          "Instant filtering and search on the client",
          "Clear empty and loading states",
          "Keyboard-friendly controls",
        ],
      },
      {
        id: "tech",
        title: "Technology Stack (Suggested)",
        type: "groups",
        content: [
          { title: "Frontend", items: ["React", "JavaScript"] },
          { title: "Styling", items: ["Tailwind CSS"] },
        ],
      },
      {
        id: "flow",
        title: "User Flow (High-Level)",
        type: "steps",
        content: [
          "Open the Tasks page and review what is due",
          "Filter or search to find a specific task",
          "Open the task, do the work and update its status",
          "Mentor reviews the completed task",
        ],
      },
      {
        id: "kpis",
        title: "Key Performance Indicators (KPIs)",
        type: "checklist",
        content: ["On-time completion rate", "Number of overdue tasks", "Average time to complete a task"],
      },
      {
        id: "assumptions",
        title: "Assumptions & Constraints",
        type: "groups",
        content: [
          {
            title: "Assumptions",
            items: ["Tasks are created by the mentor and visible to the intern"],
          },
          {
            title: "Constraints",
            items: ["Local mock data only for this phase", "Must reuse shared UI components"],
          },
        ],
      },
      {
        id: "deliverables",
        title: "Deliverables",
        type: "points",
        content: [
          {
            title: "Task Module",
            description: "Task list, filters, details and status update flow ready for review.",
          },
          {
            title: "Documentation",
            description: "Short README section explaining component structure and data shape.",
          },
        ],
      },
    ],
  },

  "feedback-module": {
    version: "v1.0",
    updatedLabel: "Shared 2 days ago",
    sections: [
      {
        id: "context",
        title: "Context",
        type: "text",
        content: [
          "Mentors leave feedback after each review, but interns often miss follow-ups or are unsure which improvements matter most.",
        ],
      },
      {
        id: "objectives",
        title: "Primary Objectives",
        type: "list",
        content: [
          "Present mentor feedback clearly with strengths and improvement areas",
          "Let interns track the status of each feedback item",
          "Allow interns to request feedback on specific work",
        ],
      },
      {
        id: "users",
        title: "Target Users",
        type: "list",
        content: ["Interns reviewing and acting on feedback", "Mentors tracking whether feedback was addressed"],
      },
      {
        id: "scope",
        title: "Scope of Work",
        type: "groups",
        content: [
          {
            title: "In-Scope",
            items: [
              "Feedback list with filters, sorting and pagination",
              "Feedback details with rating, summary, strengths and improvements",
              "Request feedback flow with mentor selection",
              "Progress summary cards",
            ],
          },
          {
            title: "Out-of-Scope",
            items: ["Anonymous peer feedback", "Exporting feedback reports"],
          },
        ],
      },
      {
        id: "functional",
        title: "Functional Requirements",
        type: "points",
        content: [
          {
            title: "Feedback Listing",
            description: "Show mentor, title, rating, category and status for each feedback entry.",
          },
          {
            title: "Feedback Details",
            description: "Display the full summary with what went well and suggested improvements.",
          },
          {
            title: "Status Tracking",
            description: "Mark feedback as resolved or request further action from the mentor.",
          },
          {
            title: "Request Feedback",
            description: "Select a mentor, describe the work and send a feedback request with confirmation.",
          },
        ],
      },
      {
        id: "non-functional",
        title: "Non-Functional Requirements",
        type: "checklist",
        content: [
          "Responsive design including a mobile detail sheet",
          "Consistent light and dark theme styling",
          "Accessible dialogs with clear confirmation steps",
        ],
      },
      {
        id: "tech",
        title: "Technology Stack (Suggested)",
        type: "groups",
        content: [
          { title: "Frontend", items: ["Next.js", "React"] },
          { title: "UI", items: ["shadcn/ui", "Lucide icons", "Tailwind CSS"] },
        ],
      },
      {
        id: "flow",
        title: "User Flow (High-Level)",
        type: "steps",
        content: [
          "Open the Feedback page and pick an item from the list",
          "Read the summary, strengths and improvements",
          "Mark the item resolved or request further action",
          "Request fresh feedback on new work when ready",
        ],
      },
      {
        id: "kpis",
        title: "Key Performance Indicators (KPIs)",
        type: "checklist",
        content: ["Feedback items resolved", "Average mentor rating", "Time from feedback to resolution"],
      },
      {
        id: "assumptions",
        title: "Assumptions & Constraints",
        type: "groups",
        content: [
          {
            title: "Assumptions",
            items: ["Feedback entries are created by mentors", "Mock data is used in this phase"],
          },
          {
            title: "Constraints",
            items: ["Planning phase must finish before development starts", "Reuse existing shared components"],
          },
        ],
      },
      {
        id: "deliverables",
        title: "Deliverables",
        type: "points",
        content: [
          {
            title: "Feedback Module",
            description: "List, detail view, status actions and request flow ready for mentor review.",
          },
          {
            title: "Requirements Sign-off",
            description: "Confirmed scope and acceptance criteria before development begins.",
          },
        ],
      },
    ],
  },
};
