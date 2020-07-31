<template>
  <div class="home">
    <Button>Hello, World!</Button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Button from '@/lib/components/Button.vue';

  export default Vue.extend({
    name: 'Home',
    components: {
      Button,
    },
  });
</script>
