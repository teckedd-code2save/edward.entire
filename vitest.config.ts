import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

// Vitest configuration — mirrors the vite config (react plugin + @ alias)
// so tests resolve imports exactly like the app does.
// https://vitest.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
