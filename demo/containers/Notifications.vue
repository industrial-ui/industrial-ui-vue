<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Notifications</h2>
    <Button is:primary @click="not">Notification</Button>
    <Button class="mt-4 block" is:danger @click="not2">Custom notification</Button>
    <Button class="mt-4 block" is:primary @click="not3">Not auto closable</Button>

    <div class="flex mt-4">
      <Button class="" is:danger @click="() => lastNot ? lastNot.removeLast() : null">Remove Last</Button>
      <Button class="ml-2" is:danger @click="() => lastNot ? lastNot.removeAll() : null">Remove ALL</Button>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import type {NotificationClass} from '@/types/notification';
  import Button from '@/components/Button';
  import CustomNotification from '../components/CustomNotification.vue';

  export default Vue.extend({
    name: 'TabsContainer',
    components: {Button},
    data () {
      return {
        lastNot: null as NotificationClass|null,
      };
    },
    methods: {
      not () {
        this.lastNot = this.$iui.notify('Hello', {isProp: 'success'});
      },
      not2 () {
        this.lastNot = this.$iui.notify(CustomNotification, {
          text: 'Wow, working!',
          isProp: 'info',
          closeOnClick: false,
        });
      },
      not3 () {
        this.lastNot = this.$iui.notify(CustomNotification, {
          text: 'Try clicking.',
          timeout: null,
          isProp: 'danger',
        });
      },
    },
  });
</script>
