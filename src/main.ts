import _Vue, { PluginFunction } from 'vue';
import type {Config} from './types/config';

import defaultConfig from './config';
import Notification from './components/Notification';

import * as components from './exports';
import prepareConfig from './utils/prepare-config';

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean,
}

const install: InstallFunction = (Vue: typeof _Vue, options: Partial<Config>) => {
  if (install.installed) return;

  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });

  Vue.prototype.$iui = {
    // @ts-ignore
    config: prepareConfig(defaultConfig, typeof IuiConfig !== 'undefined' ? IuiConfig : options),
    notify: Notification,
  };
};

const plugin = {
  install,
};

// To auto-install on non-es builds, when vue is found
if (process.env.ES_BUILD === 'false') {
  let GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
    // @ts-ignore
  } else if (typeof global !== 'undefined') {
    // @ts-ignore
    GlobalVue = (global as any).Vue;
  }
  if (GlobalVue) {
    (GlobalVue as typeof _Vue).use(plugin);
  }
}

export const iui = (Vue: typeof _Vue, options: Partial<Config>): void => {
  Vue.prototype.$iui = {
    config: prepareConfig(defaultConfig, options),
    notify: Notification,
  };
};

export default plugin;
export * from './exports';
