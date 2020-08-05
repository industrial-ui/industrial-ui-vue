<template>
  <div :class="wrapperClasses">
    <input
      :id="id"
      v-model="checked"
      :class="inputClasses"
      type="checkbox"
      @change="change"
    >
    <label :class="labelClasses" :for="id">
      <slot>
        {{ label }}
      </slot>
    </label>

    <div :class="customizerClasses">
      <slot name="customizer" />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import composeClasses from '@/lib/utils/compose-classes';

  export default Vue.extend({
    name: 'Checkbox',
    model: {
      prop: 'value',
      event: 'toggle',
    },
    props: {
      id: {
        type: String,
        required: true,
      },
      value: {
        type: Boolean,
        default: false,
      },
      label: String,
      inputClass: String,
      labelClass: String,
      customizerClass: String,
    },
    data () {
      return {
        checked: this.value,
      };
    },
    computed: {
      /**
       * Compose classes from the ui-configuration and dynamic properties
       * to pass to all elements of the checkbox: wpapper, input, label, customizer
       */
      wrapperClasses(): string | null {
        const component = this.$iui.components.checkbox;
        return composeClasses(
          component.class,
          this.checked ? component.checkedClass : component.uncheckedClass
        );
      },
      inputClasses (): string|null {
        const component = this.$iui.components.checkbox;
        return composeClasses(
          this.inputClass,
          component.inputClass,
          this.checked ? component.checkedInputClass : component.uncheckedInputClass
        );
      },
      labelClasses (): string|null {
        const component = this.$iui.components.checkbox;
        return composeClasses(
          this.labelClass,
          component.labelClass,
          this.checked ? component.checkedLabelClass : component.uncheckedLabelClass
        );
      },
      customizerClasses (): string|null {
        const component = this.$iui.components.checkbox;
        return composeClasses(
          this.customizerClass,
          component.customizerClass,
          this.checked ? component.checkedCustomizerClass : component.uncheckedCustomizerClass
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
