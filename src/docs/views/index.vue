<template>
  <div class="p-8">
    <div class="w-full lg:w-1/3">
      <Dropdowns />
    </div>
    <div class="w-full lg:w-1/3">
      <DropdownSelects />
    </div>
    <div class="w-full lg:w-1/3"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Dropdowns from '../containers/Dropdowns.vue';
  import DropdownSelects from '../containers/DropdownSelects.vue';

  export default Vue.extend({
    name: 'Home',
    components: {
      Dropdowns,
      DropdownSelects,
    },
  });
</script>
