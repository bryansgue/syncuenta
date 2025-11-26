"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

import ProfileSettings from "./components/ProfileSettings";
import SecuritySettings from "./components/SecuritySettings";
import PreferencesSettings from "./components/PreferencesSettings";
import PlanSettings from "./components/PlanSettings";
import DangerZone from "./components/DangerZone";
import PrivateLayout from "@/components/PrivateLayout"; // Asegura el import correcto

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

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

  if (loading) return <p className="p-10">Cargando...</p>;

  const menu = [
    { id: "profile", label: "Perfil" },
    { id: "security", label: "Seguridad" },
    { id: "preferences", label: "Preferencias" },
    { id: "plan", label: "Plan y facturación" },
    { id: "danger", label: "Zona de peligro" },
  ];

  return (
    <PrivateLayout>
      {/* 1️⃣ CONTENEDOR CENTRAL */}
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10 flex justify-center">
        <div
          className="
            w-full max-w-6xl 
            bg-white/60 backdrop-blur-xl 
            rounded-2xl shadow-2xl 
            p-10 border border-gray-200
          "
        >
          {/* ===== HEADER INTERNO ===== */}
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-3xl font-bold text-gray-800">
              Configuración de {user?.email}
            </h1>

            <a
              href="/dashboard"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow font-medium"
            >
              ← Volver al panel
            </a>
          </div>

          {/* ===== GRID PRINCIPAL ===== */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* SIDEBAR */}
            <div
              className="
                bg-white/80 backdrop-blur 
                border border-gray-200
                rounded-xl p-6 shadow-lg h-fit
              "
            >
              <h3 className="text-lg font-semibold mb-4">Menú</h3>

              <div className="flex flex-col gap-2">
                {menu.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`
                      text-left px-4 py-2 rounded-lg font-medium transition
                      ${
                        activeTab === item.id
                          ? "bg-blue-600 text-white shadow"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CONTENIDO */}
            <div
              className="
                md:col-span-3 
                bg-white/80 backdrop-blur 
                rounded-xl shadow-lg border border-gray-200
                p-10 w-full
              "
            >
              {activeTab === "profile" && <ProfileSettings />}
              {activeTab === "security" && <SecuritySettings />}
              {activeTab === "preferences" && <PreferencesSettings />}
              {activeTab === "plan" && <PlanSettings />}
              {activeTab === "danger" && <DangerZone />}
            </div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
