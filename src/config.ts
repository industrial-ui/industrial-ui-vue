/**
 * Default IUI configuration. Read more about it here: https://industrial-ui.com/docs/configuration
 */
import Notification from '@/components/Notification/Notification.vue';
import { Config } from '@/types/config';
import transitions from '@/transitions';

const config: Config = {
  stylesheets: [],
  globalClass: '',
  transitions,

  components: {
    button: {
      isProperties: {},
      class: '',
    },

    dropdown: {
      transition: null,
      isProperties: {},

      class: '',
      openClass: '',
      closeClass: '',
      disabledClass: '',

      triggerClass: '',
      openTriggerClass: '',
      closeTriggerClass: '',

      dropdownClass: '',
      openDropdownClass: '',
      closeDropdownClass: '',
    },

    modal: {
      transition: null,

      isProperties: {},

      moveToBody: true,
      blockBodyScroll: true,

      class: '',
      openClass: '',
      closeClass: '',

      overlayClass: '',
      openOverlayClass: '',
      closeOverlayClass: '',

      bodyClass: '',
      openBodyClass: '',
      closeBodyClass: '',
    },

    checkbox: {
      isProperties: {},
      class: '',
      checkedClass: '',
      uncheckedClass: '',
      disabledClass: '',
      requiredClass: '',
      inputClass: '',
      spanClass: '',
    },

    radio: {
      isProperties: {},
      class: '',
      checkedClass: '',
      uncheckedClass: '',
      disabledClass: '',
      requiredClass: '',
      inputClass: '',
      spanClass: '',
    },

    radioGroup: {
      isProperties: {},
      class: '',
    },

    checkboxGroup: {
      isProperties: {},
      class: '',
    },

    tabs: {
      class: '',
      isProperties: {},
      transition: null,

      navClass: '',
      panelsWrapperClass: '',

      tabClass: '',
      activeTabClass: '',
      inactiveTabClass: '',
      disabledTabClass: '',
      removableTabClass: '',

      panelClass: '',
      activePanelClass: '',
      inactivePanelClass: '',
    },

    toggle: {
      class: '',
      isProperties: {},

      checkedClass: '',
      uncheckedClass: '',
      disabledClass: '',

      inputClass: '',
      baseClass: '',
      labelClass: '',
      leftLabelClass: '',
      rightLabelClass: '',
    },

    dropzone: {
      class: '',
      isProperties: {},

      dragOverClass: '',
      hasFilesClass: '',
      hasNoFilesClass: '',
      disabledClass: '',
      requiredClass: '',

      maxAmount: null,
      maxSize: null,
      maxRatio: null,
      minRatio: null,
      formats: null,

      inputAttrs: null,
    },

    notification: {
      class: '',
      isProperties: {},
      hasNotificationsClass: '',
      hasNoNotificationsClass: '',

      notificationClass: '',
      notificationComponent: Notification,

      next: 'first',
      maxAmount: null,
      timeout: 5000,

      closeOnClick: true,
      closeOnDrag: true, // TODO: add support
      pauseOnFocusLost: true,

      transition: null,
    },

    contextMenu: {
      class: '',
      openClass: '',
      closeClass: '',

      transition: null,
      isProperties: {},

      closeOnClickAway: true,
      closeOnResize: true,
      closeOnScroll: true,

      fixedPosition: {x: 0, y: 0},
    },
  },
};
export default config;
