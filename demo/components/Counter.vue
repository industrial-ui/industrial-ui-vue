<template>
  <div>
    <h2>Hello, world</h2>
    <IuiButton @click.native="counter++" is:primary>Increase counter</IuiButton>
    <p>Counter: {{ counter }}</p>
    <IuiButton @click.native="close" is:danger>Close modal</IuiButton>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {IuiButton} from '@/main';

  export default Vue.extend({
    name: 'Counter',
    components: {IuiButton},
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
