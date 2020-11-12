import Vue, {PropType} from 'vue';
import {AnimationOptions, TransitionOptions} from '@/lib/types/transitions';

interface TransitionType extends Partial<TransitionOptions> {
  name: 'fade'|'blur'|'scale'|'slide'|'fly'|string|null,
  hooks?: any,
  options: {
    appear?: boolean,
    mode?: 'in-out'|'out-in'|null,
    css?: boolean,
  },
}

export default Vue.extend({
  props: {
    /**
     * The name of the transition effect to be used. Can be one of built-in effects,
     * or a name of a custom effect defined in the configuration.
     */
    name: {
      type: String,
      default: null,
    },

    /**
     * Following properties are well-explained in the official Vue documentation:
     * https://vuejs.org/v2/guide/transitions.html#Transition-Modes
     *
     * Shortly:
     * * Appear – show transition on initial Transition mount
     * * Mode – how to switch between if-else_if-else components. Supported: in-out, out-in
     */
    appear: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String as PropType<'in-out'|'out-in'|null>,
      default: null,
    },

    /**
     * Animation object to configure such properties as:
     * delay, duration, type (only in or only out), easing etc.
     */
    animation: {
      type: Object as PropType<AnimationOptions>,
      default: null,
    },

    /**
     * Only for development purposes: the configuration object (to be passed
     * from components that use Transition in it)
     */
    transitionConfig: {
      type: Object,
      default: () => ({transitions: {}}),
    },
  },
  computed: {
    /**
     * Compose all data of the transition in the single object to pass where it is needed
     */
    transition (): TransitionType {
      if (!this.name) return {name: '', animation: {}, options: {}};

      const {transitions} = this.$iui?.config || this.transitionConfig;
      let transition = transitions[this.name];

      if (!transition) {
        throw new Error(
          `Transition ${this.name} is not configured.\n
            Expected one of the names: ${Object.keys(transitions).join(', ')}`
        );
      } else {
        if (transition.effectReference) {
          const reference = transitions[transition.effectReference];
          transition = {
            ...reference,
            ...transition,
            animation: {...reference?.animation, ...transition?.animation},
          };
        }
        return {
          ...transition,
          animation: {...transition.animation, ...this.animation},
          options: {
            appear: this.appear,
            mode: this.mode || null,
            css: !this.animation,
          },
        };
      }
    },

    /**
     * Transition hooks are JS-functions that are mapped as events. They draw an animation
     */
    hooks () {
      const hooks = this.transition?.hooks;
      const newHooks: any = {};
      if (hooks) Object.keys(hooks).forEach((key) => {
        const hook = hooks[key];
        newHooks[key] = (el: any, done: any) => hook({el, done}, this.transition.animation);
      });
      return newHooks;
    },
  },
});
