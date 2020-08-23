<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Simple dropdown</h2>
    <Dropdown>
      <template #trigger>
        <Button is:primary>Tap on me</Button>
      </template>
      <template #default="slotProps">
        <span
          v-for="text in ['Hello, there!', 'Do some action', 'Like dropdown?']"
          :key="text"
          class="hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap cursor-pointer"
          @click="slotProps.close()"
        >
          {{ text }}
        </span>
      </template>
    </Dropdown>

    <h2 class="text-xl mb-2">On-hover dropdown</h2>
    <Dropdown open-on-hover transition="fade">
      <template #trigger>
        <Button is:primary>Hover on me</Button>
      </template>
      <template>
        <span
          v-for="text in ['Hello, there!', 'Do some action', 'Like dropdown?']"
          :key="text"
          class="hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap cursor-pointer"
        >
          {{ text }}
        </span>
      </template>
    </Dropdown>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Dropdown from '@/lib/components/Dropdown.vue';
  import Button from '@/lib/components/Button.vue';

  export default Vue.extend({
    name: 'Dropdowns',
    components: {Button, Dropdown},
  });
</script>
