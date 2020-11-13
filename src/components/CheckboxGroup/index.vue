<template>
  <component
    :is="tag"
    :class="wrapperClasses"
    ref="group"
  >
    <template v-for="option in options">
      <Checkbox
        :key="option.slug"
        :name="groupName"
        :value="vals && vals.some(val => val.slug === option.slug)"
        v-bind="option"
        @toggle="(newVal, event) => change(option, newVal, event)"
      >
        <slot name="option" v-bind="option" />
      </Checkbox>
    </template>
  </component>
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue';
  import {Option} from '@/types/components';
  import composeClasses from '@/utils/compose-classes';
  import isProperties from '@/utils/is-properties';
  import Checkbox from '@/components/Checkbox/index.vue';

  export default Vue.extend({
    name: 'RadioGroup',
    components: {Checkbox},
    model: {
      prop: 'values',
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
       * Array of {slug: string, ...checkboxProps}
       */
      options: {
        type: Array as PropType<Option[]>,
        default: null,
      },

      /**
       * Array of active options of the type {slug: string, ...checkboxProps}
       */
      values: {
        type: Array as PropType<Option[]>,
        default: () => ([]),
      },

      /**
       * Maximum allowed amount of checkex checkboxes.
       * If values.length >= maxAmount – disable the group
       */
      maxAmount: [Number, String],
    },
    data () {
      return {
        vals: this.values,
      };
    },
    computed: {
      wrapperClasses (): string | null {
        const component = this.$iui.config.components.checkboxGroup;
        return composeClasses(
          this.$iui.config.globalClass,
          component.class,
          isProperties(component.isProperties, this.$attrs)
        );
      },
    },
    watch: {
      values (val) {
        if (val?.length !== this.vals.length) {
          this.$nextTick(() => {
            this.vals = val;
          });
        }
      },
    },
    methods: {
      change (option: Option, val: boolean, event: Event) {
        if (val && this.maxAmount && this.vals.length + 1 > this.maxAmount) {
          this.$nextTick(() => (event.target as HTMLInputElement).checked = false);
        } else {
          let update;
          if (val) update = [...this.vals, option];
          else update = this.vals.filter((opt) => opt.slug !== option.slug);

          this.vals = update;
          this.$emit('change', update);
        }
      },
    },
  });
</script>
