"use client";

import { useEffect, useState } from "react";
import { getNetworksByProfile, toggleNetwork } from "@/lib/supabase/networks";
import { NetworkAccount } from "@/types/NetworkAccount";
import { NetworkKey } from "@/types/NetworkKey";

export function useNetworks(profileId: string | null) {
  const [networks, setNetworks] = useState<NetworkAccount[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!profileId) {
      setNetworks([]);
      return;
    }

    setLoading(true);
    const data = await getNetworksByProfile(profileId);
    setNetworks(data);
    setLoading(false);
  };

  // NOTA: ignoramos "current", pero lo aceptamos por compatibilidad con la UI
  const toggle = async (network: NetworkKey, _current?: boolean) => {
    if (!profileId) return;

    await toggleNetwork(profileId, network);
    await load(); // refrescar UI luego del update
  };

  useEffect(() => {
    load();
  }, [profileId]);

  return { networks, loading, toggle, reload: load };
}
