<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Tabs</h2>
    <!-- SSR example -->
    <Tabs :options="[{label: 'Good morning', active: true}, {label: 'World'}]">
      <TabPanel class="mb1" active>
        <h1>SSR tab 1</h1>
      </TabPanel>
      <TabPanel>
        <h1>SSR tab 2</h1>
      </TabPanel>
    </Tabs>

    <!-- SPA example -->
    <Tabs v-model="act" class="mt-8">
      <TabPanel label="Tab1" disabled>
        <h1>Tab #1</h1>
      </TabPanel>
      <TabPanel label="Tab2">
        <h1>Tab #2</h1>
      </TabPanel>
      <TabPanel label="Tab3">
        <h1>Tab #3</h1>
      </TabPanel>
      <TabPanel label="Tab4">
        <h1>Tab #4</h1>
      </TabPanel>
    </Tabs>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tabs from '@/components/Tabs';
  import TabPanel from '@/components/Tabs/Panel';

  export default Vue.extend({
    name: 'TabsContainer',
    components: {Tabs, TabPanel},
    data () {
      // TODO: fix changing tabs manually
      return {
        act: 'Tab2',
      };
    },
  });
</script>
