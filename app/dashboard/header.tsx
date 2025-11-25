"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

import {
  Home,
  Share2,
  User,
  Layers,
  Settings,
  LogOut,
  Bell,
  Search,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/publish", label: "Publicar", icon: Share2 },
  { href: "/dashboard/profiles", label: "Perfiles", icon: User },
  { href: "/dashboard/networks", label: "Redes", icon: Layers },
  { href: "/dashboard/settings", label: "Configuración", icon: Settings },
];

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-center px-8 shadow-sm">
    <div className="flex items-center justify-between w-full max-w-7xl">

      {/* LEFT: LOGO + NAV */}
      <div className="flex items-center gap-10">
        
        {/* LOGO */}
        <h1 className="
          text-3xl font-extrabold tracking-tight 
          bg-gradient-to-r from-blue-600 to-purple-600 
          bg-clip-text text-transparent select-none
        ">
          Syncuenta
        </h1>

        {/* NAV LINKS */}
        <nav className="flex items-center gap-2">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
                  ${active
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* RIGHT: SEARCH + NOTIF + USER */}
      <div className="flex items-center gap-6">

        {/* SEARCH BAR */}
        <div className="hidden md:flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg w-64">
          <Search size={18} className="text-gray-500" />
          <input
            placeholder="Buscar..."
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* BELL */}
        <button className="relative hover:opacity-70">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* USER */}
        <div className="flex items-center gap-3 pr-4">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />

          <div className="text-sm leading-tight">
            <p className="font-semibold tracking-tight">{user?.email ?? "Usuario"}</p>
            <p className="text-gray-500 text-xs">Cuenta activa</p>
          </div>

          {/* LOGOUT BUTTON (icon) */}
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}
            className="ml-3 hover:bg-gray-100 p-2 rounded-lg text-red-600 transition"
          >
            <LogOut size={18} />
          </button>
        </div>

      </div>
    </div>
    </header>
  );
}
