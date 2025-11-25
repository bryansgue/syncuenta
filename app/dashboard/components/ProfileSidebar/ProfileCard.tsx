// app/dashboard/components/ProfileSidebar/ProfileCard.tsx

"use client";

import { useState } from "react";
import { Profile } from "@/types/Profile";
import { Trash2, Loader2 } from "lucide-react";

interface Props {
  profile: Profile;
  selected: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export default function ProfileCard({
  profile,
  selected,
  onClick,
  onDelete,
}: Props) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // evitar seleccionar al borrar

    if (deleting) return;

    const ok = confirm(`¿Seguro que deseas eliminar el perfil "${profile.profile_name}"?`);
    if (!ok) return;

    setDeleting(true);
    await onDelete();
    setDeleting(false);
  };

  return (
    <div
      onClick={() => {
        if (!deleting) onClick();
      }}
      className={`
        group p-4 rounded-xl border cursor-pointer select-none
        transition-all duration-200 shadow-sm
        hover:shadow-md hover:bg-gray-50
        ${selected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}
        ${deleting ? "opacity-60 pointer-events-none" : ""}
      `}
    >
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">{profile.profile_name}</p>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className={`
            p-2 rounded-lg transition
            ${deleting ? "text-gray-400" : "text-red-500 hover:bg-red-100"}
          `}
        >
          {deleting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Trash2 size={16} />
          )}
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-1">
        Redes conectadas: <b>{profile.connected_count ?? 0}</b>
      </p>
    </div>
  );
}
