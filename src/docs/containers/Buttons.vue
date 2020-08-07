<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Buttons</h2>
    <Button is:primary>LOOL!</Button>
    <Button is:danger>DANGEEER!</Button>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Button from '@/lib/components/Button.vue';

  export default Vue.extend({
    name: 'Buttons',
    components: {Button},
  });
</script>
