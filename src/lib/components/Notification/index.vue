<template>
  <TransitionGroup
    :class="wrapperClasses"
    :name="transitionName"
    v-bind="transitionProps"
    tag="div"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
    >
      {{ notification.id }}
    </div>
  </TransitionGroup>
</template>

<script lang="ts">
  import Vue from 'vue';
  import composeClasses from '@/lib/utils/compose-classes';
  import {TransitionOptions} from '@/lib/types/transitions';
  import {NotificationConfig} from '@/lib/types/notification';
  import hastString from '@/lib/utils/hash-string';
  import TransitionGroup from '../TransitionGroup';

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
        value: [] as string[],
        notifications: [] as Notification[],
      };
    },
    computed: {
      hasNotifications () {
        return !!(this.$data.value.length);
      },
      wrapperClasses (): string|null {
        const component = this.$iui.config.components.notification;
        return composeClasses(
          this.$iui.config.globalClass,
          component.class,
          this.hasNotifications ? component.hasNotificationsClass : component.hasNoNotificationsClass
        );
      },

      transitionName (): string | null {
        const component = this.$iui.config.components.notification;
        return component.transition || null;
      },

      transitionProps (): TransitionOptions|null {
        const component = this.$iui.config.components.notification;
        return component.transitionProps || null;
      },
    },
    methods: {
      add (options: NotificationConfig | string): string {
        const id = hastString(6);
        this.value = [...this.value, id];
        if (typeof options === 'string') {
          this.notifications = [...this.notifications, {id, message: options}];
        } else {
          this.notifications = [...this.notifications, {id, ...options}];
        }
        return id;
      },
    },
  });
</script>
