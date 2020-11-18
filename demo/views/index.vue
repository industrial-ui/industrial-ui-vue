<template>
  <div class="p-8 grid row-gap-6 lg:col-gap-6 lg:grid-cols-3">
    <div class="w-full">
      <ContextMenus />
    </div>
    <div class="w-full">
      <Dropzones />
    </div>
    <div class="w-full">
      <Transitions />
    </div>
    <div class="w-full">
      <Notifications />
    </div>
    <div class="w-full">
      <Modals />
    </div>
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
      <Tabs />
    </div>
    <div class="w-full">
      <Toggles />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Buttons from '../containers/Buttons.vue';
  import Dropdowns from '../containers/Dropdowns.vue';
  import Dropzones from '../containers/Dropzones.vue';
  import DropdownSelects from '../containers/DropdownSelects.vue';
  import Checkboxes from '../containers/Checkboxes.vue';
  import Radios from '../containers/Radios.vue';
  import Modals from '../containers/Modals.vue';
  import Tabs from '../containers/Tabs.vue';
  import Toggles from '../containers/Toggles.vue';
  import Transitions from '../containers/Transitions.vue';
  import Notifications from '../containers/Notifications.vue';
  import ContextMenus from '../containers/ContextMenus.vue';

  export default Vue.extend({
    name: 'Home',
    components: {
      Buttons,
      Dropdowns,
      Dropzones,
      DropdownSelects,
      Checkboxes,
      Radios,
      Modals,
      Tabs,
      Toggles,
      Transitions,
      Notifications,
      ContextMenus,
    },
  });
</script>
