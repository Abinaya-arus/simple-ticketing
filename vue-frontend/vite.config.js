import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import frappeui from "frappe-ui/vite";

export default defineConfig({
	plugins: [
		vue(),

		frappeui({
			backend: "http://simple.localhost:8000",
		}),
	],

	server: {
		proxy: {
			"/api": {
				target: "http://simple.localhost:8000",

				changeOrigin: true,

				secure: false,
			},
		},
	},

	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},

	optimizeDeps: {
		include: ["frappe-ui > feather-icons", "showdown", "engine.io-client", "debug"],
	},
});
