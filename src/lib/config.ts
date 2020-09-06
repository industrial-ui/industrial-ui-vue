/**
 * Default IUI configuration. Read more about it here: https://industrial-ui.com/docs/configuration
 */
import { Config } from './types';
import transitions from './transitions';

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
  },
};
export default config;
