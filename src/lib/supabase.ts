/**
 * Supabase client scaffold (not wired up yet).
 * Replace the placeholders when Lovable Cloud is enabled.
 */

// import { createClient } from "@supabase/supabase-js";
// export const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL ?? "",
//   import.meta.env.VITE_SUPABASE_ANON_KEY ?? ""
// );

export const supabase = null as unknown as {
  from: (table: string) => unknown;
};

/**
 * Lightweight analytics helper. Currently logs to console;
 * swap for `supabase.from('events').insert(...)` later.
 */
export function trackEvent(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line no-console
  console.log("[trackEvent]", event, data);
}
