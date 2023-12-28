import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				'roboto': ['Roboto', 'sans-serif'],
				'ubuntu': ['Ubuntu', 'sans-serif']
			},
			colors: {
				'green': {
					'primary': '#34CB79',
					'secondary': '#2FB86E',
					'tertiary': '#E1FAEC',
				},
				'stormyNight': '#322153',
				'riverGod': '#6C6C60',
				'background': '#F0F0F5',
				'shadow': '#0E0A14'
			},
			screens: {

				// Celulares - Smartwatch's
				'3xs': { min: '162px', max: '320px' },
				'2xs': { min: '321px', max: '393px' },
				'xs': { min: '394px', max: '575px' },

				// Tablets na Vertical
				'sm': { min: '576px', max: '897px' },
				// Tablets na Horizontal
				'md': { min: '898px', max: '1199px' },

				// Notebooks - PCs - Smart TVs
				'lg': { min: '1200px', max: '1258px' },
				'xl': { min: '1259px', max: '1358px' },
				'2xl': { min: '1359px', max: '1535px' },
				'3xl': { min: '1536px' }
			},
		},
	},
	plugins: [],
};

export default config;