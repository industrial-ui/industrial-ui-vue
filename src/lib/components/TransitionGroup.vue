<template>
  <transition-group
    :tag="tag"
    :name="transition.name"
    :move-class="moveClass"
    v-bind="transition.options"
    v-on="hooks"
  >
    <slot />
  </transition-group>
</template>

<script lang="ts">
  import Vue from 'vue';
  import TransitionMixin from '@/lib/mixins/Transition';

  export default Vue.extend({
    name: 'CustomTransitionGroup',
    mixins: [TransitionMixin],
    props: {
      /**
       * Which tag is to be rendered as a transition group wrapper
       */
      tag: {
        type: String,
        default: 'div',
      },

      moveClass: {
        type: String,
        default: 'iui-transition-group-move',
      },
    },
  });
</script>

<style>
.iui-transition-group-move {
  transition: transform .5s;
}
</style>
