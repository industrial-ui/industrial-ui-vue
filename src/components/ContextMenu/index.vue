<template>
  <Transition
    :name="transitionName"
    v-bind="transitionProps"
    :transition-config="{transitions: $iui.config.transitions}"
  >
    <component
      v-show="val"
      :is="tag"
      :class="wrapperClasses"
      :style="styles"
      v-click-outside="val ? close : () => null"
      ref="element"
    >
      <slot :open="open" :close="close" :value="val" />
    </component>
  </Transition>
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue';
  import ClickOutside from 'vue-click-outside';
  import composeClasses from '@/utils/compose-classes';
  import isProperties from '@/utils/is-properties';
  import Transition from '@/components/Transition/index.vue';
  import {TransitionOptions} from '@/types/transitions';

  const pixelsOrString = (data: number|string): string => {
    if (typeof data === 'number') return `${data}px`;
    return data;
  };

  export default Vue.extend({
    name: 'ContextMenu',
    components: { Transition },
    directives: { ClickOutside },
    model: {
      prop: 'value',
      event: 'change',
    },

    props: {
      /** Control open/close of the dropdown */
      value: {
        type: Boolean,
        default: false,
      },

      /** Which tag is to be rendered as a wrapper element */
      tag: {
        type: String,
        default: 'div',
      },

      /**
       * If the position of context menu is fixed, then you are not required to
       * open it explicitly with $refs.contextMenu.open($event). Instead, just do:
       * <context-menu v-mod{}el="open" :fixed-position="{x: 10, y: 10}" />
       * */
      fixedPosition: {
        type: [Object, Boolean] as PropType<({ x: number|string; y: number|string })|boolean>,
        default: false,
      },

      disabled: {
        type: Boolean,
        default: false,
      },

      /** Customize transition of context-menu opening. */
      transition: String,
      transitionProps: Object as PropType<TransitionOptions>,
    },

    data () {
      return {
        val: this.value,
        clickOpener: false,
      };
    },

    computed: {
      /**
       * Compose classes from the ui-configuration and dynamic properties
       * to pass to the wrapper
       */
      wrapperClasses (): string|null {
        const component = this.$iui.config.components.contextMenu;
        return composeClasses(
          this.$iui.config.globalClass,
          component.class,
          isProperties(component.isProperties, this.$attrs),
          this.val ? component.openClass : component.closeClass
        );
      },

      transitionName (): string | null {
        const component = this.$iui.config.components.contextMenu;
        return this.transition || component.transition || null;
      },

      position (): {x: string; y: string} {
        const component = this.$iui.config.components.contextMenu;
        if (this.fixedPosition) {
          const pos = this.fixedPosition === true ? component.fixedPosition : this.fixedPosition;
          return {
            x: pixelsOrString(pos.x),
            y: pixelsOrString(pos.y),
          };
        }

        return {
          x: '10px',
          y: '10px',
        };
      },

      styles () {
        const {x, y} = this.position as {x: string; y: string};
        return {
          position: 'fixed',
          top: y,
          left: x,
        };
      },
    },

    watch: {
      value (val) {
        this.val = val;
      },
    },

    methods: {
      open (e?: MouseEvent) {
        if (!e || !e.type || !e.pageX || !e.pageY) {
          throw new Error('Please, consider opening the ContextMenu with $refs.contextMenu.open($event)');
        }
        if (this.disabled) return;

        e.preventDefault();
        if (e.type === 'click') this.clickOpener = true;

        this.val = true;
        this.$emit('close');
        this.$emit('change', true);
      },
      close () {
        if (this.clickOpener) {
          this.clickOpener = false;
          return;
        }

        this.val = false;
        this.$emit('close');
        this.$emit('change', false);
      },
      toggle (e?: MouseEvent) {
        if (this.val) this.close();
        else this.open(e);
      },
    },
  });
</script>
