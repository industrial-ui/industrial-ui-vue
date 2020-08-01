<template>
  <div
    :id="id"
    v-click-outside="close"
    :class="wrapperClasses"
    @mouseenter="onHover(true)"
    @mouseleave="onHover(false)"
    @touchstart="onHover(true)"
    @touchend="onHover(false)"
  >
    <div
      :class="triggerClasses"
      tabindex="0"
      @click="toggle"
    >
      <slot
        name="trigger"
        :open="open"
        :close="close"
        :value="val"
      />
    </div>
    <div v-check-position="{position, positionRelative}" :class="dropdownClasses">
      <slot :open="open" :close="close" :value="val" />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import ClickOutside from 'vue-click-outside';
  import checkPosition from '@/lib/utils/check-position';
  import composeClasses from '@/lib/utils/compose-classes';

  export default Vue.extend({
    name: 'Dropdown',
    directives: { ClickOutside, checkPosition },
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      /**
       * Control open/close of the dropdown
       */
      value: {
        type: Boolean,
        default: false,
      },

      /**
       * Should the dropdown be opened when the trigger is hovered
       */
      openOnHover: {
        type: Boolean,
        default: false,
      },

      /**
       * Dropdown's id
       */
      id: {
        type: String,
        default: '',
      },

      /**
       * Pass a dynamic class to the trigger element
       */
      triggerClass: {
        type: String,
        default: '',
      },

      /**
       * Pass a dynamic class to the dropdown element
       */
      dropdownClass: {
        type: String,
        default: '',
      },

      /**
       * Position of the dropdown relative to the trigger element.
       * `auto` will calculate position and prevent dropdown to go out of the parent borders
       */
      position: {
        type: String,
        default: null,
        validator: (val: string) => [
          'bottom left',
          'bottom right',
          'top left',
          'top right',
          'auto', // Automatically calculate position to not go out of the borders
          'auto relative', // See positionRelative
        ].includes(val),
      },

      /**
       * If position==='auto relative', then it is calculated relatively to the parent.
       * This prop is a query selector of such a parent.
       */
      positionRelative: {
        type: String,
        default: null,
      },
    },
    data () {
      return {
        val: this.value,
      };
    },
    computed: {
      /**
       * Compose classes from the ui-configuration and dynamic properties
       * to pass to wrapper, trigger or dropdown
       */
      wrapperClasses (): string|null {
        const component = this.$iui.components.dropdown;
        return composeClasses(
          component.class, this.val ? component.openClass : component.closeClass
        );
      },
      triggerClasses (): string|null {
        const component = this.$iui.components.dropdown;
        return composeClasses(
          this.triggerClass,
          component.triggerClass,
          this.val ? component.openTriggerClass : component.closeTriggerClass
        );
      },
      dropdownClasses (): string|null {
        const component = this.$iui.components.dropdown;
        return composeClasses(
          this.dropdownClass,
          component.dropdownClass,
          this.val ? component.openDropdownClass : component.closeDropdownClass
        );
      },
    },
    watch: {
      value (val) {
        this.val = val;
      },
    },
    methods: {
      open () {
        this.val = true;
        this.$emit('close');
        this.$emit('change', true);
      },
      close () {
        this.val = false;
        this.$emit('close');
        this.$emit('change', false);
      },
      toggle () {
        if (this.val) this.close();
        else this.open();
      },
      onHover (val: boolean) {
        // TODO: add mobile touch screen property (probably in the config)
        if (window.matchMedia('(max-width: 1023px)').matches) return;
        if (!this.openOnHover) return;

        if (!val) this.close();
        else this.open();
      },
    },
  });
</script>
