"use server";

import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// =========================
// Crear cliente SSR válido
// =========================
function createSSRClient() {
  return createRouteHandlerClient(
    {
      cookies,
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    }
  );
}

// =========================
// Obtener usuario vía SSR
// =========================
export async function getUserServer() {
  try {
    const supabase = createSSRClient();

    const { data, error } = await supabase.auth.getUser();
    if (error) return null;

    return data.user ?? null;
  } catch (err) {
    console.error("❌ Error getUserServer:", err);
    return null;
  }
}

// =========================
// Obtener sesión SSR
// =========================
export async function getSessionServer() {
  try {
    const supabase = createSSRClient();

    const { data, error } = await supabase.auth.getSession();
    if (error) return null;

    return data.session ?? null;
  } catch (err) {
    console.error("❌ Error getSessionServer:", err);
    return null;
  }
}

// =========================
// Cliente (CSR)
// =========================
export async function getUserClient(supabase: any) {
  const { data } = await supabase.auth.getUser();
  return data?.user ?? null;
}
