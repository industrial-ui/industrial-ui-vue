<template>
  <div
    v-show="isActive"
    :class="panelClasses"
  >
    <slot />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import composeClasses from '@/utils/compose-classes';

  export default Vue.extend({
    name: 'IuiTabPanel',
    props: {
      /**
       * Initial active flag for the Panel. After the mount, it will become useless,
       * because the panel is synchronized with the Tabs
       */
      active: {
        type: Boolean,
        default: false,
      },

      /**
       * The label (name) of the tab – unique identifier. If not provided as a prop,
       * the Tabs will give it after the mount
       */
      label: String,

      disabled: Boolean,
      removable: Boolean,
    },
    data () {
      return {
        updater: null,
        mountedLabel: null as string|null,
        val: null as string|null,
      };
    },
    watch: {
      /**
       * Watch for the parent's data change and update the panel's data
       */
      updater () {
        const parent = this.$parent as unknown as {value?: string; active?: string};
        if (parent.value) this.val = parent.value;
        else this.val = parent.active ?? null;
      },
    },
    computed: {
      /**
       * Synchronize the TabPanel with Tabs component
       */
      isActive (): boolean {
        // Return initial active value on SSR and while labels from parent are not mounted
        if (typeof window === 'undefined' || (!this.label && !this.mountedLabel)) return this.active;

        if (this.$parent.$options.name !== 'Tabs') throw new Error('TabPanel cannot exist outside the Tabs component');

        if (this.val === null) return this.active;

        return this.mountedLabel ? (this.mountedLabel === this.val) : (this.label === this.val);
      },
      panelClasses (): string|null {
        const component = this.$iui.config.components.tabs;
        return composeClasses(
          component.panelClass,
          this.isActive ? component.activePanelClass : component.inactivePanelClass
        );
      },
    },
  });
</script>
