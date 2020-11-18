<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Modal window</h2>
    <IuiButton @click.native="open = true" is:primary>Open simple modal</IuiButton>
    <IuiButton @click.native="open1 = true" is:primary class="mt-4">
      Open high-transitioned modal
    </IuiButton>
    <IuiButton @click.native="open2 = true" is:danger class="mt-4">
      Open destroyable non-closable modal
    </IuiButton>

    <IuiModal v-model="open">
      <h2>Simple modal</h2>
    </IuiModal>

    <IuiModal
      v-model="open1"
      :transition-props="{animation: animationOptions}"
      transition="blur"
    >
      <template #default="{close}">
        <h2>High-transitioned modal</h2>
        <Button @click.native="close" is:danger>Close modal</Button>
      </template>
    </IuiModal>

    <IuiModal v-model="open2" destroyable non-closable>
      <template #default="{close}">
        <Counter :close="close" />
      </template>
    </IuiModal>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {IuiButton, IuiModal} from '@/main';
  import Counter from '../components/Counter.vue';

  export default Vue.extend({
    name: 'Radios',
    components: {IuiModal, IuiButton, Counter},
    data () {
      return {
        open: false,
        open1: false,
        open2: false,
        animationOptions: {
          delay: 300,
          duration: 1000,
          type: 'only-in',
          // Ease-out-bounce easing
          easing: (x: number) => {
            const n1 = 7.5625;
            const d1 = 2.75;

            if (x < 1 / d1) return n1 * x * x;
            if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
            if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
          },
        },
      };
    },
  });
</script>
