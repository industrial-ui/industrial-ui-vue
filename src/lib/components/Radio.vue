<template>
  <label :class="wrapperClasses">
    <input
      :id="id"
      :name="name"
      v-model="checked"
      type="radio"
      :class="inputClasses"
      :disabled="disabled"
      :required="required"
      @change="change"
    />
    <slot>
      <span>{{ label }}</span>
    </slot>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import composeClasses from '@/lib/utils/compose-classes';

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
      label: String,

      value: {
        type: Boolean,
        default: false,
      },

      disabled: Boolean,
      required: Boolean,

      inputClass: String,
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
    },
    methods: {
      change ({target}: {target: HTMLInputElement}) {
        this.checked = target.checked;
        this.$emit('toggle', target.checked);
      },
    },
  });
</script>
