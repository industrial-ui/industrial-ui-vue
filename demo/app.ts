import Vue from 'vue';
import {iui} from '@/main';
import tailwindConfig from '@/demo-config';
import App from './app.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(iui, tailwindConfig);

// Documentation entry of the app
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
