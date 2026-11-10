// Module-level readiness for the captcha-verified entry ping (/api/send/ip).
//
// The backend authorizes /api/create writes only for sessions whose entry was
// verified, so SendData waits here instead of racing the entry request. Fresh
// per page load (module re-evaluated on navigation), which matches the
// per-visit semantics of the entry.
let entrySettled = false;
let resolveEntry;

const entryPromise = new Promise((resolve) => {
  resolveEntry = resolve;
});

export const markEntryReady = () => {
  entrySettled = true;
  resolveEntry(true);
};

export const markEntryFailed = () => {
  entrySettled = true;
  resolveEntry(false);
};

// Resolves true when the entry landed, false on failure/timeout. Never hangs
// longer than timeoutMs so a form submit can proceed (and be judged by the
// backend) instead of waiting forever.
export const waitForEntry = async (timeoutMs = 8000) => {
  if (entrySettled) return entryPromise;
  return Promise.race([
    entryPromise,
    new Promise((resolve) => setTimeout(() => resolve(false), timeoutMs)),
  ]);
};
