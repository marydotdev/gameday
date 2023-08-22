/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'dot-grid': 'url(https://www.transparenttextures.com/patterns/inflicted.png)',
				'cork': 'url(https://www.toptal.com/designers/subtlepatterns/uploads/pool_table.png)'
			},
			colors: {
				svelte: '#FF3E00',
				tw: '#06B6D4'
			},
			fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        bric: ['Bricolage Grotesque', 'sans-serif'],
        press: ['Press Start 2P', 'cursive'],
        handjet: ['Handjet', 'sans-serif']
			}
		}
	},
  darkMode: 'class',
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	]
};
