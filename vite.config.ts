import tailwindcss from "@tailwindcss/vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import svg from "@poppanator/sveltekit-svg";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		svg(),
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/lib/paraglide",
		}),
	],
});
