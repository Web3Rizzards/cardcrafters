import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from 'vite-plugin-node-polyfills'

import * as dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // To exclude specific polyfills, add them to this list.
      // exclude: [
      //   'fs', // Excludes the polyfill for `fs` and `node:fs`.
      // ],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    })
  ],
  server: {
    port: 3000,
    fs: {
      strict: false,
    },
  },
  build: {
    target: "es2022",
  },
  define: {
    'process.env': {
      client_email: process.env.client_email,
      private_key: process.env.private_key,
      projectId: process.env.projectId,
      dreamstudio_api_key: process.env.dreamstudio_api_key,
      nftstorage_api_key: process.env.nftstorage_api_key,
    }
  }
});
