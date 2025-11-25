"use client";

import { useState } from "react";
import SocialButtons from "../SocialButtons";
import { NetworkKey } from "@/types/NetworkKey";
import { NetworkAccount } from "@/types/NetworkAccount";

interface Props {
  profile: any;
  networks: NetworkAccount[];
  onToggle: (key: NetworkKey, current: boolean) => void;
}

export default function NetworksPanel({ profile, networks, onToggle }: Props) {
  const [loadingId, setLoadingId] = useState<NetworkKey | null>(null);

  const handleToggle = async (network: NetworkKey, isConnected: boolean) => {
    if (loadingId) return;

    if (isConnected) {
      const ok = confirm(`¿Seguro que deseas desconectar ${network}?`);
      if (!ok) return;
    }

    setLoadingId(network);
    await onToggle(network, isConnected);
    setLoadingId(null);
  };

  // 🔥 Si no hay perfil, mostramos mensaje y dejamos de renderizar
  if (!profile) {
    return (
      <div className="text-gray-500 text-center py-10">
        <p className="text-lg font-semibold">No hay perfiles seleccionados</p>
        <p className="text-sm mt-2">Crea un perfil para conectar tus redes sociales</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-5">
        🌐 Redes de: {profile?.profile_name || "Perfil sin nombre"}
      </h2>

      <SocialButtons
        networks={networks}
        onToggle={handleToggle}
        loadingId={loadingId}
      />
    </div>
  );
}
