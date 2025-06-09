import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import rehypeSlug from "rehype-slug";
import pluginToc from "remark-table-of-content";
import codeTitle from "remark-code-title";

const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: [".md"],
			remarkPlugins: [
				[pluginToc, { property: ["metadata", "toc"] }],
				codeTitle,
			],
			rehypePlugins: [rehypeSlug],
		}),
	],
	kit: { adapter: adapter() },
	extensions: [".svelte", ".md"],
};

export default config;
