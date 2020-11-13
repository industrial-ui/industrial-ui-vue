import _Vue, { PluginFunction } from 'vue';

import prepareConfig from '@/utils/prepare-config';
import defaultConfig from '@/config';
import type {Config} from '@/types/config';

import * as components from '@/exports';

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

const install: InstallFunction = (Vue: typeof _Vue, options: Partial<Config>) => {
  if (install.installed) return;

  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });

  Vue.prototype.$iui = prepareConfig(defaultConfig, options);
};

const plugin = {
  install,
};

// To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
if ('false' === process.env.ES_BUILD) {
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

export default plugin;
export * from '@/exports';
