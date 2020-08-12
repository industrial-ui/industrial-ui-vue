<template>
  <component
    :is="tag"
    :class="wrapperClasses"
  >
    <template v-for="option in options">
      <slot name="option" v-bind:option="option">
        <Radio
          :key="option.slug"
          :name="groupName"
          v-bind="option"
        />
      </slot>
    </template>
  </component>
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue';
  import {Option} from '@/lib/types';
  import composeClasses from '@/lib/utils/compose-classes';
  import isProperties from '@/lib/utils/is-properties';
  import Radio from './Radio.vue';

  export default Vue.extend({
    name: 'RadioGroup',
    components: {Radio},
    props: {
      tag: {
        type: String,
        default: 'div',
      },

      options: {
        type: Array as PropType<Option[]|null>,
        default: null,
      },

      values: {
        type: Array as PropType<Option[]|null>,
        default: null,
      },

      groupName: String,
    },
    computed: {
      wrapperClasses (): string | null {
        const component = this.$iui.components.radioGroup;
        return composeClasses(
          component.class,
          isProperties(component.isProperties, this.$attrs)
        );
      },
    },
  });
</script>
