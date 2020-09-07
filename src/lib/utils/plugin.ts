import {CombinedVueInstance} from 'vue/types/vue'; // eslint-disable-line
import prepareConfig from '@/lib/utils/prepare-config';
import {Config} from '../types/config';
import defaultConfig from '../config';

/**
 * IUI plugin to apply configuration on all components
 */
export default {
  install (Vue: CombinedVueInstance<any, any, any, any, any>, options: Partial<Config>) {
    Vue.prototype.$iui = prepareConfig(defaultConfig, options);
  },
};
