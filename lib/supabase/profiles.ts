import { supabase } from "./client";
import { Profile } from "@/types/Profile";

export async function getProfilesByUser(userId: string): Promise<Profile[]> {
  const { data, error } = await supabase
    .from("profiles_social")
    .select("*")
    .eq("user_id", userId)
    .order("created_at");

  if (error) throw error;

  return data || [];
}

export async function createProfile(userId: string, name: string) {
  const { error } = await supabase.from("profiles_social").insert({
    user_id: userId,
    profile_name: name,
  });
  if (error) throw error;
}

export async function deleteProfile(profileId: string) {
  const { error } = await supabase
    .from("profiles_social")
    .delete()
    .eq("id", profileId);

  if (error) throw error;
}

export async function countConnectedNetworks(profileId: string): Promise<number> {
  const { count } = await supabase
    .from("profile_network_accounts")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", profileId)
    .eq("is_connected", true);

  return count || 0;
}
