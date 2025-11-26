export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow p-8 rounded-lg w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
