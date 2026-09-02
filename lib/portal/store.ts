import type { PortalStore } from "./types";
import { demoStore } from "./demo-store";

/**
 * Picks the active backend. With SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY set
 * (see .env.example) the portal uses the real database; otherwise it falls back
 * to the seeded in-memory demo store.
 */

export function isDemoMode(): boolean {
  return !(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function getStore(): Promise<PortalStore> {
  if (isDemoMode()) return demoStore;
  const { supabaseStore } = await import("./supabase-store");
  return supabaseStore;
}
