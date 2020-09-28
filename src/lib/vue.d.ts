import Vue from 'vue';
import {NotificationAddMethod} from '@/lib/types/notification';
import {Config} from './types/config';

declare module 'vue/types/vue' {
  interface Vue {
    $iui: {
      config: Config,
      notify: NotificationAddMethod,
    },
  }
}
