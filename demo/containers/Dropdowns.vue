Iui<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Simple dropdown</h2>
    <IuiDropdown>
      <template #trigger>
        <IuiButton is:primary>Tap on me</IuiButton>
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
    </IuiDropdown>

    <h2 class="text-xl mb-2 mt-4">On-hover dropdown</h2>
    <IuiDropdown open-on-hover transition="fade">
      <template #trigger>
        <IuiButton is:danger>Hover on me</IuiButton>
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
    </IuiDropdown>

    <h2 class="text-xl mb-2 mt-4">Auto-positioned dropdown</h2>
    <IuiDropdown position="auto" position-relative="section" transition="fade">
      <template #trigger>
        <IuiButton is:primary>Click me</IuiButton>
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
    </IuiDropdown>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {IuiDropdown, IuiButton} from '@/main';

  export default Vue.extend({
    name: 'Dropdowns',
    components: {IuiButton, IuiDropdown},
  });
</script>
