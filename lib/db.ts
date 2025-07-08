import { supabase } from "./supabase";
import type { Listing } from "./types";

export async function getListings(): Promise<Listing[]> {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false }) // latest first
    .limit(50); // fetch up to 50 listings

  if (error) {
    throw new Error(error.message);
  }

  return data as Listing[];
}
