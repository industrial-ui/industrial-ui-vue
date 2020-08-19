<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Tabs</h2>
    <Tabs :options="[{label: 'Good morning'}, {label: 'World'}]">
      <TabPanel />
      <TabPanel />
    </Tabs>
    <Tabs>
      <TabPanel label="Tab1" disabled />
      <TabPanel label="Tab2" :disabled="false" />
    </Tabs>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tabs from '@/lib/components/Tabs.vue';
  import TabPanel from '@/lib/components/TabPanel.vue';

  export default Vue.extend({
    name: 'TabsContainer',
    components: {Tabs, TabPanel},
  });
</script>
