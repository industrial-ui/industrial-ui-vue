<template>
  <div class="home">
    <Button>Hello, World!</Button>
    <Dropdown>
      <template #trigger>
        <Button>Hello</Button>
      </template>
      World
    </Dropdown>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Button from '@/lib/components/Button.vue';
  import Dropdown from '@/lib/components/Dropdown.vue';

  export default Vue.extend({
    name: 'Home',
    components: {
      Button,
      Dropdown,
    },
  });
</script>
