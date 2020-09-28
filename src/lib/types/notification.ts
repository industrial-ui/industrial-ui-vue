// eslint-disable-next-line import/extensions
import {CombinedVueInstance} from 'vue/types/vue';
import {ComponentConfig} from '@/lib/types/components';

export type NotificationTimeouts = {
  [key: string]: number|undefined,
}

export interface NotificationGroupConfig extends ComponentConfig {
  hasNotificationsClass: string,
  hasNoNotificationsClass: string,
  notificationClass: string,
  notificationComponent: CombinedVueInstance<any, any, any, any, any>|null,

  position: 'top-left'|'top'|'top-right'|'bottom-right'|'bottom'|'bottom-left',
  next: 'first'|'last'|'replace'|'force-replace',
  maxAmount: number|null,
  timeout: number,

  closeOnClick: boolean,
  closeOnDrag: boolean,
  pauseOnFocusLost: boolean,
}

export interface NotificationConfig {
  class: string,
  isProp: string, // IsProperty string. Configurable in the NotificationGroupConfig
  timeout: number|null,

  closeOnClick: boolean,
  closeOnDrag: boolean,

  // Any other property
  [key: string]: any,
}

type NotData = () => {
  value: string[],
};

export type ComponentOrOptions = CombinedVueInstance<any, any, any, any, any> | NotificationConfig | string
export type NotificationAddMethod = (
  componentOrOptions: ComponentOrOptions,
  options?: Partial<NotificationConfig>,
) => string|null;

type NotMethods = {
  add: NotificationAddMethod,
};

type NotComputed = {
  properties: () => {},
  notifications: () => [],
};

export type NotificationInstance = CombinedVueInstance<Vue, NotData, NotMethods, NotComputed, NotificationGroupConfig>;
