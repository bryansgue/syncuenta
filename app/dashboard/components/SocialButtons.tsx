"use client";

import React from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Hexagon,
} from "lucide-react";

// Redes soportadas
export type NetworkKey =
  | "instagram"
  | "facebook"
  | "tiktok"
  | "linkedin"
  | "threads";

// Props del componente
interface Props {
  profileId: string;
  networks: any[]; // redes provenientes de Supabase
  reload: () => void; // función para recargar desde Supabase
}

// Lista estática de redes sociales
interface Network {
  key: NetworkKey;
  label: string;
  color: string;
  icon: React.ReactNode;
}

export default function SocialButtons({ profileId, networks, reload }: Props) {
  const list: Network[] = [
    {
      key: "instagram",
      label: "Instagram",
      color: "#E1306C",
      icon: <Instagram size={20} />,
    },
    {
      key: "facebook",
      label: "Facebook",
      color: "#1877F2",
      icon: <Facebook size={20} />,
    },
    {
      key: "tiktok",
      label: "TikTok",
      color: "#000000",
      icon: <Hexagon size={20} />,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      color: "#0A66C2",
      icon: <Linkedin size={20} />,
    },
    {
      key: "threads",
      label: "Threads",
      color: "#000000",
      icon: <Twitter size={20} />,
    },
  ];

  // Determinar si una red ya está conectada
  const isConnected = (key: NetworkKey) =>
    networks.some((n) => n.network === key && n.is_connected === true);

  // Alternar conexión/desconexión
  const toggle = async (network: NetworkKey) => {
    const existing = networks.find((n) => n.network === network);

    if (!existing) {
      // Insertar nuevo
      await supabase.from("profile_network_accounts").insert({
        profile_id: profileId,
        network,
        is_connected: true,
      });
    } else {
      // Actualizar el existente
      await supabase
        .from("profile_network_accounts")
        .update({ is_connected: !existing.is_connected })
        .eq("id", existing.id);
    }

    reload(); // Recargar desde la BD
  };

  return (
    <div className="space-y-3">
      {list.map((net) => {
        const active = isConnected(net.key);

        return (
          <button
            key={net.key}
            onClick={() => toggle(net.key)}
            className="w-full flex items-center justify-between p-4 rounded-lg shadow border hover:scale-[1.02] transition-transform"
            style={{
              background: active ? net.color : "#f8f8f8",
              color: active ? "white" : "#333",
            }}
          >
            <div className="flex items-center gap-2">
              {net.icon}
              <span className="font-semibold">{net.label}</span>
            </div>

            <span className="text-sm px-3 py-1 rounded bg-white text-black shadow">
              {active ? "Conectado" : "Conectar"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
