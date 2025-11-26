import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/app_v2/lib/supabase/server";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();

  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    redirect("/app_v2/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}
