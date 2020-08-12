<template>
  <Dropdown v-bind="dropdownProps">
    <template #trigger="slotProps">
      <slot name="trigger" v-bind="slotProps" />
    </template>

    <template v-slot:default="slotProps">
      <div
        v-for="option in options"
        :key="checkboxIdPrefix + option.slug"
        ref="options"
        @change="changeScoped"
      >
        <!--
          You can add your own checkbox or radio button,
          but for the best experience,
          there should be an input inside of it
        -->
        <slot name="option" v-bind:option="option">
          <template v-if="multiple">
            <Checkbox
              :id="checkboxIdPrefix + option.slug"
              :label="option.text"
              :value="vals.some(val => val.slug === option.slug)"
              v-bind="checkboxProps"
              @toggle="val => change(option, val, slotProps.close)"
            />
          </template>
        </slot>
      </div>
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
  import {Option} from '@/lib/types';
  import Dropdown from '@/lib/components/Dropdown.vue';
  import Checkbox from '@/lib/components/Checkbox.vue';

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

      dropdownProps: Object,
      checkboxProps: Object,
    },
    data () {
      return {
        vals: this.values,
      };
    },
    watch: {
      values (val) {
        this.vals = val;
        this.updateCheckboxes();
      },
    },
    mounted () {
      this.updateCheckboxes();
    },
    methods: {
      change (option: Option, val: boolean, close: (() => {})|null) {
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

        if (this.closeOnClick && close) close();
      },

      // Special bubbles-handler of the scoped change event
      changeScoped ({target}: {target: HTMLInputElement}) {
        if (this.$scopedSlots.option) {
          const matcher = new RegExp(`${this.checkboxIdPrefix}(.+)`);
          const match = target.id.match(matcher);
          if (match?.[1]) {
            const val = this.options.find((opt: Option) => opt.slug === match[1]);
            if (val) this.change(val, target.checked, null);
          }
        }
      },

      // Manually check all the checkboxes in the scoped slot
      updateCheckboxes () {
        if (this.$scopedSlots.option && this.vals?.length) {
          const options = this.$refs.options as HTMLInputElement[];
          options.forEach((opt) => {
            const input = opt.querySelector('input');
            if (input) input.checked = !!this.vals
              .some((val) => input.id === this.checkboxIdPrefix + val.slug);
          });
        }
      },
    },
  });
</script>
