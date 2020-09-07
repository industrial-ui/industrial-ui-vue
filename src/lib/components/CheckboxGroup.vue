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
  import {Option} from '@/lib/types/components';
  import composeClasses from '@/lib/utils/compose-classes';
  import isProperties from '@/lib/utils/is-properties';
  import Checkbox from './Checkbox.vue';

  export default Vue.extend({
    name: 'RadioGroup',
    components: {Checkbox},
    model: {
      prop: 'values',
      event: 'change',
    },
    props: {
      tag: {
        type: String,
        default: 'div',
      },

      groupName: String,

      options: {
        type: Array as PropType<Option[]>,
        default: null,
      },

      values: {
        type: Array as PropType<Option[]>,
        default: () => ([]),
      },

      /**
       * Disable the group to select to checkboxes if maxAmount is already checked
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
        const component = this.$iui.components.checkboxGroup;
        return composeClasses(
          this.$iui.globalClass,
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
