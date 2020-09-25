<template>
  <div>
    {{ message }}
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
      message: {
        type: String,
        required: true,
      },
    },
  });
</script>
