"use client";

import { useEffect, useState } from "react";
import {
  getProfilesByUser,
  createProfile,
  deleteProfile,
  countConnectedNetworks,
  renameProfile,
} from "@/lib/supabase/profiles";
import { Profile } from "@/types/Profile";

export function useProfiles(userId: string | null) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selected, setSelected] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!userId) return;

    const raw = await getProfilesByUser(userId);

    const withCounts = await Promise.all(
      raw.map(async (p) => ({
        ...p,
        connected_count: await countConnectedNetworks(p.id),
      }))
    );

    setProfiles(withCounts);

    // 🔥 Si no hay perfiles, limpiar selección y detener
    if (withCounts.length === 0) {
      setSelected(null);
      setLoading(false);
      return;
    }

    // 🔥 Solo seleccionar automáticamente si no había selección previa
    if (!selected) {
      setSelected(withCounts[0]);
    }

    setLoading(false);
  };

  const addProfile = async (name: string) => {
    if (!userId) return;
    await createProfile(userId, name);
    await load();
  };

  const removeProfile = async (id: string) => {
    await deleteProfile(id);

    const newList = profiles.filter((p) => p.id !== id);
    setProfiles(newList);

    // 🔥 Si no queda ningún perfil, no crear nada automático
    if (newList.length === 0) {
      setSelected(null);
      return;
    }

    // 🔥 Si eliminaste el perfil seleccionado, seleccionar otro
    if (selected?.id === id) {
      setSelected(newList[0]);
    }
  };

const editProfile = async (id: string, newName: string) => {
  if (!userId) return;

  await renameProfile(id, userId, newName);
  await load();
};



  useEffect(() => {
    load();
  }, [userId]);

  return {
    profiles,
    selected,
    setSelected,
    loading,
    addProfile,
    removeProfile,
    editProfile,
    reload: load,
  };
}
