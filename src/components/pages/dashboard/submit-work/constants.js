/**
 * Single source of truth for submission types.
 * Used by the dialog, toolbar filter, details view and page logic so
 * the same string always means the same thing everywhere.
 */
export const SUBMISSION_TYPES = [
  {
    value: "Source Code",
    label: "Source code",
    short: "Source Code",
    linkLabel: "GitHub commit URL",
    linkPlaceholder: "https://github.com/owner/repo/commit/<hash>",
    linkHint: "Link the exact commit(s) with your changes so your mentor can review them.",
    openLabel: "Commit",
  },
  {
    value: "Documentation",
    label: "Documentation",
    short: "Documentation",
    linkLabel: "Document link",
    linkPlaceholder: "https://docs.google.com/...",
    openLabel: "Document",
  },
  {
    value: "Design Artifacts",
    label: "Design artifacts",
    short: "Design",
    linkLabel: "Design link",
    linkPlaceholder: "https://figma.com/...",
    openLabel: "Design",
  },
  {
    value: "QA & Testing",
    label: "QA & testing",
    short: "QA & Testing",
    linkLabel: "Report link",
    linkPlaceholder: "https://...",
    openLabel: "Report",
  },
];

// Old / alternate names that may still exist in saved data.
const TYPE_ALIASES = {
  Design: "Design Artifacts",
  "Live Project": "Source Code",
};

export function resolveType(value) {
  const mapped = TYPE_ALIASES[value] || value;
  return SUBMISSION_TYPES.some((t) => t.value === mapped)
    ? mapped
    : SUBMISSION_TYPES[0].value;
}

export function getTypeMeta(value) {
  const resolved = resolveType(value);
  return SUBMISSION_TYPES.find((t) => t.value === resolved);
}

/** Which submission field stores the single "link" for a given type. */
export function linkField(type) {
  return resolveType(type) === "Source Code" ? "github" : "link";
}

export const NO_TASK = "none";

// Sample list — pass your real tasks via the `tasks` prop.
export const DEFAULT_TASKS = [
  { id: 1, title: "JWT refresh token rotation" },
  { id: 2, title: "Multi-tenant database schema" },
  { id: 4, title: "Playwright integration tests" },
  { id: 5, title: "CI/CD pipeline on AWS" },
];