import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    console.error("❌ No se recibió el código OAuth");
    return NextResponse.redirect("http://localhost:3000/login");
  }

  const supabase = createRouteHandlerClient({ cookies });

  // ⭐ ESTE ES EL MÉTODO CORRECTO
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("❌ Error intercambiando código:", error);
    return NextResponse.redirect("http://localhost:3000/login");
  }

  return NextResponse.redirect("http://localhost:3000/dashboard");
}
