import Component from './index.vue';

type C = typeof Component;
interface ComponentConstructor extends C {
  install: (Vue: Vue) => void,
}

(Component as ComponentConstructor).install = (Vue: any) => {
  Vue.component(Component.name, Component);
};

export default Component;
