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
        :id="notification.id"
        :class="notification.class"
        v-bind="notification.props"
        @click.native="checkClosing($event, notification.id)"
      />
    </template>
  </TransitionGroup>
</template>

<script lang="ts">
  import Vue from 'vue';
  import composeClasses from '@/lib/utils/compose-classes';
  import {
    ComponentOrOptions,
    NotificationConfig,
    NotificationGroupConfig,
    NotificationTimeouts
  } from '@/lib/types/notification';
  import hastString from '@/lib/utils/hash-string';
  import TransitionGroup from '../TransitionGroup';

  type Notification = {
    id: string,
    options: Partial<NotificationConfig>,
    class: string,
    props: {
      message?: string,
      [key: string]: any,
    },
  };

  const timeouts: NotificationTimeouts = {};

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
        const groupOptions = this.defaultProps;
        let componentOptions: Partial<NotificationConfig> = {};
        let properties;

        // Check if first argument is a vNode
        if (componentOrOptions !== null && typeof componentOrOptions === 'function') {
          componentOptions = options;
          properties = {
            component: componentOrOptions,
            props: options,
          };
        } else if (typeof componentOrOptions === 'object') {
          // Check if the Notification props are passed
          componentOptions = componentOrOptions;
          properties = {
            component: groupOptions.notificationComponent,
            props: componentOrOptions,
          };
        } else if (typeof componentOrOptions === 'string') {
          // Check if the message is passed
          componentOptions = options;
          properties = {
            component: groupOptions.notificationComponent,
            props: {message: componentOrOptions},
          };
        } else {
          // In other case – nothing useful is passed. Show a warn
          console.warn(`Please, provide the $iui.notify() function with a proper argument.
           It could a custom Vue component, config object or a message string.`);
          return null;
        }

        const id = hastString(6);

        if (componentOptions?.timeout !== null) timeouts[id] = setTimeout(
          () => this.remove(id),
          componentOptions?.timeout || groupOptions?.timeout
        );

        this.notifications = [...this.notifications, {
          id,
          class: composeClasses(
            groupOptions.notificationClass,
            componentOptions?.class || '',
            groupOptions.isProperties?.[`is:${componentOptions?.isProp || ''}`] || ''
          ) || '',
          options: {...componentOptions},
          ...properties,
        }];
        return id;
      },

      remove (id: string) {
        this.notifications = this.notifications.filter((notification) => notification.id !== id);
        clearTimeout(timeouts[id]);
      },

      checkClosing(e: Event, id: string) {
        const notificationOptions = this.notifications.find((notif) => notif.id === id)?.options;
        if (e.type === 'click' && (notificationOptions?.closeOnClick || this.defaultProps.closeOnClick)) {
          this.remove(id);
        }
      },
    },
  });
</script>
