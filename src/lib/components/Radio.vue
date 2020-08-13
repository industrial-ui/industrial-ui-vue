<template>
  <label :class="wrapperClasses">
    <input
      :id="id"
      type="radio"
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
    name: 'radio',
    model: {
      prop: 'value',
      event: 'toggle',
    },
    props: {
      name: {
        type: String,
        required: true,
      },
      id: String,
      slug: String,
      label: String,

      value: {
        type: Boolean,
        default: false,
      },

      disabled: Boolean,
      required: Boolean,

      inputClass: String,
      spanClass: String,
    },
    data () {
      return {
        checked: this.value,
      };
    },
    computed: {
      /**
       * Compose classes from the ui-configuration and dynamic properties
       * to pass to all elements of the checkbox: wrapper, input, label, customizer
       */
      wrapperClasses (): string | null {
        const component = this.$iui.components.radio;
        return composeClasses(
          component.class,
          isProperties(component.isProperties, this.$attrs),
          this.checked ? component.checkedClass : component.uncheckedClass,
          this.disabled ? component.disabledClass : '',
          this.required ? component.requiredClass : ''
        );
      },
      inputClasses (): string|null {
        const component = this.$iui.components.radio;
        return composeClasses(
          this.inputClass,
          component.inputClass
        );
      },
      spanClasses (): string|null {
        const component = this.$iui.components.radio;
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
      change ({target}: {target: HTMLInputElement}) {
        this.checked = target.checked;
        this.$emit('toggle', target.checked);
      },
    },
  });
</script>
