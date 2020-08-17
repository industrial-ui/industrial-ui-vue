<template>
  <transition :name="transition.name" v-on="transition.hooks">
    <slot />
  </transition>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'CustomTransition',
    props: {
      name: {
        type: String,
        default: null,
      },
    },
    computed: {
      transition () {
        const {transitions} = this.$iui;
        const transition = transitions[this.name];

        if (!transition) {
          throw new Error(
            `Transition ${this.name} is not configured.
          Expected one of the names: ${Object.keys(transitions).join(', ')}`
          );
        } else {
          return transition;
        }
      },
    },
  });
</script>
