// projectHelpers.js
// Small derived-data helpers so the roadmap and resources
// stay logically connected to whichever project is selected instead of
// each rendering static, disconnected content.

/**
 * Returns each roadmap phase enriched with a live task count/percent
 * derived from that project's own tasks (matched by phaseId). "done"
 * phases are always reported as fully complete; "upcoming" phases are
 * reported as locked (no tasks assigned yet).
 */
export function getRoadmapWithProgress(project) {
  const tasks = project?.tasks || [];
  return (project?.roadmap || []).map((phase) => {
    const linkedTasks = tasks.filter((task) => task.phaseId === phase.id);
    const completedCount = linkedTasks.filter((task) => task.completed).length;
    return {
      ...phase,
      linkedTaskCount: linkedTasks.length,
      completedTaskCount: completedCount,
    };
  });
}

export function getInitials(name = "") {
  return (
    name
      .split(" ")
      .filter((word) => word[0] === word[0]?.toUpperCase())
      .map((word) => word[0])
      .join("")
      .slice(0, 2) || "M"
  );
}
