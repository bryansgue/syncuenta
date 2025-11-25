export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      
      <div className="bg-red-500 text-white p-6 rounded-xl">
  Tailwind está funcionando 🔥
</div>

<div className="bg-red-500 text-white p-10">PROBANDO TAILWIND</div>

      
      <h1 className="text-4xl font-bold mb-4">Syncuenta</h1>

      <p className="text-gray-700 text-lg mb-8 text-center max-w-xl">
        La forma más simple de publicar fotos y videos en todas tus redes sociales,
        desde un solo lugar.
      </p>

      <div className="flex gap-4"> 
        <a
          href="/login"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          Iniciar sesión
        </a>

        <a
          href="/register"
          className="px-6 py-2 bg-gray-200 text-gray-900 font-medium rounded hover:bg-gray-300 transition"
        >
          Crear cuenta
        </a>
      </div>

    </div>



  );



  
}
