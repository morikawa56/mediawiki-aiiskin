/* JavaScript for the AiiSkin skin */
$( function () {
	/* scripts can go here */
	const Vue = require( 'vue' );
	const App = require( './App.vue' );
	const ElementUI = require( './element-ui.js' );
	// Only enhance to Vue if browser support is good enough
	if ( typeof fetch !== 'undefined' && typeof Object.assign !== 'undefined' ) {
		// eslint-disable-next-line no-new
		Vue.createMwApp(App)
		.use(ElementUI)
		.mount('#app');
	}
} );
