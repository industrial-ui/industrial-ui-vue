// eslint-disable-next-line import/extensions
import {CombinedVueInstance} from 'vue/types/vue';

// export type Instance = {
//   add: () => void,
// };

type NotData = () => {
  val: boolean,
};

type NotMethods = {
  add: () => void,
};

type NotComputed = {
  properties: () => {},
  notifications: () => [],
};

type NotProps = {

};

export type NotificationInstance = CombinedVueInstance<Vue, NotData, NotMethods, NotComputed, NotProps>;
