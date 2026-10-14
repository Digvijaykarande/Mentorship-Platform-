import { apiClient } from "./client";

export const notificationsApi = {
  /**
   * Get all notifications
   */
  async getNotifications() {
    return apiClient("/notifications");
  },

  /**
   * Toggle read/unread status on a notification
   */
  async toggleRead(id) {
    return apiClient(`/notifications/${id}/toggle-read`, {
      method: "PATCH",
    });
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead() {
    return apiClient("/notifications/mark-all-read", {
      method: "POST",
    });
  },

  /**
   * Delete a notification
   */
  async deleteNotification(id) {
    return apiClient(`/notifications/${id}`, {
      method: "DELETE",
    });
  },

  /**
   * Clear all notifications
   */
  async clearAll() {
    return apiClient("/notifications/clear-all", {
      method: "DELETE",
    });
  },
};
