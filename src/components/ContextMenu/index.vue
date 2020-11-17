<template>
  <Transition
    :name="transitionName"
    v-bind="transitionProps"
    :transition-config="{transitions: $iui.config.transitions}"
  >
    <!--
      Next lines had some framework and DOM limitations to deal with:
      To get the width and height of the future ContextMenu, the display should be toggled
      with `visibility` property. But in such case, no `v-if` or `v-show` is used, so the
      transition can work if the :is property changed. That is why ContextMenu is a `figure`
    -->
    <component
      :is="val ? tag : 'figure'"
      ref="menu"
      :class="wrapperClasses"
      :style="{...styles, visibility: val ? 'visible' : 'hidden'}"
      v-click-outside="val ? close : () => null"
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
  import {AllowedPosition, DEFAULT_POSITION, getOptimalPosition} from '@/utils/check-position';

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

      /**
       * Position of the context-menu relative to the clicked point on the screen.
       * `auto` will calculate position and prevent context-menu to go out of the window borders
       */
      position: {
        type: String as PropType<AllowedPosition>,
        default: DEFAULT_POSITION,
        validator: (val: string) => [
          'bottom left',
          'bottom right',
          'top left',
          'top right',
          'auto', // Automatically calculate position to not go out of the borders
        ].includes(val),
      },

      /**
       * If position==='auto' and positionRelative=".selector", then it is displayed within
       * the provided element selector. If not specified – auto-positioned within the window object.
       */
      positionRelative: {
        type: String,
        default: null,
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
        event: null as MouseEvent|null,
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

      placement (): {x: string; y: string} {
        if (!this.val) return {x: '', y: ''};

        const component = this.$iui.config.components.contextMenu;
        if (this.fixedPosition) {
          const pos = this.fixedPosition === true ? component.fixedPosition : this.fixedPosition;
          return {
            x: pixelsOrString(pos.x),
            y: pixelsOrString(pos.y),
          };
        }

        const menu = this.$refs.menu as HTMLDivElement;
        if (!menu || typeof window === 'undefined') return {x: '', y: ''};

        const menuStyles = menu.getBoundingClientRect();
        const {pageX, pageY} = this.event || {pageX: 0, pageY: 0};
        const optimalPosition = getOptimalPosition(menu, {
          position: this.position as AllowedPosition,
          positionRelative: this.positionRelative,
        });
        const top = optimalPosition.indexOf('bottom') > -1 ? pageY - menuStyles.height : pageY;
        const left = optimalPosition.indexOf('right') > -1 ? pageX - menuStyles.width : pageX;
        return {
          x: pixelsOrString(left),
          y: pixelsOrString(top),
        };
      },

      styles () {
        const {x, y} = this.placement as {x: string; y: string};
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
        this.event = e;
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
