<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Notifications</h2>
    <Button is:primary @click="not">Notification</Button>
    <Button class="mt-4 block" is:danger @click="not2">Custom notification</Button>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Button from '@/lib/components/Button';
  import CustomNotification from '../components/CustomNotification.vue';

  export default Vue.extend({
    name: 'TabsContainer',
    components: {Button},
    methods: {
      not () {
        this.$iui.notify('Hello');
      },
      not2 () {
        this.$iui.notify(CustomNotification, {text: 'Wow, working!'});
      },
    },
  });
</script>
