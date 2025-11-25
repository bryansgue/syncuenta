"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import SocialButtons from "./components/SocialButtons";

interface Profile {
  id: string;
  profile_name: string;
  created_at: string;
  connected_count?: number;
}

interface NetworkAccount {
  id: string;
  profile_id: string;
  network: string;
  is_connected: boolean;
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [profilesSocial, setProfilesSocial] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [connectedNetworks, setConnectedNetworks] = useState<NetworkAccount[]>([]);
  const [newProfileName, setNewProfileName] = useState("");
  const [loading, setLoading] = useState(true);

  // ======================================
  //   CARGAR USUARIO + PERFILES
  // ======================================
  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return window.location.href = "/login";

      setUser(session.user);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      setProfile(profileData);

      const { data: socialProfilesRaw } = await supabase
        .from("profiles_social")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: true });

      const socialProfiles = socialProfilesRaw ?? [];

      // Cargar el conteo de redes por perfil
      const profilesWithCounts = await Promise.all(
        socialProfiles.map(async (p: Profile) => {
          const { count } = await supabase
            .from("profile_network_accounts")
            .select("*", { count: "exact", head: true })
            .eq("profile_id", p.id)
            .eq("is_connected", true);

          return { ...p, connected_count: count ?? 0 };
        })
      );

      setProfilesSocial(profilesWithCounts);

      if (profilesWithCounts.length > 0) {
        setSelectedProfile(profilesWithCounts[0]);
      }

      setLoading(false);
    };

    load();
  }, []);

  // ======================================
  //   CARGAR REDES CONECTADAS DEL PERFIL
  // ======================================
  const loadNetworks = async (profileId: string) => {
    const { data } = await supabase
      .from("profile_network_accounts")
      .select("*")
      .eq("profile_id", profileId);

    setConnectedNetworks(data ?? []);
  };

  useEffect(() => {
    if (selectedProfile?.id) {
      loadNetworks(selectedProfile.id);
    }
  }, [selectedProfile]);

  // ======================================
  //   CREAR PERFIL
  // ======================================
  const createProfile = async () => {
    if (!newProfileName.trim()) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    await supabase.from("profiles_social").insert({
      user_id: session.user.id,
      profile_name: newProfileName.trim(),
    });

    setNewProfileName("");

    // Recargar perfiles
    const { data: socialProfilesRaw } = await supabase
      .from("profiles_social")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at");

    const socialProfiles = socialProfilesRaw ?? [];

    const profilesWithCounts = await Promise.all(
      socialProfiles.map(async (p: Profile) => {
        const { count } = await supabase
          .from("profile_network_accounts")
          .select("*", { count: "exact", head: true })
          .eq("profile_id", p.id)
          .eq("is_connected", true);

        return { ...p, connected_count: count ?? 0 };
      })
    );

    setProfilesSocial(profilesWithCounts);
    setSelectedProfile(profilesWithCounts.at(-1)!);
  };


  // ======================================
  //   ELIMINAR PERFIL
  // ======================================
  const deleteProfile = async (id: string) => {
    await supabase.from("profiles_social").delete().eq("id", id);

    const updated = profilesSocial.filter(p => p.id !== id);
    setProfilesSocial(updated);

    if (selectedProfile?.id === id) {
      setSelectedProfile(null);
      setConnectedNetworks([]);
    }
  };

  // ======================================

  if (loading) return <p className="p-10 text-lg">Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="w-full max-w-6xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Bienvenido {profile?.full_name}
          </h1>

          <div className="flex gap-4">
            <a
              href="/dashboard/publish"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow"
            >
              Publicar
            </a>

            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/login";
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">

          {/* IZQUIERDA */}
          <div>
            {/* Crear perfil */}
            <div className="bg-white p-4 rounded shadow mb-6">
              <h2 className="text-xl font-semibold mb-2">Crear nuevo perfil</h2>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Ej: MonoMijin, Negocio..."
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  className="border p-2 rounded w-full"
                />

                <button
                  onClick={createProfile}
                  className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
                >
                  Crear
                </button>
              </div>
            </div>

            {/* Lista perfiles */}
            <h2 className="text-2xl font-bold mb-3">Tus perfiles</h2>

            <div className="space-y-3">
              {profilesSocial.map(p => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProfile(p)}
                  className={`p-4 rounded shadow cursor-pointer border
                    ${selectedProfile?.id === p.id ? "bg-blue-50 border-blue-500" : "bg-white"}
                  `}
                >
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">{p.profile_name}</p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProfile(p.id);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>

                  <p className="text-sm text-gray-500">
                    Redes conectadas: {p.connected_count ?? 0}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DERECHA - REDES */}
          <div className="bg-white p-6 rounded shadow">
            {!selectedProfile ? (
              <p className="text-gray-600 text-lg">
                Selecciona un perfil para administrar sus redes.
              </p>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6">
                  Redes de: {selectedProfile.profile_name}
                </h2>

                <SocialButtons
                  profileId={selectedProfile.id}
                  networks={connectedNetworks}
                  reload={() => loadNetworks(selectedProfile.id)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
