<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Toggle</h2>

    <Toggle />

    <Toggle label-left="off" label-right="on" />
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Toggle from '@/lib/components/Toggle.vue';

  export default Vue.extend({
    name: 'TabsContainer',
    components: {Toggle},
    data () {
      return {
        act: 'Tab2',
      };
    },
  });
</script>
