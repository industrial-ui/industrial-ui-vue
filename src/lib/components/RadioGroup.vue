<template>
  <component
    :is="tag"
    :class="wrapperClasses"
    ref="group"
  >
    <template v-for="option in options">
      <Radio
        :key="option.slug"
        :name="groupName"
        :value="val && val.slug === option.slug"
        v-bind="option"
        @toggle="newVal => change(option.slug, newVal)"
      >
        <slot name="option" v-bind="option" />
      </Radio>
    </template>
  </component>
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue';
  import {Option} from '@/lib/types/components';
  import composeClasses from '@/lib/utils/compose-classes';
  import isProperties from '@/lib/utils/is-properties';
  import Radio from './Radio.vue';

  export default Vue.extend({
    name: 'RadioGroup',
    components: {Radio},
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      /**
       * Required inputs name for making them work as a group
       */
      groupName: {
        type: String,
        required: true,
      },

      /**
       * HTML-element of the wrapper. If you want it to be a list, pass `ul`
       */
      tag: {
        type: String,
        default: 'div',
      },

      /**
       * Array of {slug: string, ...radioProps}
       */
      options: {
        type: Array as PropType<Option[]>,
        default: null,
      },

      /**
       * Object of active option of the type {slug: string, ...radioProps}
       */
      value: {
        type: Object as PropType<Option|null>,
        default: null,
      },
    },
    data () {
      return {
        val: this.value,
      };
    },
    computed: {
      wrapperClasses (): string | null {
        const component = this.$iui.components.radioGroup;
        return composeClasses(
          this.$iui.globalClass,
          component.class,
          isProperties(component.isProperties, this.$attrs)
        );
      },
    },
    watch: {
      value (val) {
        if (val?.slug !== this.val?.slug) {
          this.$nextTick(() => {
            this.val = val;
          });
        }
      },
    },
    methods: {
      change (slug: string, val: boolean) {
        if (val) {
          const newVal = this.options.find((opt) => opt.slug === slug);
          if (newVal) {
            this.val = newVal;
            this.$emit('change', newVal);
          }
        }
      },
    },
  });
</script>
