import { apiClient } from "./client";

export const submissionsApi = {
  /**
   * List all deliverables and submissions
   */
  async getSubmissions(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/submissions?${query}` : "/submissions";
    return apiClient(endpoint);
  },

  /**
   * Get single submission details including version history
   */
  async getSubmissionById(id) {
    return apiClient(`/submissions/${id}`);
  },

  /**
   * Create a new deliverable submission
   */
  async createSubmission(payload) {
    return apiClient("/submissions", {
      method: "POST",
      body: payload,
    });
  },

  /**
   * Edit submission while under review
   */
  async updateSubmission(id, payload) {
    return apiClient(`/submissions/${id}`, {
      method: "PUT",
      body: payload,
    });
  },

  /**
   * Submit revision following mentor feedback
   */
  async submitRevision(id, payload) {
    return apiClient(`/submissions/${id}/revisions`, {
      method: "POST",
      body: payload,
    });
  },

  /**
   * Withdraw submission from mentor review
   */
  async withdrawSubmission(id) {
    return apiClient(`/submissions/${id}/withdraw`, {
      method: "POST",
    });
  },

  /**
   * Delete submission
   */
  async deleteSubmission(id) {
    return apiClient(`/submissions/${id}`, {
      method: "DELETE",
    });
  },

  /**
   * Upload asset files for a submission
   */
  async uploadFiles(formData) {
    return apiClient("/submissions/upload", {
      method: "POST",
      body: formData,
      isFormData: true,
    });
  },
};
