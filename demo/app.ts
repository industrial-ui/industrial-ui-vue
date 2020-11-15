import Vue from 'vue';
import App from './app.vue';
import router from './router';
import {iui} from '@/main';
import tailwindConfig from '@/demo-config';

Vue.config.productionTip = false;
Vue.use(iui, tailwindConfig);

// Documentation entry of the app
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
