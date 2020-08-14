<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Checkboxes</h2>
    <Checkbox name="cbx1" id="opt1" label="Hello">
      <span class="w-4 h-4 inline-block mr-6 rounded flex-no-shrink">
        <svg viewBox="0 0 12 10">
          <path d="M10 2L4.5 7.5L2 5" />
        </svg>
      </span>
      Hello
    </Checkbox>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Checkbox from '@/lib/components/Checkbox.vue';

  export default Vue.extend({
    name: 'Checkboxes',
    components: {Checkbox},
  });
</script>
