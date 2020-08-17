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
  import {TransitionOptions} from '@/lib/types';

  interface TransitionType extends Partial<TransitionOptions> {
    name: 'fade'|string|null,
    hooks?: any,
  }

  export default Vue.extend({
    name: 'CustomTransition',
    props: {
      name: {
        type: String,
        default: null,
      },

      options: Object as PropType<TransitionOptions>,
    },
    computed: {
      transition (): TransitionType {
        if (!this.name) return {name: '', animation: {}, options: {}};

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
            animation: this.options?.animation || transition.animation,
            options: this.options?.options || {},
          };
        }
      },
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
