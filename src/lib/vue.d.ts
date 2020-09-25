import Vue from 'vue';
import {Config} from './types/config';

declare module 'vue/types/vue' {
  interface Vue {
    $iui: {
      config: Config,
      notify: () => void,
    },
  }
}
