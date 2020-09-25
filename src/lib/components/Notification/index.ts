import Vue from 'vue';
import {NotificationInstance} from '@/lib/types/notification';
import Component from './index.vue';

const NotificationConstructor = Vue.extend(Component);
let instance: NotificationInstance;

const Notification = () => {
  if (typeof window === 'undefined') return;

  if (!instance) {
    instance = new NotificationConstructor({});

    instance.$mount();
    document.body.appendChild(instance.$el);
  }

  instance.add();
};

export default Notification;
