<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Transition</h2>
    <Toggle v-model="shown" />
    <Transition name="fade" appear mode="out-in">
      <Button v-if="shown" key="on" is:primary>Hello</Button>
      <Button v-else key="off" is:danger>Good bye</Button>
    </Transition>

    <br>
    <br class="mt-4">
    <Toggle v-model="shown1" />
    <Transition name="slide" appear :animation="{easing: 'easeInOutBack', duration: 500}">
      <Button v-if="shown1" key="on" is:primary>Slide with easeInOutBack easing</Button>
    </Transition>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Button from '@/lib/components/Button.vue';
  import Transition from '@/lib/components/Transition.vue';
  import Toggle from '@/lib/components/Toggle.vue';

  export default Vue.extend({
    name: 'Radios',
    components: {
      Button,
      Transition,
      Toggle,
    },
    data () {
      return {
        shown: true,
        shown1: true,
      };
    },
  });
</script>
