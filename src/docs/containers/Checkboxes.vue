<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Checkboxes</h2>
    <Checkbox id="opt1" label="Hello" />
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Checkbox from '../components/CustomCheckbox.vue';

  export default Vue.extend({
    name: 'Checkboxes',
    components: {Checkbox},
  });
</script>
