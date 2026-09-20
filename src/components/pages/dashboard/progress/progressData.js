// progressData.js
// Single source of truth for the Progress page.
// Headline numbers (overall %, on-time rate, average rating...) are DERIVED from
// the raw data below, so the KPI strip, ring, breakdown and charts can never disagree.
// Swap the raw exports for API calls later; the derived values will keep working.

const pct = (part, total) => (total ? Math.round((part / total) * 100) : 0);
const average = (list) => list.reduce((sum, n) => sum + n, 0) / list.length;

/* ------------------------------ Internship ------------------------------ */

export const INTERNSHIP = {
  currentWeek: 9,
  totalWeeks: 12,
  endDate: "Oct 9",
};

/* ------------------------------ Weekly history ------------------------------ */
// Only weeks that have actually happened. `completion` is cumulative, `tasks` is per week.
// The last `completion` value must equal OVERALL_PROGRESS below.

export const WEEKLY_PROGRESS = [
  { week: "W1", start: "Jul 20", completion: 14, tasks: 2 },
  { week: "W2", start: "Jul 27", completion: 22, tasks: 3 },
  { week: "W3", start: "Aug 3", completion: 31, tasks: 4 },
  { week: "W4", start: "Aug 10", completion: 38, tasks: 3 },
  { week: "W5", start: "Aug 17", completion: 47, tasks: 5 },
  { week: "W6", start: "Aug 24", completion: 57, tasks: 6 },
  { week: "W7", start: "Aug 31", completion: 66, tasks: 7 },
  { week: "W8", start: "Sep 7", completion: 73, tasks: 5 },
  { week: "W9", start: "Sep 14", completion: 78, tasks: 5 },
];

/* ------------------------------ Raw data ------------------------------ */

// Same projects as the My Projects page.
export const PROJECTS = [
  { id: "intern-dashboard", name: "Intern Dashboard UI", status: "In Progress", progress: 78 },
  { id: "task-management", name: "Task Management Module", status: "Under Review", progress: 92 },
  { id: "feedback-module", name: "Feedback & Progress Module", status: "Planning", progress: 25 },
  { id: "onboarding-portal", name: "Onboarding Portal", status: "Completed", progress: 100 },
];

export const TASKS = {
  total: 48,
  completed: 40,
  inProgress: 4,
  pending: 3,
  overdue: 1,
  completedOnTime: 37,
};

export const LEARNING = { total: 12, completed: 9 };

export const SKILLS = [
  { id: "react", name: "React.js", category: "Frontend", progress: 88 },
  { id: "tailwind", name: "Tailwind CSS", category: "UI development", progress: 90 },
  { id: "javascript", name: "JavaScript", category: "Programming", progress: 85 },
  { id: "nextjs", name: "Next.js", category: "Frontend", progress: 78 },
  { id: "git", name: "Git & GitHub", category: "Dev tools", progress: 72 },
  { id: "rest", name: "REST APIs", category: "Backend integration", progress: 68 },
  { id: "uiux", name: "UI/UX design", category: "Design", progress: 65 },
];

export const LEARNING_ITEMS = [
  { id: "l1", title: "Responsive Web Design", type: "Course", status: "In progress" },
  { id: "l2", title: "Git & GitHub Basics", type: "Learning module", status: "Completed" },
  { id: "l3", title: "React Fundamentals", type: "Course", status: "Completed" },
];

export const CODE_STATS = {
  submissions: 28,
  pullRequests: 19,
  pullRequestsMerged: 15,
  bugsReported: 25,
  bugsResolved: 24,
  linesContributed: "4.8k",
  qualityScore: 92,
};

