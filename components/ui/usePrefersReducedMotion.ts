import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * `prefers-reduced-motion`, read via `useSyncExternalStore` rather than a
 * `useState` + `useEffect(() => setState(...))` pair — the latter trips this
 * project's `react-hooks/set-state-in-effect` lint rule (setState directly
 * in an effect body causes an extra cascading render) and, more importantly,
 * `useSyncExternalStore`'s `getServerSnapshot` gives an explicit, correct
 * "false" value for the server/first-client-render pass, so there's never a
 * hydration mismatch to begin with.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
