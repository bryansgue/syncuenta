"use client";

import { useState } from "react";
import { Profile } from "@/types/Profile";
import ProfileCard from "./ProfileCard";

interface Props {
  profiles: Profile[];
  selected: Profile | null;
  onSelect: (p: Profile) => void;
  onCreate: (name: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string, newName: string) => Promise<void>; 
}

export default function ProfileSidebar({
  profiles,
  selected,
  onSelect,
  onCreate,
  onDelete,
  onEdit,
}: Props) {
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!name.trim() || creating) return;

    setCreating(true);
    await onCreate(name.trim());
    setName("");
    setCreating(false);
  };

  return (
    <div className="space-y-6">

      {/* ======= BLOQUE SUPERIOR (SIEMPRE VISIBLE) ======= */}
      <div className="bg-white/80 backdrop-blur p-5 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-3">Crear nuevo perfil</h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ej: MonoMijin, Negocio..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            className="border p-2 rounded-xl w-full focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            onClick={handleCreate}
            disabled={creating}
            className={`
              bg-blue-600 text-white px-4 rounded-xl transition
              hover:bg-blue-700 
              ${creating ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            {creating ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Crear"
            )}
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold">Tus perfiles</h2>

      {/* ======= LISTA DE PERFILES CON SCROLL OPCIONAL ======= */}
      <div
        className={`
          space-y-3 
          transition-all duration-300

          ${profiles.length > 4 ? "max-h-[450px] overflow-y-auto pr-2" : ""}
        `}
      >
        {profiles.map((p) => (
          <ProfileCard
            key={p.id}
            profile={p}
            selected={selected?.id === p.id}
            onClick={() => onSelect(p)}
            onDelete={() => onDelete(p.id)}
            onEdit={(newName) => onEdit(p.id, newName)}
          />
        ))}
      </div>

    </div>
  );
}
