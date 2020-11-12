import Vue from 'vue';
import {iui} from '@/lib/types/iui';

declare module 'vue/types/vue' {
  interface Vue {
    $iui: iui,
  }
}
