import { createRequestHandler } from "@remix-run/netlify";

// Remix builds vào build/index.js
export const handler = createRequestHandler({
  build: require("./build")
});
