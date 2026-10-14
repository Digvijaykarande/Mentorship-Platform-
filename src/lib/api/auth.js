import { apiClient, authStorage } from "./client";

export const authApi = {
  /**
   * Log in user with email and password
   */
  async login({ email, password, remember = true }) {
    const res = await apiClient("/auth/login", {
      method: "POST",
      body: { email, password, remember },
      requiresAuth: false,
    });
    if (res?.token) {
      authStorage.setToken(res.token);
    }
    return res;
  },

  /**
   * Register a new intern or mentor account
   */
  async register({ name, email, password, role = "intern" }) {
    const res = await apiClient("/auth/register", {
      method: "POST",
      body: { name, email, password, role },
      requiresAuth: false,
    });
    if (res?.token) {
      authStorage.setToken(res.token);
    }
    return res;
  },

  /**
   * Sign out and clear stored session token
   */
  async logout() {
    try {
      await apiClient("/auth/logout", { method: "POST" });
    } catch {
      // Ignore network errors on logout
    } finally {
      authStorage.removeToken();
    }
  },

  /**
   * Fetch current authenticated user profile
   */
  async getMe() {
    return apiClient("/auth/me");
  },

  /**
   * Update current user profile details
   */
  async updateProfile(profileData) {
    return apiClient("/auth/profile", {
      method: "PUT",
      body: profileData,
    });
  },
};
