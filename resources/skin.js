/* JavaScript for the AiiSkin skin */
$( function () {
	/* scripts can go here */
	const Vue = require( 'vue' );
	const App = require( './App.vue' );
	const appEl = document.getElementById( 'app' );
	console.log( 'appEl:', appEl );
	// Only enhance to Vue if browser support is good enough
	if ( typeof fetch !== 'undefined' && typeof Object.assign !== 'undefined' ) {
		// eslint-disable-next-line no-new
		new Vue( {
			el: appEl,
			render: h => h(App)
		} );
	}
} );
