import {VueConstructor} from 'vue';
import {Config} from '@/lib/types/config';
import prepareConfig from '@/lib/utils/prepare-config';
import defaultConfig from '@/lib/config';

/**
 * IUI plugin to apply configuration on all components
 */
const iui = (Vue: VueConstructor, options: Partial<Config>) => {
  Vue.prototype.$iui = {
    config: prepareConfig(defaultConfig, options),
  };
};

export default iui;
