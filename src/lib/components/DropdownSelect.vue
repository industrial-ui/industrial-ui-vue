<template>
  <Dropdown v-bind="dropdownProps">
    <template #trigger="slotProps">
      <slot name="trigger" v-bind="slotProps" />
    </template>

    <template v-slot:default="slotProps">
      <CheckboxGroup
        v-if="multiple"
        :options="options"
        :group-name="groupName"
        @change="newVal => change(newVal, slotProps.close)"
      >
        <template #option="optionProps">
          <slot name="option" v-bind="optionProps" />
        </template>
      </CheckboxGroup>

      <RadioGroup
        v-else
        :options="options"
        :group-name="groupName"
        @change="newVal => change(newVal, slotProps.close)"
      >
        <template #option="optionProps">
          <slot name="option" v-bind="optionProps" />
        </template>
      </RadioGroup>
    </template>
  </Dropdown>
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue';
  import {Option} from '@/lib/types';
  import Dropdown from '@/lib/components/Dropdown.vue';
  import CheckboxGroup from '@/lib/components/CheckboxGroup.vue';
  import RadioGroup from '@/lib/components/RadioGroup.vue';

  export default Vue.extend({
    name: 'DropdownSelect',
    components: {Dropdown, CheckboxGroup, RadioGroup},
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      /**
       * Required, the array of {slug: 'Unique identifier', ...anyOtherProps}
       */
      options: {
        type: Array as PropType<Option[]>,
        required: true,
      },

      /**
       * Group checkboxes or radio buttons with the name on input
       */
      groupName: {
        type: String,
        required: true,
      },

      /**
       * The text in the dropdown trigger, dynamic
       */
      label: {
        type: String,
        default: '',
      },

      /**
       * Values ({slug, text}) of options that are currently chosen
       * In any case, select returns an array on every change
       */
      value: {
        type: [Object, Array] as PropType<Option[]|Option|null>,
        default: null,
      },

      /**
       * Whether you can select multiple values or not
       */
      multiple: {
        type: Boolean,
        default: true,
      },

      /**
       * Whether the select should be closed after the change or not
       */
      closeOnClick: {
        type: Boolean,
        default: false,
      },

      dropdownProps: Object,
      checkboxProps: Object,
    },
    data () {
      return {
        val: this.value,
      };
    },
    // watch: {
    //   values (val) {
    //     this.vals = val;
    //     this.updateCheckboxes();
    //   },
    // },
    methods: {
      change (val: Option[]|Option, close: (() => {})|null) {
        if (this.closeOnClick && close) close();
      },
    },
  });
</script>
