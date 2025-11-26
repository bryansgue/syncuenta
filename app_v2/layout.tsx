import "../globals.css"; // subimos un nivel
import { ReactNode } from "react";
import { SupabaseProvider } from "./providers/SupabaseProvider";
import { UserProvider } from "./providers/UserProvider";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

export const metadata = {
  title: "Syncuenta",
  description: "Automatiza tus perfiles, redes y flujos con IA.",
};

export default function AppV2RootLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SupabaseProvider>
        <ReactQueryProvider>
          <UserProvider>{children}</UserProvider>
        </ReactQueryProvider>
      </SupabaseProvider>
    </ThemeProvider>
  );
}
