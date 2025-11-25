import "./globals.css";

export const metadata = {
  title: "Syncuenta",
  description: "Publica tu contenido en todas tus redes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
