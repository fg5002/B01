/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			zIndex: {
        '100': '100',
        '1000': '1000',
        '2000': '2000',
        '3000': '3000',
        '5000': '5000',
        '10000': '10000',
        '20000': '20000',
      },
      scale: {
        '200': '2.00',
        '250': '2.50',
        '300': '3.00',
      }
		}
	},

	plugins: []
};
