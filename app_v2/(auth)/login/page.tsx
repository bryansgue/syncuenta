"use client";

import { useState } from "react";
import { useSupabase } from "@/app_v2/providers/SupabaseProvider";

export default function LoginPage() {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    window.location.href = "/app_v2/(private)/dashboard";
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Ingresar</h1>

      <input
        className="block border p-2 mb-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="block border p-2 mb-2"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white p-2 rounded"
        onClick={login}
      >
        Entrar
      </button>
    </div>
  );
}
