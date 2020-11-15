import Vue from 'vue';
import {NotificationAddMethod, NotificationInstance} from '@/types/notification';
import Component from './index.vue';

const NotificationConstructor = Vue.extend(Component);
let instance: NotificationInstance;

const Notification: NotificationAddMethod = (componentOrOptions, options) => {
  if (typeof window === 'undefined') return null;

  if (!instance) {
    instance = new NotificationConstructor();
    instance.$mount();
    document.body.appendChild(instance.$el);
  }

  const id = instance.add(componentOrOptions, options);
  if (!id) return null;

  return {
    id,
    remove: () => instance.remove(id),
    removeFirst: () => instance.removeFirst(),
    removeLast: () => instance.removeLast(),
    removeAll: () => instance.removeAll(),
  };
};

export default Notification;
