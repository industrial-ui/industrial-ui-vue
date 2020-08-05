<template>
  <Dropdown
    :trigger-class="triggerClass"
    :dropdown-class="dropdownClass"
  >
    <template #trigger="slotProps">
      <slot name="trigger" v-bind="slotProps" />
    </template>

    <!--<template #default="slotProps">
      <slot v-bind="slotProps" />
    </template>-->

    <template v-if="multiple" v-slot:default="slotProps">
      <Checkbox
        v-for="option in options"
        :id="checkboxIdPrefix + option.slug"
        :key="option.slug"
        :label="option.text"
        :value="vals.some(val => val.slug === option.slug)"
        @toggle="val => change(option, val, slotProps.close)"
      />
    </template>
    <!--<template v-else v-slot:default="slotProps">
      <div
        v-for="option in options"
        :key="option.slug"
        :class="{current: vals.some(val => val.slug === option.slug)}"
        class="select-item w-inline-block pointer no-outline"
        tabindex="0"
        @click="change(option, true, slotProps.close)"
      >
        {{ option.text }}
        <CheckIcon class="icon-20px" />
      </div>
    </template>-->
  </Dropdown>
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue';
  import Dropdown from '@/lib/components/Dropdown.vue';
  import Checkbox from '@/lib/components/Checkbox.vue';

  type Option = {
    slug: string,
    text: string,
  };

  export default Vue.extend({
    name: 'DropdownSelect',
    components: {Dropdown, Checkbox},
    model: {
      prop: 'values',
      event: 'change',
    },
    props: {
      /**
       * Required, the array of {slug: 'Unique identifier', text: 'Whatever it means'}
       */
      options: {
        type: Array as PropType<Option[]>,
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
      values: {
        type: Array as PropType<Option[]>,
        default: () => ([]),
      },

      /**
       * Whether you can select multiple values or not
       */
      multiple: {
        type: Boolean,
        default: true,
      },

      /**
       * Identify the checkbox for proper work
       */
      checkboxIdPrefix: {
        type: String,
        default: 'checkbox-',
      },

      /**
       * Whether the select should be closed after the change or not
       */
      closeOnClick: {
        type: Boolean,
        default: false,
      },

      triggerClass: String,
      dropdownClass: String,
    },
    data () {
      return {
        vals: this.values,
      };
    },
    watch: {
      values (val) {
        this.vals = val;
      },
    },
    methods: {
      change (option: Option, val: Option, close: () => {}) {
        if (this.multiple) {
          let update;
          if (val) update = [...this.vals, option];
          else update = this.vals.filter((opt) => opt.slug !== option.slug);

          this.vals = update;
          this.$emit('change', update);
        } else
          if (val && (!this.vals[0] || option.slug !== this.vals[0].slug)) {
            this.vals = [option];
            this.$emit('change', [option]);
          }

        if (this.closeOnClick) close();
      },
    },
  });
</script>
