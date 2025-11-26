"use client";

import PrivateHeader from "@/components/PrivateHeader";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER GLOBAL */}
      <PrivateHeader user={user} />

      {/* CONTENIDO DEL DASHBOARD */}
      <main className="pt-6 px-6">{children}</main>
    </div>
  );
}
