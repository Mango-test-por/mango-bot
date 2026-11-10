// API Configuration
//
// NEXT_PUBLIC_BACKEND_URL is the absolute backend origin by default: Vercel's
// security checkpoint intercepts same-origin API XHR/beacons it cannot
// resolve, which was dropping the entry ping and exit beacon. A relative path
// ("/backend") proxies through the app's own origin instead (Next rewrites).
const RAW_BASE = (
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const IS_RELATIVE = RAW_BASE.startsWith("/");

// Helper function to build API URLs
export const buildApiUrl = (endpoint) => `${RAW_BASE}${endpoint}`;

// Socket.IO. webSocket handshakes depend on a persistent HTTP connection, so
// the most reliable path is straight to the backend (NEXT_PUBLIC_SOCKET_URL).
// Without an override it uses the same-origin /backend proxy (polling only on
// platform proxies that cannot tunnel WebSocket upgrades).
const SOCKET_BASE = (process.env.NEXT_PUBLIC_SOCKET_URL || "").replace(
  /\/+$/,
  ""
);

// Socket.IO URL: undefined means "same origin" (used with a relative base).
export const getSocketUrl = () =>
  SOCKET_BASE || (IS_RELATIVE ? undefined : RAW_BASE);

// Socket.IO path: must include the proxy prefix when the base is relative.
export const getSocketPath = () =>
  SOCKET_BASE || !IS_RELATIVE ? "/socket.io" : `${RAW_BASE}/socket.io`;
