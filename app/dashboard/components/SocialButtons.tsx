"use client";

import { NetworkKey } from "@/types/NetworkKey";
import { NetworkAccount } from "@/types/NetworkAccount";
import NetworkButton from "./NetworksPanel/NetworkButton";

import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Hexagon,
} from "lucide-react";

interface Props {
  networks: NetworkAccount[];
  onToggle: (key: NetworkKey, current: boolean) => void;
  loadingId?: NetworkKey | null;
}

const NETWORKS = [
  {
    key: "instagram" as NetworkKey,
    label: "Instagram",
    color: "#E1306C",
    icon: <Instagram size={20} />,
  },
  {
    key: "facebook" as NetworkKey,
    label: "Facebook",
    color: "#1877F2",
    icon: <Facebook size={20} />,
  },
  {
    key: "tiktok" as NetworkKey,
    label: "TikTok",
    color: "#000000",
    icon: <Hexagon size={20} />,
  },
  {
    key: "linkedin" as NetworkKey,
    label: "LinkedIn",
    color: "#0A66C2",
    icon: <Linkedin size={20} />,
  },
  {
    key: "threads" as NetworkKey,
    label: "Threads",
    color: "#000000",
    icon: <Twitter size={20} />,
  },
];

export default function SocialButtons({ networks, onToggle, loadingId }: Props) {
  return (
    <div className="space-y-3">
      {NETWORKS.map((net) => {
        const found = networks.find((n) => n.network === net.key);
        const active = found?.is_connected ?? false;

        return (
          <NetworkButton
            key={net.key}
            icon={net.icon}
            label={net.label}
            active={active}
            color={net.color}
            loading={loadingId === net.key}
            onClick={() => onToggle(net.key, active)}
          />
        );
      })}
    </div>
  );
}
