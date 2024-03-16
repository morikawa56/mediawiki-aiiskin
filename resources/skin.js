/* JavaScript for the AiiSkin skin */
import ElementUI from '../utils/element-ui/index.js';
import 'element-ui/lib/theme-chalk/index.css';
$(
    function () {
        const App = require( './App.vue' );
        const appEl = document.getElementById( 'app' );
        Vue.use(ElementUI);
        console.log(111);
        new Vue({
            el: appEl,
            render: h => h(App)
        });
    }
);
