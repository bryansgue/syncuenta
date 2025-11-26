import { getUserServer } from "@/app_v2/data/user";
import Link from "next/link";

export default async function PrivateHome() {
  const user = await getUserServer();

  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h1>No estás autenticado ❌</h1>
        <p>
          <Link href="/app_v2/login">Iniciar sesión</Link>
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard funcionando ✔️</h1>
      <p>Bienvenido: {user.email}</p>
      <p>Tu autenticación SSR está funcionando perfecto 🎉</p>
    </div>
  );
}
