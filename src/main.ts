import Vue from 'vue';
import App from './docs/index.vue';
import router from './docs/router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
