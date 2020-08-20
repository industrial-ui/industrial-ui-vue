<template>
  <div :class="wrapperClasses">
    <component :is="navTag" :class="navClasses">
      <template v-if="options.length || mountedOptions.length">
        <component
          v-for="option in (mountedOptions.length ? mountedOptions : options)"
          :key="option.label"
          :is="tabTag"
          :class="getTabClass(option.label)"
        >
          {{ option.label }}
        </component>
      </template>
    </component>
    <div :class="panelsWrapperClasses">
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue';
  import composeClasses from '@/lib/utils/compose-classes';
  import isProperties from '@/lib/utils/is-properties';
  // import Transition from '@/lib/components/Transition.vue';
  import {TransitionOptions} from '@/lib/types';

  type TabPanelProps = { label: string; disabled?: boolean|string; removable?: boolean|string };

  export default Vue.extend({
    name: 'Tabs',
    // components: {Transition},
    model: {
      prop: 'active',
      event: 'change',
    },
    props: {
      options: {
        type: Array as PropType<TabPanelProps[]>,
        default: () => ([]),
      },

      active: {
        type: String,
        default: null,
      },

      isList: {
        type: Boolean,
        default: false,
      },

      navClass: String,
      tabClass: String,
      panelsWrapperClass: String,

      transition: String,
      transitionOptions: Object as PropType<TransitionOptions>,
    },
    data () {
      return {
        val: this.active,
        mountedOptions: [] as TabPanelProps[],
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
        },
      },
      navTag (): string {
        return this.isList ? 'ul' : 'nav';
      },
      tabTag (): string {
        return this.isList ? 'li' : 'div';
      },

      wrapperClasses (): string|null {
        const component = this.$iui.components.tabs;
        return composeClasses(
          component.class,
          isProperties(component.isProperties, this.$attrs)
        );
      },
      navClasses (): string|null {
        const component = this.$iui.components.tabs;
        return composeClasses(
          this.navClass,
          component.navClass
        );
      },
      panelsWrapperClasses (): string|null {
        const component = this.$iui.components.tabs;
        return composeClasses(
          this.panelsWrapperClass,
          component.panelsWrapperClass
        );
      },

      // transitionName (): string | null {
      //   const component = this.$iui.components.tabs;
      //   return this.transition || component.transition || null;
      // },
    },
    watch: {
      active (val) {
        if (this.val !== val) this.val = val;
      },
    },
    mounted () {
      const tabpanels = this.$slots.default?.filter((panel) => panel.componentOptions?.tag === 'TabPanel') || [];
      if (this.options.length) {
        // If options prop is passed to Tabs, check for the proper amount of TabPanels
        if (tabpanels.length !== this.options.length) throw new Error(
          'Amount of objects passed to "options" prop of Tabs component must be equal to amount of TabPanels'
        );

        // Pass labels from Tabs to TabPanel
        tabpanels.forEach((panel, i) => {
          (panel.componentInstance as unknown as {mountedLabel: string|null})
            .mountedLabel = this.options[i]?.label;
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
            });
          }
        });

        this.mountedOptions = options;
      }
    },
    methods: {
      getTabClass (label: string): string|null {
        const component = this.$iui.components.tabs;
        return composeClasses(
          this.tabClass,
          label === this.val ? component.activeTabClass : component.inactiveTabClass
        );
      },
    },
  });
</script>
