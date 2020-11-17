<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Dropdown select</h2>
    <DropdownSelect
      v-model="values"
      :options="options1"
      group-name="dd-select-1"
      :dropdown-props="{dropdownClass: 'mt-2 w-full'}"
    >
      <template #trigger>
        <Button is:primary>Open multiselect</Button>
      </template>
      <template #option="option">
        <span class="w-4 h-4 inline-block mr-6 rounded flex-no-shrink">
          <svg viewBox="0 0 12 10">
            <path d="M10 2L4.5 7.5L2 5" />
          </svg>
        </span>
        <span class="whitespace-no-wrap">{{ option.label }}</span>
      </template>
    </DropdownSelect>

    <br>

    <DropdownSelect
      v-model="value"
      :options="options1"
      :multiple="false"
      close-on-click
      group-name="dd-select-2"
      class="mt-4"
      :dropdown-props="{dropdownClass: 'mt-2 w-full p-2'}"
    >
      <template #trigger>
        <Button is:danger>Open radio select</Button>
      </template>
      <template #option="option">
        <span class="w-6 h-6 inline-block mr-2 rounded-full border border-grey flex-no-shrink" />
        {{ option.label }}
      </template>
    </DropdownSelect>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import DropdownSelect from '@/components/DropdownSelect';
  import Button from '@/components/Button';

  export default Vue.extend({
    name: 'Dropdowns',
    components: {
      Button,
      DropdownSelect,
    },
    data () {
      return {
        options1: [
          {
            slug: 'opt1',
            label: 'Option 1',
          },
          {
            slug: 'opt2',
            label: 'Option 2',
          },
          {
            slug: 'opt3',
            label: 'Option 3',
          },
          {
            slug: 'opt4',
            label: 'Option 4',
          },
        ],
        values: [{
          slug: 'opt1',
          label: 'Option 1',
        }],
        value: {
          slug: 'opt1',
          label: 'Option 1',
        },
      };
    },
  });
</script>
