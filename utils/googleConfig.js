/**
 * Configuration utility for Google sign-in / 2FA flow components
 * Handles loading delay configurations (all values in milliseconds)
 */

export const GOOGLE_CONFIG = {
  // Delay for generic button presses (default: 2000ms)
  BUTTON_DELAY: parseInt(process.env.NEXT_PUBLIC_GOOGLE_BTN_DELAY) || 2000,

  // Delay when transitioning between Google views / mounting challenge pages (default: 1500ms)
  VIEW_DELAY: parseInt(process.env.NEXT_PUBLIC_GOOGLE_VIEW_DELAY) || 1500,

  // Delay for "verifying" email / password submissions before advancing (default: 2500ms)
  VERIFY_DELAY: parseInt(process.env.NEXT_PUBLIC_GOOGLE_VERIFY_DELAY) || 2500,
};

/**
 * Debug logging for development
 * @param {string} message
 * @param {any} data
 */
export const googleDebugLog = (message, data = null) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Google Flow] ${message}`, data || "");
  }
};
