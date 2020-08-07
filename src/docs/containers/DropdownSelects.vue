<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Dropdown multiselect</h2>
    <DropdownSelect
      :options="options1"
      :dropdown-props="{
        dropdownClass: 'w-full mt-4 py-1'
      }"
      :checkbox-props="{
        class: 'py-1 px-2 border-t hover:bg-gray-200 cursor-pointer',
        checkedClass: 'bg-gray-300',
        inputClass: 'hidden'
      }"
      checkbox-id-prefix="dd-select-cb1-"
    >
      <template #trigger>
        <Button>Open select</Button>
      </template>
    </DropdownSelect>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import DropdownSelect from '@/lib/components/DropdownSelect.vue';
  import Button from '@/lib/components/Button.vue';

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
            slug: 'one',
            text: 'One',
          },
          {
            slug: 'two',
            text: 'Two',
          },
          {
            slug: 'three',
            text: 'Three',
          },
        ],
      };
    },
  });
</script>
