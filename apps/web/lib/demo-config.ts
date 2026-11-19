/**
 * FOUND — Demo Login Configuration
 *
 * Controls whether the "Explore with Demo Account" button is available.
 * Demo login is ONLY enabled in development when the Firebase Emulator is active.
 * It is NEVER enabled in production builds.
 *
 * Security:
 * - Demo login requires explicit opt-in via NEXT_PUBLIC_ENABLE_DEMO_LOGIN=true.
 * - Demo login requires emulator mode (NEXT_PUBLIC_FIREBASE_USE_EMULATOR=true).
 * - The demo credentials are NOT embedded in production bundles.
 * - Demo users are regular users — never admin.
 */

// Development-only flag. In production builds this is always false.
const isDev = process.env.NODE_ENV === "development";

// Explicit opt-in for demo login (must be true in .env.local for dev)
const enableDemoLogin = process.env.NEXT_PUBLIC_ENABLE_DEMO_LOGIN === "true";

// Whether Firebase Emulator mode is active (required for demo login)
const useEmulator = process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === "true";

// Demo login is enabled ONLY in dev, with explicit opt-in AND emulator mode.
export const DEMO_LOGIN_ENABLED = isDev && enableDemoLogin && useEmulator;

// Demo credentials — only used client-side to sign in via Firebase Auth.
// These are development-only values; they must never be committed to production.
export const DEMO_CREDENTIALS = {
  email: process.env.NEXT_PUBLIC_DEMO_EMAIL || "demo@found.in",
  password: process.env.NEXT_PUBLIC_DEMO_PASSWORD || "DemoPassword123!",
};

export default DEMO_LOGIN_ENABLED;
