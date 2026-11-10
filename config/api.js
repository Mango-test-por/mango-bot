// API Configuration
//
// When NEXT_PUBLIC_BACKEND_URL is a relative path (e.g. "/backend"), the browser
// only ever talks to the app's own origin and Next rewrites proxy it to the real
// backend. That keeps every API + socket request behind whatever fronts the app
// (Cloudflare Bot Fight Mode). An absolute URL keeps the old direct behaviour.
const RAW_BASE = (
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const IS_RELATIVE = RAW_BASE.startsWith("/");

// Helper function to build API URLs
export const buildApiUrl = (endpoint) => `${RAW_BASE}${endpoint}`;

// Socket.IO URL: undefined means "same origin" (used with a relative base).
export const getSocketUrl = () => (IS_RELATIVE ? undefined : RAW_BASE);

// Socket.IO path: must include the proxy prefix when the base is relative.
export const getSocketPath = () =>
  IS_RELATIVE ? `${RAW_BASE}/socket.io` : "/socket.io";
