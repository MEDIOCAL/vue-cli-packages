import 'normalize.css';
import Vue from 'vue';
import router from '@router';
import components from './components';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(components);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
