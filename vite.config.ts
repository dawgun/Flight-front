/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./jest-setup.ts",
    mockReset: true,
    include: ["src/**/*.test.tsx", "src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: [
        "src/**/*.tsx",
        "src/**/*.ts",
        "!src/main.tsx",
        "!src/store/useFlightsStore/types/flightTypes.ts",
      ],
      reporter: ["text", "lcov"],
      all: true,
    },
  },
});
