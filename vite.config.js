import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
    // A proxy in React refers to a configuration that allows frontend requests to be rerouted to a backend
    // server without the client having to deal with CORS or other cross-origin issues.
    proxy: {
      "/api": {
        target: `http://localhost:7000/`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
