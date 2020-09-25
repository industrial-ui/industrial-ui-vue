<template>
  <div :class="wrapperClasses">
    <component :is="navTag" :class="navClasses">
      <template v-if="options.length || mountedOptions.length">
        <component
          v-for="option in (mountedOptions.length ? mountedOptions : options)"
          :key="option.label"
          :is="tabTag"
          :class="getTabClass(option)"
          @click="change(option)"
        >
          {{ option.label }}
        </component>
      </template>
    </component>
    <div :class="panelsWrapperClasses">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue, {PropType, VNode} from 'vue';
  import composeClasses from '@/lib/utils/compose-classes';
  import isProperties from '@/lib/utils/is-properties';
  // import Transition from '@/lib/components/Transition.vue';
  import {TransitionOptions} from '@/lib/types/transitions';

  type TabPanelProps = {
    label: string,
    disabled?: boolean|string,
    removable?: boolean|string,
    active?: boolean|string,
  };

  interface TabPanelInstance extends Vue {
    mountedLabel?: string,
    updater?: number,
  }

  interface TabPanel extends VNode {
    componentInstance: TabPanelInstance,
  }

  /**
   * Component is working but still unstable. Needs more
   * tests and thoughts about the implementation
   */

  export default Vue.extend({
    name: 'Tabs',
    // components: {Transition},
    model: {
      prop: 'active',
      event: 'change',
    },
    props: {
      /**
       * Array of TabPanelProps with required `label` inside
       */
      options: {
        type: Array as PropType<TabPanelProps[]>,
        default: () => ([]),
      },

      /**
       * Active tab's label
       */
      active: {
        type: String,
        default: null,
      },

      /**
       * Whether to display the tab as nav->div or ul->li
       */
      isList: {
        type: Boolean,
        default: false,
      },

      /**
       * Dynamic classes for navigation, tab and panel elements
       */
      navClass: String,
      tabClass: String,
      panelsWrapperClass: String,

      /**
       * Customize transition of dropdown opening.
       * Read more about it on the special page in documentation
       */
      transition: String,
      transitionProps: Object as PropType<TransitionOptions>,
    },
    data () {
      return {
        val: this.active,
        mountedOptions: [] as TabPanelProps[],
        panels: [] as TabPanel[],
      };
    },
    computed: {
      value: {
        get (): string|null {
          if (this.val) return this.val;
          if (this.options.length) return this.options[0]?.label;
          if (this.mountedOptions.length) return this.mountedOptions[0]?.label;
          return null;
        },
        set (val: string) {
          this.val = val;
          this.panels.forEach((panel) => {
            panel.componentInstance.updater = Date.now();
          });
        },
      },
      navTag (): string {
        return this.isList ? 'ul' : 'nav';
      },
      tabTag (): string {
        return this.isList ? 'li' : 'div';
      },

      wrapperClasses (): string|null {
        const component = this.$iui.config.components.tabs;
        return composeClasses(
          this.$iui.config.globalClass,
          component.class,
          isProperties(component.isProperties, this.$attrs)
        );
      },
      navClasses (): string|null {
        const component = this.$iui.config.components.tabs;
        return composeClasses(
          this.navClass,
          component.navClass
        );
      },
      panelsWrapperClasses (): string|null {
        const component = this.$iui.config.components.tabs;
        return composeClasses(
          this.panelsWrapperClass,
          component.panelsWrapperClass
        );
      },

      // transitionName (): string | null {
      //   const component = this.$iui.config.components.tabs;
      //   return this.transition || component.transition || null;
      // },
    },
    watch: {
      active (val) {
        if (this.value !== val) this.value = val;
      },
    },
    mounted () {
      /**
       * Depending on the type of rendering: SPA|SSR, we need to work with tabs differently.
       * In any case, weird two-way data passing is used, which should be at least refactored.w
       */

      const tabpanels = this.$slots.default?.filter((panel) => panel.componentOptions?.tag === 'TabPanel') as TabPanel[] || [];
      this.panels = tabpanels;

      if (this.options.length) {
        // If options prop is passed to Tabs, check for the proper amount of TabPanels
        if (tabpanels.length !== this.options.length) throw new Error(
          'Amount of objects passed to "options" prop of Tabs component must be equal to amount of TabPanels'
        );

        // Pass labels from Tabs to TabPanel
        tabpanels.forEach((panel, i) => {
          panel.componentInstance.mountedLabel = this.options[i]?.label;
        });
      } else {
        // If no prop options found, populate it with
        // ssr-incompatible data from <TabPanel> component
        const options: TabPanelProps[] = [];
        tabpanels.forEach((panel) => {
          if (panel.componentOptions?.tag === 'TabPanel') {
            const props: Partial<TabPanelProps>|null = panel.componentOptions.propsData || null;
            if (!props || !props?.label) throw new Error(
              'If "options" prop is not specified on Tabs component, TabPanel must have a label attribute'
            );
            else options.push({
              label: props.label,
              disabled: !!(props?.disabled === '' || props?.disabled),
              removable: !!(props?.removable === '' || props?.removable),
              active: !!(props?.active === '' || props?.active),
            });

            panel.componentInstance.updater = Date.now();
          }
        });

        this.mountedOptions = options;
      }
    },
    methods: {
      getTabClass (option: TabPanelProps): string|null {
        const component = this.$iui.config.components.tabs;
        return composeClasses(
          this.tabClass,
          component.tabClass,
          option.disabled ? component.disabledTabClass : '',
          option.removable ? component.removableTabClass : '',
          option.label === this.value ? component.activeTabClass : component.inactiveTabClass
        );
      },

      change (option: TabPanelProps) {
        if (option.disabled) return;

        this.value = option.label;
        this.$emit('change', option.label);
      },
    },
  });
</script>
