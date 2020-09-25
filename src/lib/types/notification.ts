// eslint-disable-next-line import/extensions
import {CombinedVueInstance} from 'vue/types/vue';
import {ComponentConfig} from '@/lib/types/components';
import {TransitionOptions} from '@/lib/types/transitions';

export interface NotificationGroupConfig extends ComponentConfig {
  hasNotificationsClass: string,
  hasNoNotificationsClass: string,
  notificationClass: string,
  messageClass: string,
  notificationComponent: CombinedVueInstance<any, any, any, any, any>|null,

  position: 'top-left'|'top'|'top-right'|'bottom-right'|'bottom'|'bottom-left',
  next: 'first'|'last'|'replace',
  maxAmount: number|null,
  timeout: number,

  closeOnClick: boolean,
  closeOnDrag: boolean,
  pauseOnFocusLost: boolean,

  transitionProps: TransitionOptions|null,
}

export interface NotificationConfig {
  next: 'first'|'last'|'replace',
  timeout: number,

  closeOnClick: boolean,
  closeOnDrag: boolean,

  // Any other property
  [key: string]: any,
}

type NotData = () => {
  value: string[],
};

export type NotificationAddMethod = (options: NotificationConfig | string) => string;
type NotMethods = {
  add: NotificationAddMethod,
};

type NotComputed = {
  properties: () => {},
  notifications: () => [],
};

export type NotificationInstance = CombinedVueInstance<Vue, NotData, NotMethods, NotComputed, NotificationGroupConfig>;
