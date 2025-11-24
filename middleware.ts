import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  console.log("🔥 Middleware ejecutado:", req.nextUrl.pathname);

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("🟦 Sesión:", session ? "Existe" : "NO existe");

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      console.log("🔴 No autenticado → redirigiendo a /login");
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/login";
      return NextResponse.redirect(redirectUrl);
    }
  }

  console.log("🟢 Acceso permitido");
  return res;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};

