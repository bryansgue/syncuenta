"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

import ProfileSidebar from "./components/ProfileSidebar/ProfileSidebar";
import NetworksPanel from "./components/NetworksPanel/NetworksPanel";

import { useProfiles } from "@/hooks/useProfiles";
import { useNetworks } from "@/hooks/useNetworks";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ===== HOOKS =====
  const {
    profiles,
    selected,
    setSelected,
    loading: loadingProfiles,
    addProfile,
    removeProfile,
    reload: reloadProfiles,
  } = useProfiles(user?.id || null);

  const {
    networks,
    toggle,
    reload: reloadNetworks,
  } = useNetworks(selected?.id ?? null);

  // ===== LOAD USER SESSION =====
  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        window.location.href = "/login";
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    load();
  }, []);

  // ===== LOAD NETWORKS WHEN PROFILE CHANGES =====
  useEffect(() => {
    if (selected?.id) {
      reloadNetworks();
    }
  }, [selected]);

  if (loading || loadingProfiles) {
    return <p className="p-10 text-lg">Cargando...</p>;
  }

  // ===== COUNT CONNECTED NETWORKS =====
  const connectedNetworks = networks.filter((n) => n.is_connected).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10 flex justify-center">
      
      <div className="
        w-full max-w-6xl 
        bg-white/60 backdrop-blur-xl 
        rounded-2xl shadow-2xl 
        p-10 border border-gray-200
      ">

        {/* ================= HEADER SALUDO + CHECKLIST ================= */}
        <div className="flex items-center justify-between mb-10">

          {/* SALUDO */}
          <h1 className="text-3xl font-bold text-gray-800">
            Bienvenido {user?.email}
          </h1>

          {/* CHECKLIST + IR A PUBLICAR */}
          <div className="flex items-center gap-6">

            {/* CHECKLIST */}
            <div className="flex items-center gap-5 bg-blue-50 border border-blue-200 px-5 py-3 rounded-xl shadow-sm">

              <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                <span className="text-green-600">✔</span> Crear perfil
              </div>

              <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                <span className="text-green-600">✔</span> Conectar redes
              </div>

              <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                <span className="text-green-600">✔</span> Listo
              </div>
            </div>

            {/* BOTÓN IR A PUBLICAR */}
            <a
              href="/dashboard/publish"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition shadow font-medium"
            >
              Ir a publicar
            </a>

          </div>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">


          {/* === LEFT PANEL (Profiles) === */}
          <div className="
            bg-white/80 backdrop-blur 
            p-8 rounded-xl shadow-lg 
            border border-gray-200
          ">
            <ProfileSidebar
              profiles={profiles}
              selected={selected}
              onSelect={(p) => setSelected(p)}
              onCreate={async (name) => {
                await addProfile(name);
                await reloadProfiles();
              }}
              onDelete={async (id) => {
                await removeProfile(id);
                await reloadProfiles();
              }}
            />
          </div>

          {/* === RIGHT PANEL (Networks) === */}
          <div className="
            bg-white/80 backdrop-blur 
            rounded-xl shadow-lg border border-gray-200
            p-10
            w-full
          ">
            <NetworksPanel
              profile={selected}
              networks={networks}
              onToggle={toggle}
            />
          </div>

        </div>
      </div>

    </div>
  );
}
