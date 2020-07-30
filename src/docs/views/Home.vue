<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Button>Hello, World!</Button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Button from '@/lib/components/button.vue';
  import HelloWorld from '../components/HelloWorld.vue';

  export default Vue.extend({
    name: 'Home',
    components: {
      HelloWorld,
      Button,
    },
  });
</script>
