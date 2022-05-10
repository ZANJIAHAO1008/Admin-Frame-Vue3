import { createApp } from "vue";

export function loadAllPlugins(app: ReturnType<typeof createApp>) {
  const files = import.meta.globEager("./*.ts");
  for (const fileName in files) {
    if (typeof files[fileName].default === "function") {
      if (fileName !== "./index.ts") {
        files[fileName].default(app);
      }
    }
  }
}
