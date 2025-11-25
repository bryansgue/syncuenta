import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  console.log("🔵 Callback recibido. code =", code);

  // Si no hay código → no hay forma de intercambiar sesión
  if (!code) {
    console.log("❌ No se recibió código OAuth");
    return NextResponse.redirect("http://localhost:3000/login");
  }

  const supabase = createRouteHandlerClient({ cookies });

  // Intercambiar el código por una sesión
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  console.log("🟣 Intercambio de código:", { data, error });

  if (error) {
    console.error("❌ Error al intercambiar código:", error.message);
    return NextResponse.redirect("http://localhost:3000/login");
  }

  console.log("🟢 Sesión creada correctamente. Redirigiendo a dashboard…");

  return NextResponse.redirect("http://localhost:3000/dashboard");
}
