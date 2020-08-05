<template>
  <div class="p-8">
    <div class="w-full lg:w-1/3">
      <Dropdowns />
    </div>
    <div class="w-full lg:w-1/3"></div>
    <div class="w-full lg:w-1/3"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Dropdowns from '../containers/Dropdowns.vue';

  export default Vue.extend({
    name: 'Home',
    components: {
      Dropdowns,
    },
  });
</script>
