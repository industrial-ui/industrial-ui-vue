<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Toggle</h2>

    <Toggle v-model="val" />

    <Toggle label-left="off" label-right="on" />

    <Toggle label-left="disabled toggle" label-right="on" disabled />
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
        val: true,
      };
    },
  });
</script>
