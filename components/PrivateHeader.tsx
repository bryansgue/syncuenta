"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import {
  Home,
  Share2,
  User,
  Calendar,
  Settings,
  LogOut,
  Bell
} from "lucide-react";

export default function PrivateHeader({ user }: { user: any }) {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname.startsWith(path)
      ? "bg-blue-600 text-white shadow"
      : "text-gray-600 hover:bg-gray-100";

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <header
      className="
        w-full bg-white 
        border-b border-gray-100 
        shadow-[0_1px_3px_rgba(0,0,0,0.04)]
      "
    >
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-10">

          {/* LOGO */}
          <Link href="/dashboard" className="text-2xl font-extrabold">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Syncuenta
            </span>
          </Link>

          {/* NAV */}
          <nav className="flex items-center gap-2">

            <Link href="/dashboard"
              className={`flex gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive("/dashboard")}`}
            >
              <Home size={18} /> Dashboard
            </Link>

            <Link href="/publish"
              className={`flex gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive("/publish")}`}
            >
              <Share2 size={18} /> Publicar
            </Link>

            <Link href="/schedule"
              className={`flex gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive("/schedule")}`}
            >
              <Calendar size={18} /> Programar
            </Link>

            <Link href="/affiliates"
              className={`flex gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive("/affiliates")}`}
            >
              <User size={18} /> Afiliados
            </Link>

            <Link href="/settings"
              className={`flex gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive("/settings")}`}
            >
              <Settings size={18} /> Configuración
            </Link>

          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          {/* NOTIFICACIONES */}
          <button className="text-gray-500 hover:text-gray-800 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
          </button>

          {/* AVATAR */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div
              className="
                w-9 h-9 rounded-full bg-gray-100 
                flex items-center justify-center 
                text-sm font-semibold text-gray-700 
                border border-gray-300 overflow-hidden
              "
            >
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
              ) : (
                <span>{(user?.email?.[0] || "U").toUpperCase()}</span>
              )}
            </div>
          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg"
          >
            <LogOut size={18} />
          </button>

        </div>

      </div>
    </header>
  );
}
