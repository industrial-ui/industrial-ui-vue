import Vue from 'vue';
import App from './docs/index.vue';
import router from './docs/router';
import {plugin as iuiplugin} from './index';

Vue.config.productionTip = false;
Vue.use(iuiplugin, {});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
