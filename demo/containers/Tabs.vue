<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Tabs</h2>
    <!-- SSR example -->
    <IuiTabs :options="[{label: 'Good morning', active: true}, {label: 'World'}]">
      <IuiTabPanel class="mb1" active>
        <h1>SSR tab 1</h1>
      </IuiTabPanel>
      <IuiTabPanel>
        <h1>SSR tab 2</h1>
      </IuiTabPanel>
    </IuiTabs>

    <!-- SPA example -->
    <IuiTabs v-model="act" class="mt-8">
      <IuiTabPanel label="Tab1" disabled>
        <h1>Tab #1</h1>
      </IuiTabPanel>
      <IuiTabPanel label="Tab2">
        <h1>Tab #2</h1>
      </IuiTabPanel>
      <IuiTabPanel label="Tab3">
        <h1>Tab #3</h1>
      </IuiTabPanel>
      <IuiTabPanel label="Tab4">
        <h1>Tab #4</h1>
      </IuiTabPanel>
    </IuiTabs>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import IuiTabs from '@/components/Tabs';
  import IuiTabPanel from '@/components/Tabs/Panel';

  export default Vue.extend({
    name: 'TabsContainer',
    components: {IuiTabs, IuiTabPanel},
    data () {
      // TODO: fix changing tabs manually
      return {
        act: 'Tab2',
      };
    },
  });
</script>
