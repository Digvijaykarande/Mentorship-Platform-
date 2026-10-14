import { apiClient } from "./client";

export const feedbackApi = {
  /**
   * Get all mentor feedback items
   */
  async getFeedback(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/feedback?${query}` : "/feedback";
    return apiClient(endpoint);
  },

  /**
   * Request feedback from a mentor
   */
  async requestFeedback({ mentor, subject, message, projectId = null, taskId = null }) {
    return apiClient("/feedback/request", {
      method: "POST",
      body: { mentor, subject, message, projectId, taskId },
    });
  },

  /**
   * Update feedback status (e.g. In Review, Resolved, Action Required)
   */
  async updateFeedbackStatus(id, status) {
    return apiClient(`/feedback/${id}/status`, {
      method: "PATCH",
      body: { status },
    });
  },
};
