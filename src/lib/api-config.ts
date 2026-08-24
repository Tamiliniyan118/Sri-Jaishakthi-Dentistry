/**
 * Centralized API configuration
 * Uses environment variable VITE_API_URL for backend base URL
 */

export const getApiBaseUrl = (): string => {
  console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);
  return import.meta.env.VITE_API_URL || "http://localhost:8000";
};

export const API_BASE_URL = getApiBaseUrl();
