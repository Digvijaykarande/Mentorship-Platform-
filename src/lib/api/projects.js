import { apiClient } from "./client";

export const projectsApi = {
  /**
   * List all assigned projects
   */
  async getProjects() {
    return apiClient("/projects");
  },

  /**
   * Get single project by ID with documentation and resources
   */
  async getProjectById(projectId) {
    return apiClient(`/projects/${projectId}`);
  },

  /**
   * Request review from supervisor/mentor for a project
   */
  async requestReview(projectId, { mentorName, note }) {
    return apiClient(`/projects/${projectId}/request-review`, {
      method: "POST",
      body: { mentorName, note },
    });
  },

  /**
   * Schedule a 1-on-1 meeting with mentor
   */
  async scheduleMeeting(projectId, { mentorName, date, timeSlot, agenda }) {
    return apiClient(`/projects/${projectId}/meetings`, {
      method: "POST",
      body: { mentorName, date, timeSlot, agenda },
    });
  },

  /**
   * Upload documentation / artifact to project resources
   */
  async uploadResource(projectId, { name, category, fileUrl, size }) {
    return apiClient(`/projects/${projectId}/resources`, {
      method: "POST",
      body: { name, category, fileUrl, size },
    });
  },
};
