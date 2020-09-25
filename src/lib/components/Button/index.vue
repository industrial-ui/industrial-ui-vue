<template>
  <button :class="wrapperClasses" @click="$emit('click', $event)">
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import composeClasses from '@/lib/utils/compose-classes';
  import isProperties from '@/lib/utils/is-properties';

  /**
   * ! WARN !
   * This component is not ready yet and will definitely changed in future!!!
   */
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
        return composeClasses(
          this.$iui.globalClass,
          isProperties(component.isProperties, this.$attrs),
          component.class
        );
      },
    },
  });
</script>
