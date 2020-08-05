/**
 * Default IUI configuration. Read more about it here: https://industrial-ui.com/docs/configuration
 */
import { TransitionOptions, Config } from './types';

const DEFAULT_TRANSITION_OPTIONS: Partial<TransitionOptions> = {
  delay: 0,
  duration: 300,
};

const config: Config = {
  stylesheets: [],
  globalClass: '',
  customTransitions: {},

  components: {
    button: {
      isProperties: {},
      class: '',
    },

    dropdown: {
      transition: null,
      transitionOptions: DEFAULT_TRANSITION_OPTIONS,
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
      transitionOptions: DEFAULT_TRANSITION_OPTIONS,

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

      inputClass: '',
      checkedInputClass: '',
      uncheckedInputClass: '',

      labelClass: '',
      checkedLabelClass: '',
      uncheckedLabelClass: '',

      customizerClass: '',
      checkedCustomizerClass: '',
      uncheckedCustomizerClass: '',
    },
  },
};
export default config;
