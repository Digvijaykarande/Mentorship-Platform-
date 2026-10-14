/**
 * Mentor-Project API Client
 * 
 * Provides a production-ready HTTP abstraction for communicating with the backend.
 * - Automatically injects JWT Bearer tokens from localStorage
 * - Centralizes error handling and formatting
 * - Supports JSON and FormData (file uploads)
 * - Configurable via process.env.NEXT_PUBLIC_API_URL
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
const TOKEN_STORAGE_KEY = "loyanox_auth_token";

export class ApiError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export const authStorage = {
  getToken: () => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  },
  setToken: (token) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch {}
  },
  removeToken: () => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {}
  },
};

/**
 * Core fetch wrapper with auth header injection and status validation
 */
export async function apiClient(endpoint, options = {}) {
  const {
    method = "GET",
    body = null,
    headers = {},
    requiresAuth = true,
    isFormData = false,
    ...customOptions
  } = options;

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  const requestHeaders = { ...headers };

  if (!isFormData && !requestHeaders["Content-Type"]) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (requiresAuth) {
    const token = authStorage.getToken();
    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  const config = {
    method,
    headers: requestHeaders,
    ...customOptions,
  };

  if (body) {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    if (response.status === 204) {
      return null;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        data?.message || data?.error || `Request failed with status ${response.status}`;
      throw new ApiError(errorMessage, response.status, data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || "Network request failed. Is the server online?", 0, error);
  }
}
