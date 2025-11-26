import fs from "fs";

// =========================
// LISTA DE ARCHIVOS A MOSTRAR
// =========================
const files = [
  // =========================
  // ROOT
  // =========================
  "next.config.ts",
  "tailwind.config.js",
  "tsconfig.json",
  "package.json",
  "postcss.config.js",
  "eslint.config.mjs",

  // =========================
  // APP ROOT
  // =========================
  "app/page.tsx",
  "app/layout.tsx",
  "app/globals.css",

  // =========================
  // AUTH
  // =========================
  "app/auth/callback/route.ts",

  // =========================
  // LOGIN / REGISTER
  // =========================
  "app/login/page.tsx",
  "app/register/page.tsx",

  // =========================
  // DASHBOARD PÁGINA PRINCIPAL
  // =========================
  "app/dashboard/page.tsx",
  "app/dashboard/header.tsx",
  "app/dashboard/layout.tsx",
  "app/dashboard/sidebar.tsx",

  // =========================
  // DASHBOARD COMPONENTES
  // =========================
  "app/dashboard/components/SocialButtons.tsx",

  // NETWORKS
  "app/dashboard/components/NetworksPanel/NetworksPanel.tsx",
  "app/dashboard/components/NetworksPanel/NetworkButton.tsx",

  // PROFILE SIDEBAR
  "app/dashboard/components/ProfileSidebar/ProfileSidebar.tsx",
  "app/dashboard/components/ProfileSidebar/ProfileCard.tsx",

  // =========================
  // SETTINGS
  // =========================
  "app/settings/page.tsx",
  "app/settings/components/Section.tsx",
  "app/settings/components/ProfileSettings.tsx",
  "app/settings/components/SecuritySettings.tsx",
  "app/settings/components/PreferencesSettings.tsx",
  "app/settings/components/PlanSettings.tsx",
  "app/settings/components/DangerZone.tsx",

  // =========================
  // COMPONENTS (RAÍZ)
// =========================
  "components/Hero.tsx",
  "components/HowItWorks.tsx",
  "components/PricingSection.tsx",
  "components/PrivateHeader.tsx",
  "components/PrivateLayout.tsx",
  "components/PublicHeader.tsx",
  "components/Spinner.tsx",

  // UI
  "components/ui/Button.tsx",
  "components/ui/Card.tsx",
  "components/ui/Input.tsx",

  // =========================
  // HOOKS
  // =========================
  "hooks/useNetworks.ts",
  "hooks/useProfiles.ts",

  // =========================
  // SUPABASE
  // =========================
  "lib/supabase/client.ts",
  "lib/supabase/networks.ts",
  "lib/supabase/profiles.ts",

  // =========================
  // TYPES
  // =========================
  "types/NetworkAccount.ts",
  "types/NetworkKey.ts",
  "types/Profile.ts",
];

// ========= VISUAL BEAUTY ===========
console.log("\n=====================================");
console.log("🔍   ARCHIVOS CRÍTICOS DEL PROYECTO");
console.log("=====================================\n");

// ========= LECTOR DE ARCHIVOS ===========
files.forEach((filePath) => {
  console.log(`\n📌 FILE: ${filePath}`);

  if (fs.existsSync(filePath)) {
    console.log("----------------------------------------------");
    try {
      const content = fs.readFileSync(filePath, "utf8");
      console.log(content);
    } catch (error) {
      console.log("⚠️ Error leyendo el archivo:", error.message);
    }
  } else {
    console.log("❌ Archivo no encontrado");
  }
});

console.log("\n\n=== FIN ===\n");
