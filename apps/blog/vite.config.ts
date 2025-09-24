import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig, type PluginOption } from "vite";
import { vercelPreset } from "@vercel/remix/vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig(() => {
  const isVitest = process.env.VITEST;
  const plugins: PluginOption[] = [
    // Disable Remix plugin in Vitest to avoid preamble errors
    !isVitest && remix({ presets: [vercelPreset()] }),
    tsconfigPaths(),
  ].filter(Boolean) as PluginOption[];

  return {
    server: { port: 5173 },
    plugins,
    test: {
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts"],
      globals: true,
      css: true,
    },
  };
});
