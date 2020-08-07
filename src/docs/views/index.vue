<template>
  <div class="p-8 grid row-gap-6 lg:col-gap-6 lg:grid-cols-3">
    <div class="w-full">
      <Dropdowns />
    </div>
    <div class="w-full">
      <DropdownSelects />
    </div>
    <div class="w-full">
      <Checkboxes />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Dropdowns from '../containers/Dropdowns.vue';
  import DropdownSelects from '../containers/DropdownSelects.vue';
  import Checkboxes from '../containers/Checkboxes.vue';

  export default Vue.extend({
    name: 'Home',
    components: {
      Dropdowns,
      DropdownSelects,
      Checkboxes,
    },
  });
</script>
