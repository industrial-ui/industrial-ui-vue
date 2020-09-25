<template>
  <div>
    {{ text }}
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      id: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  });
</script>
