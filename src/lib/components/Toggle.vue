<template>
  <label :class="wrapperClasses">
    <span :class="leftLabelClasses">
      <slot name="left-label">
        {{ labelLeft }}
      </slot>
    </span>

    <input
      :id="id"
      type="checkbox"
      :name="name"
      :checked="checked"
      :class="inputClasses"
      :disabled="disabled"
      @change="change"
    />
    <span :class="toggleBaseClasses">
      <slot></slot>
    </span>

    <span :class="rightLabelClasses">
      <slot name="right-label">
        {{ labelRight }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import composeClasses from '@/lib/utils/compose-classes';
  import isProperties from '@/lib/utils/is-properties';

  export default Vue.extend({
    name: 'Toggle',
    model: {
      prop: 'value',
      event: 'toggle',
    },
    props: {
      id: String,
      name: String,

      value: {
        type: Boolean,
        default: false,
      },

      disabled: {
        type: Boolean,
        default: false,
      },

      labelLeft: String,
      labelRight: String,

      inputClass: String,
      baseClass: String,
      leftLabelClass: String,
      rightLabelClass: String,
    },
    data () {
      return {
        checked: this.value,
      };
    },
    computed: {
      wrapperClasses (): string | null {
        const component = this.$iui.components.toggle;
        return composeClasses(
          this.$iui.globalClass,
          component.class,
          isProperties(component.isProperties, this.$attrs),
          this.checked ? component.checkedClass : component.uncheckedClass,
          this.disabled ? component.disabledClass : ''
        );
      },
      toggleBaseClasses (): string | null {
        const component = this.$iui.components.toggle;
        return composeClasses(
          this.baseClass,
          component.baseClass
        );
      },
      inputClasses (): string|null {
        const component = this.$iui.components.toggle;
        return composeClasses(
          this.inputClass,
          component.inputClass
        );
      },
      leftLabelClasses (): string|null {
        const component = this.$iui.components.toggle;
        return composeClasses(
          this.leftLabelClass,
          component.labelClass,
          component.leftLabelClass
        );
      },
      rightLabelClasses (): string|null {
        const component = this.$iui.components.toggle;
        return composeClasses(
          this.rightLabelClass,
          component.labelClass,
          component.rightLabelClass
        );
      },
    },
    watch: {
      value (val) {
        if (this.checked !== val) this.checked = val;
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
