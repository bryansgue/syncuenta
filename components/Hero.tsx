"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function Hero() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
      setLoading(false);
    };
    loadUser();
  }, []);

  return (
    <section className="w-full pt-32 pb-32 px-6 text-center bg-[#f8fafc] relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* ============================ */}
        {/*       HERO TEXT              */}
        {/* ============================ */}

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Administra todas tus redes
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            desde una misma plataforma
          </span>
        </h1>

        <p className="text-gray-600 mt-6 text-lg md:text-xl max-w-2xl mx-auto">
          Crea múltiples perfiles, conecta tus redes sociales, publica en varias
          plataformas a la vez y automatiza tu presencia digital como un profesional.
        </p>

        {/* ============================ */}
        {/*       BOTONES SUAVES        */}
        {/* ============================ */}

        <div className="flex justify-center gap-5 mt-12 flex-wrap">

          {/* BOTÓN PRINCIPAL */}
          <AnimatePresence mode="wait">
            {!loading && (
              <motion.div
                key="main-button"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <Link
                  href={user ? "/dashboard" : "/register"}
                  className="
                    min-w-[190px]
                    block text-center
                    px-8 py-4 rounded-xl 
                    bg-blue-600 text-white 
                    font-semibold shadow-lg 
                    hover:bg-blue-700 
                    transition transform hover:scale-[1.02]
                  "
                >
                  {user ? "Ir al Dashboard" : "Crear cuenta gratis"}
                </Link>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="placeholder-main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                className="min-w-[190px] h-14"
              />
            )}
          </AnimatePresence>

          {/* BOTÓN SECUNDARIO */}
          <AnimatePresence mode="wait">
            {!loading && (
              <motion.div
                key="secondary-button"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
              >
                <Link
                  href={user ? "/pricing" : "/login"}
                  className="
                    min-w-[190px]
                    block text-center
                    px-8 py-4 rounded-xl 
                    bg-white border border-gray-300 
                    text-gray-800 font-semibold 
                    shadow hover:bg-gray-100 transition
                  "
                >
                  {user ? "Mejorar plan" : "Iniciar sesión"}
                </Link>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="placeholder-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                className="min-w-[190px] h-14"
              />
            )}
          </AnimatePresence>

        </div>

        {/* ============================ */}
        {/*   ICONOS PLATAFORMAS        */}
        {/* ============================ */}

        <div className="mt-16">
          <p className="text-gray-500 text-sm tracking-wide mb-5">
            Plataformas soportadas
          </p>

          <div className="flex justify-center gap-10 flex-wrap opacity-100">
            {[
              "tiktok",
              "instagram",
              "youtube",
              "linkedin",
              "threads",
              "facebook",
              "x",
              "pinterest",
              "reddit",
              "bluesky",
            ].map((icon) => (
              <img
                key={icon}
                src={`/${icon}.svg`}
                className="w-10 h-10 opacity-100 hover:opacity-80 transition"
              />
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
}
