import { supabase } from "./client";
import { NetworkKey } from "@/types/NetworkKey";
import { NetworkAccount } from "@/types/NetworkAccount";

// =======================================
// OBTENER LISTA DE REDES PARA EL PERFIL
// =======================================
export async function getNetworksByProfile(
  profileId: string
): Promise<NetworkAccount[]> {
  const { data, error } = await supabase
    .from("profile_network_accounts")
    .select("*")
    .eq("profile_id", profileId);

  if (error) {
    console.error("❌ Error obteniendo redes:", error);
    return [];
  }

  return data || [];
}

// =======================================
// 🔥 TOGGLE ROBUSTO (usa datos REALES DE BD)
// =======================================
export async function toggleNetwork(
  profileId: string,
  network: NetworkKey
) {
  try {
    // 1) Buscar registro existente
    const { data: existing, error: searchError } = await supabase
      .from("profile_network_accounts")
      .select("*")
      .eq("profile_id", profileId)
      .eq("network", network)
      .maybeSingle();

    if (searchError) {
      console.error("❌ Error buscando la red:", searchError);
      return;
    }

    // 2) No existe → crearlo conectado
    if (!existing) {
      const { error: insertErr } = await supabase
        .from("profile_network_accounts")
        .insert({
          profile_id: profileId,
          network,
          is_connected: true,
        });

      if (insertErr) console.error("❌ Error insertando:", insertErr);
      return;
    }

    // 3) Existe → togglear usando SU valor actual
    const newState = !existing.is_connected;

    const { error: updateError } = await supabase
      .from("profile_network_accounts")
      .update({ is_connected: newState })
      .eq("id", existing.id);

    if (updateError) {
      console.error("❌ Error actualizando:", updateError);
    }

  } catch (error) {
    console.error("❌ Error inesperado en toggleNetwork:", error);
  }
}
