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
  import Vue from 'vue';
  import TransitionMixin from '@/mixins/Transition';

  export default Vue.extend({
    name: 'IuiTransition',
    mixins: [TransitionMixin],
  });
</script>