export const FEEDBACK = {
  totalReviews: 8,
  trend: "Improving",
  mentor: "Rahul Patil",
  mentorRole: "Senior Software Developer · Mentor",
  date: "Sep 15, 2026",
  quote:
    "Good progress on the dashboard. Focus next on responsive behavior, reusable components and a consistent experience across the remaining modules.",
  ratings: [
    { label: "Technical skills", value: 4.9 },
    { label: "Code quality", value: 4.8 },
    { label: "Communication", value: 4.7 },
    { label: "Ownership", value: 4.8 },
  ],
  strengths: ["Problem solving", "Consistent delivery", "Clean code"],
  focusAreas: ["Backend architecture", "Automated tests"],
};

export const ACHIEVEMENTS = [
  {
    id: "tasks-40",
    title: "40 tasks completed",
    description: "Finished 40 assigned internship tasks.",
    date: "2026-09-17",
    icon: "check",
    tone: "emerald",
  },
  {
    id: "mentors-choice",
    title: "Mentor's choice",
    description: "Recognised for consistent performance.",
    date: "2026-09-05",
    icon: "star",
    tone: "rose",
  },
  {
    id: "skill-builder",
    title: "Skill builder",
    description: "Reached a new level in four skills.",
    date: "2026-08-22",
    icon: "book",
    tone: "blue",
  },
  {
    id: "first-project",
    title: "First project delivered",
    description: "Onboarding Portal approved by your mentor.",
    date: "2026-08-10",
    icon: "trophy",
    tone: "amber",
  },
  {
    id: "code-contributor",
    title: "Code contributor",
    description: "First production-ready contribution.",
    date: "2026-08-08",
    icon: "code",
    tone: "violet",
  },
];

export const NEXT_ACHIEVEMENT = {
  title: "50 tasks completed",
  current: TASKS.completed,
  target: 50,
};

export const RECENT_ACTIVITY = [
  {
    id: "a1",
    type: "task",
    title: "Completed responsive dashboard layout",
    description: "Marked the layout task as done.",
    time: "Today, 6:30 PM",
  },
  {
    id: "a2",
    type: "project",
    title: "Intern Dashboard UI reached 78%",
    description: "Progress updated after the latest sprint tasks.",
    time: "Today, 4:15 PM",
  },
  {
    id: "a3",
    type: "achievement",
    title: "Badge earned: 40 tasks completed",
    description: "You crossed the 40-task milestone.",
    time: "Sep 17",
  },
  {
    id: "a4",
    type: "feedback",
    title: "New feedback from Rahul Patil",
    description: "Review on the dashboard implementation.",
    time: "Sep 15",
  },
  {
    id: "a5",
    type: "submission",
    title: "Submitted Task Management Module",
    description: "Sent for mentor review.",
    time: "Sep 12",
  },
];

/* ------------------------------ Derived values ------------------------------ */

export const BREAKDOWN = [
  {
    key: "projects",
    label: "Projects",
    value: Math.round(average(PROJECTS.map((p) => p.progress))),
    tone: "blue",
  },
  { key: "tasks", label: "Tasks", value: pct(TASKS.completed, TASKS.total), tone: "indigo" },
  { key: "learning", label: "Learning", value: pct(LEARNING.completed, LEARNING.total), tone: "violet" },
  {
    key: "skills",
    label: "Skills",
    value: Math.round(average(SKILLS.map((s) => s.progress))),
    tone: "emerald",
  },
];

export const OVERALL_PROGRESS = Math.round(average(BREAKDOWN.map((b) => b.value)));

// Straight-line pace: where you "should" be this week if progress were even.
export const EXPECTED_PROGRESS = Math.round(
  (INTERNSHIP.currentWeek / INTERNSHIP.totalWeeks) * 100
);

export const ON_TIME_RATE = pct(TASKS.completedOnTime, TASKS.completed);

export const AVERAGE_RATING = Number(
  average(FEEDBACK.ratings.map((r) => r.value)).toFixed(1)
);

export function getSkillLevel(progress) {
  if (progress >= 85) return "Advanced";
  if (progress >= 60) return "Intermediate";
  return "Beginner";
}

export function formatShortDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}
