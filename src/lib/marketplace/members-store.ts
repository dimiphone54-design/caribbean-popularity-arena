import { getSupabaseClient } from "@/lib/supabase/client";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export type MemberRow = {
  id: string;
  created_at: string;
  updated_at: string;
  display_name: string;
  email: string;
  country: string | null;
  island_code: string | null;
  live_focus: string | null;
  dropship_item_name: string | null;
  dropship_store_url: string | null;
  dropship_notes: string | null;
  voice_language: string | null;
  terms_agreed_at: string | null;
};

export type MemberDraft = {
  display_name: string;
  email: string;
  country?: string;
  island_code?: string;
  live_focus?: string;
  dropship_item_name?: string;
  dropship_store_url?: string;
  dropship_notes?: string;
  voice_language?: string;
  terms_agreed: boolean;
};

function requireClient() {
  const client = getSupabaseClient();
  if (!client) throw new Error("storage not configured");
  return client;
}

export async function createMember(draft: MemberDraft): Promise<{ id: string }> {
  const client = requireClient();
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  const { error } = await client
    .from("members")
    .insert({
      id,
      display_name: draft.display_name,
      email: draft.email.toLowerCase(),
      country: draft.country || null,
      island_code: draft.island_code || null,
      live_focus: draft.live_focus || null,
      dropship_item_name: draft.dropship_item_name || null,
      dropship_store_url: draft.dropship_store_url || null,
      dropship_notes: draft.dropship_notes || null,
      voice_language: draft.voice_language || null,
      terms_agreed_at: draft.terms_agreed ? now : null,
    });
  if (error) {
    console.error("createMember error:", error);
    throw new Error(error.message);
  }
  return { id };
}

export type MemberRegistryRow = Pick<
  MemberRow,
  "id" | "display_name" | "email" | "country" |
  "island_code" | "terms_agreed_at" | "created_at"
>;

export async function listMembers(): Promise<MemberRegistryRow[]> {
  const client = getSupabaseAdminClient();
  const { data, error } = await client
    .from("members")
    .select("id,display_name,email,country,island_code,terms_agreed_at,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("listMembers error:", error);
    throw new Error("Unable to read member registry");
  }

  return (data ?? []) as MemberRegistryRow[];
}