<template>
  <TransitionGroup
    :class="wrapperClasses"
    :name="defaultProps.transition || null"
    v-bind="defaultProps.transitionProps || null"
    tag="div"
  >
    <template v-for="notification in notifications">
      <component
        :is="notification.component"
        :key="notification.id"
        v-bind="notification"
      />
    </template>
  </TransitionGroup>
</template>

<script lang="ts">
  import Vue from 'vue';
  import composeClasses from '@/lib/utils/compose-classes';
  import {ComponentOrOptions, NotificationConfig, NotificationGroupConfig} from '@/lib/types/notification';
  import hastString from '@/lib/utils/hash-string';
  import TransitionGroup from '../TransitionGroup';
  import Notification from './Notification.vue';

  type Notification = {
    id: string,
    [key: string]: any,
  };

  export default Vue.extend({
    name: 'Notification',
    components: {TransitionGroup},
    /**
     * In here, all the props are written in the configuration $iui.config.notification
     */
    props: {},
    data () {
      return {
        notifications: [] as Notification[],
      };
    },
    computed: {
      hasNotifications () {
        return !!(this.$data.notifications.length);
      },

      defaultProps (): NotificationGroupConfig {
        return this.$iui.config.components.notification;
      },

      wrapperClasses (): string|null {
        return composeClasses(
          this.$iui.config.globalClass,
          this.defaultProps.class,
          this.hasNotifications ? this.defaultProps.hasNotificationsClass : this.defaultProps.hasNoNotificationsClass
        );
      },
    },
    methods: {
      add (
        componentOrOptions: ComponentOrOptions,
        options: Partial<NotificationConfig> = {}
      ): string|null {
        let properties;

        // Check if first argument is a vNode
        if (componentOrOptions !== null && typeof componentOrOptions === 'function') {
          properties = {component: componentOrOptions, ...options};
        } else if (typeof componentOrOptions === 'object') {
          // Check if the Notification props are passed
          properties = {component: this.defaultProps.notificationComponent ? this.defaultProps.notificationComponent : Notification, ...componentOrOptions};
        } else if (typeof componentOrOptions === 'string') {
          // Check if the message is passed
          properties = {message: componentOrOptions, component: this.defaultProps.notificationComponent ? this.defaultProps.notificationComponent : Notification};
        } else {
          // In other case – nothing useful is passed. Show a warn
          console.warn(`Please, provide the $iui.notify() function with a proper argument.
           It could a custom Vue component, config object or a message string.`);
          return null;
        }

        const id = hastString(6);

        this.notifications = [...this.notifications, {id, ...properties}];
        return id;
      },
    },
  });
</script>
