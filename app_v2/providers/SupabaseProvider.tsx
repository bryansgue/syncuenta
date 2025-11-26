
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

const SupabaseContext = createContext<any>(null);

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  return useContext(SupabaseContext);
}
