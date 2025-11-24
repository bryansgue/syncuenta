'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    window.location.href = '/dashboard';
  };

  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/dashboard',
      }
    });

    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">

      <h1 className="text-2xl font-semibold mb-6">Iniciar sesión</h1>

      {error && (
        <p className="text-red-600 mb-3">{error}</p>
      )}

      {/* Login tradicional */}
      <form onSubmit={handleLogin} className="flex flex-col w-full max-w-xs">
        <input
          type="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded mb-3"
          required
        />

        <input
          type="password"
          placeholder="Tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 mb-3"
        >
          Entrar
        </button>
      </form>

      {/* Divider */}
      <div className="my-4 text-gray-500">o</div>

      {/* Login con Google */}
      <button
        onClick={loginWithGoogle}
        className="bg-red-500 text-white rounded p-2 px-4"
      >
        Iniciar sesión con Google
      </button>

    </div>
  );
}
