<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Radio input</h2>
    <Radio name="radio1">Hello</Radio>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Radio from '@/lib/components/Radio.vue';

  export default Vue.extend({
    name: 'Radios',
    components: {Radio},
  });
</script>
