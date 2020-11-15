import {iui} from '@/types/iui';

declare module 'vue/types/vue' {
  interface Vue {
    $iui: iui,
  }
}
