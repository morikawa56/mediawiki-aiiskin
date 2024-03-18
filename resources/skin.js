/* JavaScript for the AiiSkin skin */
$( function () {
	/* scripts can go here */
	const Vue = require( 'vue' );
	const App = require( './App.vue' );
	const buefy = require( './utils/buefy/buefy.min.js' );
	const appEl = document.getElementById( 'app' );
	// Only enhance to Vue if browser support is good enough
	if ( typeof fetch !== 'undefined' && typeof Object.assign !== 'undefined' ) {
		// eslint-disable-next-line no-new
		Vue.createMwApp(App, {initialData: JSON.parse( appEl.dataset.json )})
		.use(buefy)
		.mount('#app');
	}
} );
