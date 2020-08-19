<template>
  <div>
    <component :is="navTag">
      <template v-if="options.length || mountedOptions.length">
        <component
          v-for="option in (mountedOptions.length ? mountedOptions : options)"
          :key="option.label"
          :is="tabTag"
        >
          {{ option.label }}
        </component>
      </template>
    </component>
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue';

  type TabPanelProps = { label: string; disabled?: boolean|string; removable?: boolean|string };

  export default Vue.extend({
    name: 'Tabs',
    props: {
      options: {
        type: Array as PropType<TabPanelProps[]>,
        default: () => ([]),
      },

      isList: {
        type: Boolean,
        default: false,
      },

      navClass: String,
      tabClass: String,
    },
    data () {
      return {
        mountedOptions: [] as TabPanelProps[],
      };
    },
    computed: {
      navTag (): string {
        return this.isList ? 'ul' : 'nav';
      },
      tabTag (): string {
        return this.isList ? 'li' : 'div';
      },
    },
    mounted () {
      const tabpanels = this.$slots.default?.filter((panel) => panel.componentOptions?.tag === 'TabPanel') || [];
      if (this.options.length) {
        // If options prop is passed to Tabs, check for the proper amount of TabPanels
        if (tabpanels.length !== this.options.length) throw new Error(
          'Amount of objects passed to "options" prop of Tabs component must be equal to amount of TabPanels'
        );
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
  });
</script>
