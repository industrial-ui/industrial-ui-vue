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
        updater: null,
        mountedLabel: null as string|null,
        val: null as string|null,
      };
    },
    watch: {
      updater () {
        const parent = this.$parent as unknown as {value?: string; active?: string};
        if (parent.value) this.val = parent.value;
        else this.val = parent.active ?? null;
      },
    },
    computed: {
      isActive (): boolean {
        // Return initial active value on SSR and while labels from parent are not mounted
        if (typeof window === 'undefined' || (!this.label && !this.mountedLabel)) return this.active;

        if (this.$parent.$options.name !== 'Tabs') throw new Error('TabPanel cannot exist outside the Tabs component');

        if (this.val === null) return this.active;

        return this.mountedLabel ? (this.mountedLabel === this.val) : (this.label === this.val);
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
