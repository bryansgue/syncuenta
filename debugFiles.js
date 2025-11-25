import fs from "fs";

// =========================
// LISTA DE ARCHIVOS A MOSTRAR
// =========================
const files = [
  // PÁGINA DEL DASHBOARD
  "app/dashboard/page.tsx",

  // COMPONENTES
  "app/dashboard/components/NetworksPanel/NetworksPanel.tsx",
  "app/dashboard/components/NetworksPanel/NetworkButton.tsx",
  "app/dashboard/components/SocialButtons.tsx",

  // HOOKS
  "hooks/useNetworks.ts",

  // BACKEND SUPABASE
  "lib/supabase/networks.ts",

  // TIPOS
  "types/NetworkAccount.ts",
  "types/NetworkKey.ts",

  "hooks/useProfiles.ts",
  "app/dashboard/components/ProfileSidebar/ProfileSidebar.tsx",
  "app/dashboard/components/ProfileSidebar/ProfileCard.tsx"
];


// ========= VISUAL BEAUTY ===========
console.log("\n=====================================");
console.log("🔍   ARCHIVOS CRÍTICOS DEL PROYECTO");
console.log("=====================================\n");

// ========= LECTOR DE ARCHIVOS ===========
files.forEach((file) => {
  console.log(`\n📌 FILE: ${file}`);

  if (fs.existsSync(file)) {
    console.log("----------------------------------------------");
    try {
      const content = fs.readFileSync(file, "utf8");
      console.log(content);
    } catch (err) {
      console.log("⚠️ Error leyendo el archivo:", err.message);
    }
  } else {
    console.log("❌ Archivo no encontrado");
  }
});

console.log("\n\n=== FIN ===\n");
