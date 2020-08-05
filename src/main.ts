import Vue from 'vue';
import App from './docs/index.vue';
import router from './docs/router';
import {plugin as iuiplugin} from './index';
import tailwindConfig from './docs/config';

Vue.config.productionTip = false;
Vue.use(iuiplugin, tailwindConfig);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
