export interface AuthToken {
  accessToken: string;
  expiresIn: number;
}

export const AUTH_TOKEN_KEY = "accessToken";
export const TOKEN_EXPIRY_KEY = "tokenExpiry";

export const authUtils = {
  // Store authentication token
  setToken: (token: AuthToken) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_KEY, token.accessToken);
      localStorage.setItem(
        TOKEN_EXPIRY_KEY,
        (Date.now() + token.expiresIn * 1000).toString()
      );
    }
  },

  // Get stored token
  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    }
    return null;
  },

  // Check if token is valid (not expired)
  isTokenValid: (): boolean => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

      if (!token || !expiry) {
        return false;
      }

      const expiryTime = parseInt(expiry, 10);
      return Date.now() < expiryTime;
    }
    return false;
  },

  // Clear authentication data
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
    }
  },

  // Get authorization header for API requests
  getAuthHeader: (): string | null => {
    const token = authUtils.getToken();
    return token ? `Bearer ${token}` : null;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return authUtils.isTokenValid();
  },
};
