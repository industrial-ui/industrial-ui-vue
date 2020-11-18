<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Toggle</h2>

    <IuiToggle v-model="val" />

    <IuiToggle label-left="off" label-right="on" />

    <IuiToggle label-left="disabled toggle" label-right="on" disabled />
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import IuiToggle from '@/components/Toggle';

  export default Vue.extend({
    name: 'TabsContainer',
    components: {IuiToggle},
    data () {
      return {
        val: true,
      };
    },
  });
</script>
