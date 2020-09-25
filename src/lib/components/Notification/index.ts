import Vue from 'vue';
import {NotificationAddMethod, NotificationInstance} from '@/lib/types/notification';
import Component from './index.vue';

const NotificationConstructor = Vue.extend(Component);
let instance: NotificationInstance;

const Notification: NotificationAddMethod = (options) => {
  if (typeof window === 'undefined') return '';

  if (!instance) {
    instance = new NotificationConstructor({
      propsData: {
        message: 'Sometext',
      },
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
  }

  return instance.add(options);
};

export default Notification;
