<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Notifications</h2>
    <Button is:primary @click="not">Notification</Button>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Button from '@/lib/components/Button';

  export default Vue.extend({
    name: 'TabsContainer',
    components: {Button},
    methods: {
      not () {
        this.$iui.notify('Hello');
      },
    },
  });
</script>
