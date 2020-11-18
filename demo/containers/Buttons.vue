<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Buttons</h2>
    <IuiButton is:primary>LOOL!</IuiButton>
    <IuiButton is:danger class="ml-4">DANGEEER!</IuiButton>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {IuiButton} from '@/main';

  export default Vue.extend({
    name: 'Buttons',
    components: {IuiButton},
  });
</script>
