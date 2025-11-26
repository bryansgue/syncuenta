import fs from "fs";

// =======================================================
// ARCHIVOS CRÍTICOS DEL NUEVO SISTEMA (APP_V2)
// =======================================================
// 👉 Esta lista ahora incluye TODOS los archivos esenciales
const files = [
  // ROOT LAYOUT
  "app_v2/layout.tsx",

  // DATA / SSR
  "app_v2/data/user.ts",
  "app_v2/lib/supabase/server.ts",

  // PROVIDERS
  "app_v2/providers/UserProvider.tsx",
  "app_v2/providers/SupabaseProvider.tsx",
  "app_v2/providers/ReactQueryProvider.tsx",
  "app_v2/providers/ThemeProvider.tsx", // si existe

  // AUTH
  "app_v2/(auth)/layout.tsx",
  "app_v2/(auth)/login/page.tsx",
  "app_v2/(auth)/register/page.tsx",       // si lo tienes
  "app_v2/(auth)/forgot-password/page.tsx", // si lo tienes

  // PUBLIC (Landing Page nueva)
  "app_v2/(public)/layout.tsx",
  "app_v2/(public)/page.tsx",

  // PRIVATE PROTECTED AREA
  "app_v2/(private)/layout.tsx",

  "app_v2/(private)/dashboard/page.tsx",

  // REDES (si ya están creadas)
  "app_v2/(private)/networks/page.tsx",
  "app_v2/(private)/networks/components/NetworkButton.tsx",
  "app_v2/(private)/networks/components/NetworksGrid.tsx",
  "app_v2/(private)/networks/components/NetworkStatusBadge.tsx",

  // PERFILES
  "app_v2/(private)/profiles/page.tsx",
  "app_v2/(private)/profiles/components/ProfileList.tsx",
  "app_v2/(private)/profiles/components/CreateProfileModal.tsx",
  "app_v2/(private)/profiles/components/EditProfileModal.tsx",

  // SETTINGS
  "app_v2/(private)/settings/page.tsx",
  "app_v2/(private)/settings/components/DangerZone.tsx",
  "app_v2/(private)/settings/components/PreferencesForm.tsx",
  "app_v2/(private)/settings/components/AccountSecurityForm.tsx",
  "app_v2/(private)/settings/components/ProfileSettingsForm.tsx",
  "app_v2/(private)/settings/components/SettingsSidebar.tsx",

  // AI (si existen)
  "app_v2/(private)/ai/assistants/page.tsx",
  "app_v2/(private)/ai/assistants/components/AssistantCard.tsx",
  "app_v2/(private)/ai/assistants/components/ChatThread.tsx",
  "app_v2/(private)/ai/assistants/components/PromptInput.tsx",

  "app_v2/(private)/ai/automations/page.tsx",
  "app_v2/(private)/ai/automations/components/TriggerForm.tsx",
  "app_v2/(private)/ai/automations/components/ActionForm.tsx",
  "app_v2/(private)/ai/automations/components/WorkflowCard.tsx",

  // UTILIDADES
  "app_v2/utils/auth-helpers.ts",
  "app_v2/utils/cookies.ts",
  "app_v2/utils/format.ts",
  "app_v2/utils/types.ts",
  "app_v2/utils/validators.ts",

  // API ROUTES
  "app_v2/api/auth/route.ts",
  "app_v2/api/networks/toggle/route.ts",
  "app_v2/api/profiles/create/route.ts",
  "app_v2/api/profiles/update/route.ts",
  "app_v2/api/profiles/delete/route.ts",

  "app_v2/api/ai/completion/route.ts",
  "app_v2/api/ai/generate-image/route.ts",
  "app_v2/api/ai/sentiment/route.ts",

  // ROOT INDEX (redirige a login o dashboard)
  "app_v2/page.tsx",
];

// =======================================================
// LOG VISUAL
// =======================================================
console.log("\n=====================================");
console.log("🔍   ARCHIVOS CRÍTICOS DEL PROYECTO");
console.log("=====================================\n");

// =======================================================
// LECTOR DE ARCHIVOS
// =======================================================
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

console.log("\n\n=== FIN DE LECTURA ===\n");



// node debugFile2.js > debug.txt