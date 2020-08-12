<template>
  <component
    :is="tag"
    :class="wrapperClasses"
  >
    <slot>
      <Radio
        v-for="option in options"
        :key="option.slug"
        :name="groupName"
        v-bind="option"
      />
    </slot>
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
        type: Object as PropType<Option[]|null>,
        default: null,
      },

      values: {
        type: Object as PropType<Option[]|null>,
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
