import fs from "fs";

const files = [
  "package.json",
  "tailwind.config.js",
  "postcss.config.js",
  "app/globals.css",
  "app/layout.tsx",
  "next.config.js",
  "tsconfig.json"
];

console.log("=== ARCHIVOS CRÍTICOS ===\n");

files.forEach((file) => {
  console.log(`\n📌 FILE: ${file}`);
  if (fs.existsSync(file)) {
    console.log("----------------------------------------------");
    console.log(fs.readFileSync(file, "utf8"));
  } else {
    console.log("❌ Archivo no encontrado");
  }
});
