<template>
  <label :class="wrapperClasses">
    <input
      :id="id"
      type="checkbox"
      :name="name"
      :value="slug"
      :checked="checked"
      :class="inputClasses"
      :disabled="disabled"
      :required="required"
      @change="change"
    />
    <span :class="spanClasses">
      <slot>{
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import composeClasses from '@/lib/utils/compose-classes';
  import isProperties from '@/lib/utils/is-properties';

  export default Vue.extend({
    name: 'Checkbox',
    model: {
      prop: 'value',
      event: 'toggle',
    },
    props: {
      /**
       * HTML-input's name – required in order to properly group your checkboxes
       */
      name: {
        type: String,
        required: true,
      },

      /**
       * Control the value of the input
       */
      value: {
        type: Boolean,
        default: false,
      },

      /**
       * `id` and `slug` are needed for identification of the input, though optional
       */
      id: String,
      slug: String,

      /**
       * Text to pass as a label for the checkbox
       */
      label: String,

      /**
       * HTML-specified disabled and required attributes
       */
      disabled: Boolean,
      required: Boolean,

      /**
       * Dynamic classes for the rendered html-input and the label-span for it
       */
      inputClass: String,
      spanClass: String,
    },
    data () {
      return {
        checked: this.value,
      };
    },
    computed: {
      wrapperClasses (): string|null {
        const component = this.$iui.components.checkbox;
        return composeClasses(
          this.$iui.globalClass,
          component.class,
          isProperties(component.isProperties, this.$attrs),
          this.checked ? component.checkedClass : component.uncheckedClass,
          this.disabled ? component.disabledClass : '',
          this.required ? component.requiredClass : ''
        );
      },
      inputClasses (): string|null {
        const component = this.$iui.components.checkbox;
        return composeClasses(
          this.inputClass,
          component.inputClass
        );
      },
      spanClasses (): string|null {
        const component = this.$iui.components.checkbox;
        return composeClasses(
          this.spanClass,
          component.spanClass
        );
      },
    },
    watch: {
      value (val) {
        this.checked = val;
      },
    },
    methods: {
      change (event: {target: HTMLInputElement}) {
        this.checked = event.target.checked;
        this.$emit('toggle', event.target.checked, event);
      },
    },
  });
</script>
