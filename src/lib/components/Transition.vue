<template>
  <transition
    :name="transition.name"
    v-bind="transition.options"
    v-on="hooks"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue';
  import {AnimationOptions, TransitionOptions} from '@/lib/types';

  interface TransitionType extends Partial<TransitionOptions> {
    name: 'fade'|string|null,
    hooks?: any,
    options: {
      appear?: boolean,
      mode?: 'in-out'|'out-in'|null,
      css?: boolean,
    },
  }

  export default Vue.extend({
    name: 'CustomTransition',
    props: {
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
    },
    computed: {
      transition (): TransitionType {
        if (!this.name) {
          console.warn('Transition component: no name provided, so no transition effect will be applied.'); // eslint-disable-line no-console
          return {name: '', animation: {}, options: {}};
        }

        const {transitions} = this.$iui;
        const transition = transitions[this.name];

        if (!transition) {
          throw new Error(
            `Transition ${this.name} is not configured.\n
            Expected one of the names: ${Object.keys(transitions).join(', ')}`
          );
        } else {
          return {
            ...transition,
            animation: this.animation || transition.animation,
            options: {
              appear: this.appear,
              mode: this.mode || null,
              css: !this.animation,
            },
          };
        }
      },

      /**
       * Transition hooks are JS-functions that are mapped as events. They draw the animation
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
</script>
