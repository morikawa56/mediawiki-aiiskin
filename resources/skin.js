/* JavaScript for the AiiSkin skin */
$(
    function () {
        const ElementUI = require( '../utils/element-ui/index.js' );
        const App = require( './App.vue' );
        const appEl = document.getElementById( 'app' );
        Vue.use(ElementUI);
        console.log('helloworld');
        if ( typeof fetch !== 'undefined' && typeof Object.assign !== 'undefined' ) {
            // eslint-disable-next-line no-new
            new Vue( {
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
    }
);
