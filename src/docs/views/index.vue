<template>
  <div class="p-8 grid row-gap-6 lg:col-gap-6 lg:grid-cols-3">
    <div class="w-full">
      <Buttons />
    </div>
    <div class="w-full">
      <Dropdowns />
    </div>
    <div class="w-full">
      <DropdownSelects />
    </div>
    <div class="w-full">
      <Checkboxes />
    </div>
    <div class="w-full">
      <Radios />
    </div>
    <div class="w-full">
      <RadioGroups />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Buttons from '../containers/Buttons.vue';
  import Dropdowns from '../containers/Dropdowns.vue';
  import DropdownSelects from '../containers/DropdownSelects.vue';
  import Checkboxes from '../containers/Checkboxes.vue';
  import Radios from '../containers/Radios.vue';
  import RadioGroups from '../containers/RadioGroups.vue';

  export default Vue.extend({
    name: 'Home',
    components: {
      Buttons,
      Dropdowns,
      DropdownSelects,
      Checkboxes,
      Radios,
      RadioGroups,
    },
  });
</script>
