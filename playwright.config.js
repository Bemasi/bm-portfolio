import { defineConfig, devices } from "@playwright/test";

const BASE = "http://localhost:3000";

/** Prueba de humo sobre el sitio construido, no sobre `next dev`: lo que se
 *  despliega es HTML estático y es eso lo que hay que comprobar. */
export default defineConfig({
  testDir: "e2e",
  use: { baseURL: BASE, trace: "on-first-retry" },
  // Chromium trae View Transitions entre documentos; Firefox no. Correr las dos
  // es la comprobación de D14: donde no hay transición, la navegación sigue
  // siendo correcta. Si un día Firefox las implementa, esto no deja de valer.
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: BASE,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
});
