import Vue from 'vue';
import {Config} from './index';

declare module 'vue/types/vue' {
  interface Vue {
    $iuiconfig: Config,
  }
}
