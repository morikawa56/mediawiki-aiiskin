/* JavaScript for the AiiSkin skin */
$( function () {
	/* scripts can go here */
	const Vue = require( 'vue' );
	const App = require( './App.vue' );
	const appEl = document.getElementById( 'app' );
    console.log( 111 );
	// Only enhance to Vue if browser support is good enough
	if ( typeof fetch !== 'undefined' && typeof Object.assign !== 'undefined' ) {
		// eslint-disable-next-line no-new
		Vue.createMwApp({
			el: appEl,
			render: function ( createElement ) {
				return createElement( App, {
					props: {
						initialData: JSON.parse( appEl.dataset.json )
					}
				} );
			}
		} );
	}
} );
