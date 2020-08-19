<template>
  <div>
    <h2>Hey</h2>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'TabPanel',
    props: {
      active: Boolean,

      label: String,
      disabled: Boolean,
      removable: Boolean,
    },
  });
</script>
