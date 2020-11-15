<template>
  <div>
    <h2>Hello, world</h2>
    <Button @click.native="counter++" is:primary>Increase counter</Button>
    <p>Counter: {{ counter }}</p>
    <Button @click.native="close" is:danger>Close modal</Button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Button from '../../src/components/Button';

  export default Vue.extend({
    name: 'Counter',
    components: {Button},
    props: {
      close: Function,
    },
    data () {
      return {
        counter: 0,
      };
    },
  });
</script>
