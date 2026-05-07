import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types";

export async function getCatalog(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw new Error(error.message);
  return (data ?? []) as Product[];
}
