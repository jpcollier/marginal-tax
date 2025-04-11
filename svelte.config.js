import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// See https://kit.svelte.dev/docs/adapters for more information about adapters.
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: true
		})
	},
	preprocess: vitePreprocess()
};

export default config;
