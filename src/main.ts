import Vue from 'vue';
import App from './docs/index.vue';
import router from './docs/router';
import {iui} from './index';
import tailwindConfig from './docs/config';

Vue.config.productionTip = false;
Vue.use(iui, tailwindConfig);

// Documentation entry of the app
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
