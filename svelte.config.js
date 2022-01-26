import adapter from '@sveltejs/adapter-static';

const config = {
	kit: {
		adapter: adapter(),
		target: '#svelte',
		paths: {
			base: "/svelte-keyboard"
		},
	}
};

export default config;
