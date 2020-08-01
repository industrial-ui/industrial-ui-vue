import {CombinedVueInstance} from 'vue/types/vue'; // eslint-disable-line
import prepareConfig from '@/lib/utils/prepare-config';
import {Config} from '../types';
import defaultConfig from '../config';

const plugin = {
  install (Vue: CombinedVueInstance<any, any, any, any, any>, options: Partial<Config>) {
    Vue.prototype.$iui = prepareConfig(defaultConfig, options);
  },
};
export default plugin;
