export const metadata = {
  title: 'Syncuenta',
  description: 'Sistema básico con Next.js + Supabase',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
