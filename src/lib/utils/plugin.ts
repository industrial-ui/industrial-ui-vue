import {CombinedVueInstance} from 'vue/types/vue'; // eslint-disable-line
import prepareConfig from '@/lib/utils/prepare-config';
import {Config} from '../types';
import defaultConfig from '../config';

export default {
  install (Vue: CombinedVueInstance<any, any, any, any, any>, options: Partial<Config>) {
    require('../utils/transitions.css'); // eslint-disable-line
    Vue.prototype.$iui = prepareConfig(defaultConfig, options);
  },
};
