import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from './views/index.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
