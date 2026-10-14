/**
 * Profile completion scoring (Naukri / LinkedIn style).
 *
 * Every field has a weight; weights add up to 100, so the earned points
 * are the percentage. To change scoring, edit `points` below (keep the total at 100).
 * `check` returns a ratio from 0 to 1, which allows partial credit (e.g. skills).
 */

const filled = (value) =>
  typeof value === "string" ? value.trim().length > 0 : Boolean(value);

const MIN_BIO_LENGTH = 50;
const SKILLS_FOR_FULL_POINTS = 5;

export const COMPLETION_FIELDS = [
  // Identity — 20
  { key: "photo", label: "Profile photo", points: 10, check: ({ hasAvatar }) => (hasAvatar ? 1 : 0) },
  { key: "name", label: "Full name", points: 5, check: ({ formData }) => (filled(formData.firstName) && filled(formData.lastName) ? 1 : 0) },
  { key: "headline", label: "Headline", points: 5, check: ({ formData }) => (filled(formData.headline) ? 1 : 0) },

  // About — 25
  { key: "bio", label: "Bio (50+ characters)", points: 10, check: ({ formData }) => ((formData.bio || "").trim().length >= MIN_BIO_LENGTH ? 1 : 0) },
  { key: "careerInterests", label: "Career interests", points: 5, check: ({ formData }) => (filled(formData.careerInterests) ? 1 : 0) },
  { key: "areasOfInterest", label: "Areas of interest", points: 5, check: ({ formData }) => (filled(formData.areasOfInterest) ? 1 : 0) },
  { key: "professionalGoals", label: "Professional goals", points: 5, check: ({ formData }) => (filled(formData.professionalGoals) ? 1 : 0) },

  // Contact & personal — 20
  { key: "phone", label: "Phone number", points: 5, check: ({ formData }) => (filled(formData.phone) ? 1 : 0) },
  { key: "email", label: "Email", points: 5, check: ({ formData }) => (filled(formData.email) ? 1 : 0) },
  { key: "location", label: "Location", points: 5, check: ({ formData }) => (filled(formData.location) ? 1 : 0) },
  { key: "dob", label: "Date of birth", points: 3, check: ({ formData }) => (filled(formData.dob) ? 1 : 0) },
  { key: "gender", label: "Gender", points: 2, check: ({ formData }) => (filled(formData.gender) ? 1 : 0) },

  // Skills — 15 (partial credit up to 5 skills)
  {
    key: "skills",
    label: `Skills (add ${SKILLS_FOR_FULL_POINTS}+)`,
    points: 15,
    check: ({ skills }) => Math.min((skills?.length || 0) / SKILLS_FOR_FULL_POINTS, 1),
  },

  // Links — 20
  { key: "linkedin", label: "LinkedIn link", points: 6, check: ({ formData }) => (filled(formData.linkedin) ? 1 : 0) },
  { key: "github", label: "GitHub link", points: 6, check: ({ formData }) => (filled(formData.github) ? 1 : 0) },
  { key: "portfolio", label: "Portfolio / website", points: 4, check: ({ formData }) => (filled(formData.portfolio) || filled(formData.website) ? 1 : 0) },
  { key: "otherLinks", label: "Other profile link", points: 4, check: ({ formData }) => ((formData.otherLinks || []).length > 0 ? 1 : 0) },
];

export function getProfileCompletion({ formData = {}, skills = [], hasAvatar = false } = {}) {
  const ctx = { formData, skills, hasAvatar };

  const items = COMPLETION_FIELDS.map((field) => {
    const ratio = Math.max(0, Math.min(1, field.check(ctx)));
    return { key: field.key, label: field.label, points: field.points, earned: field.points * ratio, done: ratio >= 1 };
  });

  const total = items.reduce((sum, item) => sum + item.points, 0);
  const earned = items.reduce((sum, item) => sum + item.earned, 0);
  const percent = Math.round((earned / total) * 100);

  // Biggest wins first, so the hint tells the user what to fix next.
  const missing = items
    .filter((item) => !item.done)
    .sort((a, b) => b.points - a.points);

  return { percent, earned, total, items, missing };
}
