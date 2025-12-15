
// CONFIGURATION FOR ADMIN

// Set this to true to simulate a specific date (for testing)
// Set to false to use the user's real system date (for production)
export const USE_SIMULATED_DATE = false;
// If USE_SIMULATED_DATE is true, the app behaves as if it is this day:
// Format: YYYY-MM-DD
export const SIMULATED_DATE = '2024-12-15';

export const APP_URL = window.location.origin + window.location.pathname;

export const MONTH_DECEMBER = 11; // 0-indexed in JS (January is 0, December is 11)
