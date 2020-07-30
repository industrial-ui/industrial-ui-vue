<template>
  <button>
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'Button',
    props: {
      label: String,
    },
  });
</script>
