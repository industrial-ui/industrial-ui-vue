<template>
  <button :class="wrapperClasses">
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import composeClasses from '@/lib/utils/compose-classes';

  export default Vue.extend({
    name: 'Button',
    props: {
      label: String,
    },
    computed: {
      /**
       * Compose classes from the ui-configuration and dynamic properties
       * to pass to the button's wrapper
       */
      wrapperClasses(): string | null {
        const component = this.$iui.components.button;
        return composeClasses(component.class);
      },
    },
  });
</script>
