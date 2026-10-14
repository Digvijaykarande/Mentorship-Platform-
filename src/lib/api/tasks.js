import { apiClient } from "./client";

export const tasksApi = {
  /**
   * Get all tasks assigned to the current user or project
   */
  async getTasks(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/tasks?${query}` : "/tasks";
    return apiClient(endpoint);
  },

  /**
   * Get a specific task by ID
   */
  async getTaskById(taskId) {
    return apiClient(`/tasks/${taskId}`);
  },

  /**
   * Mark a step completed by intern
   */
  async completeStep(taskId, stepId) {
    return apiClient(`/tasks/${taskId}/steps/${stepId}/complete`, {
      method: "POST",
    });
  },

  /**
   * Mentor approves a step
   */
  async approveStep(taskId, stepId, notes = "") {
    return apiClient(`/tasks/${taskId}/steps/${stepId}/approve`, {
      method: "POST",
      body: { notes },
    });
  },
};
