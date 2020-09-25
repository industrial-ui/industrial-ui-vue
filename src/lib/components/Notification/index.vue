<template>
  <!--<TransitionGroup name="fly" tag="div">
    <div
      v-for="(notification, i) in notifications"
      :key="i"
    >
      {{ notification.text }}
    </div>

  </TransitionGroup>-->
  <div v-if="val" class="absolute top-0 left-0 w-full h-full bg-gray-800">
    <h1>Hello</h1>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import TransitionGroup from '../TransitionGroup';

  export default Vue.extend({
    name: 'Notification',
    components: {TransitionGroup},
    data () {
      return {
        val: false,
      };
    },
    computed: {
      properties (): {} {
        // Get main settings of the notification that were installed in Vue.use(iui)
        return {};
      },
      notifications (): [] {
        // Get notifications from this.$iui
        return [];
      },
    },
    methods: {
      add () {
        console.log('call');
        this.val = true;
      },
    },
  });
</script>
