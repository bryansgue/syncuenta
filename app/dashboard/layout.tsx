"use client";

import Header from "./header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER GLOBAL */}
      <Header />

      {/* CONTENIDO DEL DASHBOARD */}
      <main className="pt-6 px-6">
        {children}
      </main>
    </div>
  );
}
