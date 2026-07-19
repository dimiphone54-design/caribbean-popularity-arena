import { getSupabaseClient } from "@/lib/supabase/client";

/* ─── Types ────────────────────────────────────────────── */

export type SellerRow = {
  id: string;
  created_at: string;
  display_name: string;
  country: string | null;
  payment_url: string | null;
  status: string;
  is_public: boolean;
  product_title: string | null;
  product_description: string | null;
  price_label: string | null;
};

export type TeacherRow = {
  id: string;
  created_at: string;
  display_name: string;
  country: string | null;
  payment_url: string | null;
  status: string;
  is_public: boolean;
  university: string | null;
  subject: string | null;
};

export type CreatorRow = {
  id: string;
  created_at: string;
  display_name: string;
  country: string | null;
  payment_url: string | null;
  status: string;
  is_public: boolean;
  lane: string | null;
  project_description: string | null;
};

export type MarketplaceTable = "sellers" | "teachers" | "creators";

/* ─── Write helpers ───────────────────────────────────── */

function requireClient() {
  const client = getSupabaseClient();
  if (!client) throw new Error("storage not configured");
  return client;
}

/* ─── Sellers ────────────────────────────────────────── */

type CreateSellerInput = {
  display_name: string;
  country?: string;
  payment_url?: string;
  product_title?: string;
  product_description?: string;
  price_label?: string;
};

export async function createSeller(data: CreateSellerInput): Promise<void> {
  const client = requireClient();
  const { error } = await client
    .from("sellers")
    .insert({ ...data, status: "pending", is_public: false });
  if (error) {
    console.error("createSeller error:", error);
    throw new Error(error.message);
  }
}

export async function listPublicSellers(): Promise<SellerRow[]> {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data, error } = await client
    .from("sellers")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as SellerRow[];
}

/* ─── Teachers ───────────────────────────────────────── */

type CreateTeacherInput = {
  display_name: string;
  country?: string;
  payment_url?: string;
  university?: string;
  subject?: string;
};

export async function createTeacher(data: CreateTeacherInput): Promise<void> {
  const client = requireClient();
  const { error } = await client
    .from("teachers")
    .insert({ ...data, status: "pending", is_public: false });
  if (error) {
    console.error("createTeacher error:", error);
    throw new Error(error.message);
  }
}

export async function listPublicTeachers(): Promise<TeacherRow[]> {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data, error } = await client
    .from("teachers")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as TeacherRow[];
}

/* ─── Creators ───────────────────────────────────────── */

type CreateCreatorInput = {
  display_name: string;
  country?: string;
  payment_url?: string;
  lane?: string;
  project_description?: string;
};

export async function createCreator(data: CreateCreatorInput): Promise<void> {
  const client = requireClient();
  const { error } = await client
    .from("creators")
    .insert({ ...data, status: "pending", is_public: false });
  if (error) {
    console.error("createCreator error:", error);
    throw new Error(error.message);
  }
}

export async function listPublicCreators(): Promise<CreatorRow[]> {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data, error } = await client
    .from("creators")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as CreatorRow[];
}