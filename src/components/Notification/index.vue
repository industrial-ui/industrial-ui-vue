<template>
  <IuiTransitionGroup
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
        :remover="() => remove(notification.id)"
        v-bind="notification.props"
        @click.native="checkClosing($event, notification.id)"
        @close="remove(notification.id)"
      />
    </template>
  </IuiTransitionGroup>
</template>

<script lang="ts">
  import Vue from 'vue';
  import composeClasses from '@/utils/compose-classes';
  import type {
    ComponentOrOptions,
    NotificationConfig,
    NotificationGroupConfig,
    NotificationTimeouts
  } from '@/types/notification';
  import hastString from '@/utils/hash-string';
  import Timer from '@/utils/timer';
  import IuiTransitionGroup from '@/components/TransitionGroup/index.vue';

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
    name: 'IuiNotification',
    components: {IuiTransitionGroup},
    /**
     * In here, all the props are written in the configuration $iui.config.notification
     */
    props: {},

    data () {
      return {
        notifications: [] as Notification[],
        queue: [] as Notification[],
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

    mounted () {
      if (this.defaultProps.pauseOnFocusLost) document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          Object.values(timeouts).forEach((timer) => timer.pause());
        } else {
          Object.values(timeouts).forEach((timer) => timer.resume());
        }
      });
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

        const newNotification = {
          id,
          class: composeClasses(
            groupOptions.notificationClass,
            componentOptions?.class || '',
            groupOptions.isProperties?.[`is:${componentOptions?.isProp || ''}`] || ''
          ) || '',
          options: componentOptions,
          ...properties,
        };

        this.pushNotification(newNotification);
        return id;
      },

      /**
       * Push new notification to either stack of notifications or to the queue.
       * If it is in the main stack, set the timeout for its removal
       */
      pushNotification (notification: Notification) {
        const {next} = this.defaultProps;

        if (next === 'replace') {
          if (!this.notifications.length) this.notifications = [notification];
          else {
            this.queue.push(notification);
            return;
          }
        } else if (next === 'force-replace') {
          this.notifications = [notification];
        } else if (!this.defaultProps.maxAmount || this.notifications.length < this.defaultProps.maxAmount) {
          if (next === 'first') this.notifications = [notification, ...this.notifications];
          else this.notifications = [...this.notifications, notification];
        } else {
          this.queue.push(notification);
        }

        if (notification.options?.timeout !== null) timeouts[notification.id] = new Timer(
          () => this.remove(notification.id),
          notification.options?.timeout || this.defaultProps.timeout
        );
      },

      remove (id: string) {
        this.notifications = this.notifications.filter((notification) => notification.id !== id);
        delete timeouts[id];

        // Check if the queue is not empty and push the first notification out of it
        if (this.queue.length) {
          const notification = this.queue.shift();
          if (notification) this.pushNotification(notification);
        }
      },

      removeAll () {
        this.notifications = [];
        this.queue = [];
      },

      removeFirst () {
        const first = this.notifications[0];
        if (first) this.remove(first.id);
      },

      removeLast () {
        const last = this.notifications[this.notifications.length - 1];
        if (last) this.remove(last.id);
      },

      checkClosing(e: Event, id: string) {
        const notificationOptions = this.notifications.find((notif) => notif.id === id)?.options;
        if (
          e.type === 'click'
          && ((notificationOptions?.closeOnClick === true)
            || (notificationOptions?.closeOnClick !== false && this.defaultProps.closeOnClick))
        ) {
          this.remove(id);
        }
      },
    },
  });
</script>
