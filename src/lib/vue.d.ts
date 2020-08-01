import Vue from 'vue';
import {Config} from './types';

declare module 'vue/types/vue' {
  interface Vue {
    $iui: Config,
  }
}
