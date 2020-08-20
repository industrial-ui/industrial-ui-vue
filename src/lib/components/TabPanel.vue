<template>
  <div
    v-show="isActive"
    :class="panelClasses"
  >
    <h2>Hey</h2>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import composeClasses from '@/lib/utils/compose-classes';

  export default Vue.extend({
    name: 'TabPanel',
    props: {
      active: {
        type: Boolean,
        default: false,
      },

      label: String,
      disabled: Boolean,
      removable: Boolean,
    },
    data () {
      return {
        mountedLabel: null as string|null,
      };
    },
    computed: {
      isActive (): boolean {
        // Return initial active value on SSR and while labels from parent are not mounted
        if (typeof window === 'undefined' || (!this.label && !this.mountedLabel)) return this.active;

        if (this.$parent.$options.name !== 'Tabs') throw new Error('TabPanel cannot exist outside the Tabs component');

        const parent = (this.$parent as unknown as {value?: string; active?: string});

        let val;
        if (parent?.value) val = parent.value;
        else val = parent.active ?? null;

        // This means that on initial load active label is not ready in the Tabs parent
        // TODO: handle such behavior, because initially no tabs will be chosen
        if (val === null) return false;

        return this.mountedLabel ? (this.mountedLabel === val) : (this.label === val);
      },
      panelClasses (): string|null {
        const component = this.$iui.components.tabs;
        return composeClasses(
          component.panelClass,
          this.isActive ? component.activePanelClass : component.inactivePanelClass
        );
      },
    },
  });
</script>
