<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Dropdown multiselect</h2>
    <!--<DropdownSelect
      v-model="values1"
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
        <Button is:primary>Open select</Button>
      </template>
    </DropdownSelect>

    <DropdownSelect
      v-model="values1"
      :options="options1"
      :dropdown-props="{
        dropdownClass: 'w-full mt-4 py-1'
      }"
      checkbox-id-prefix="dd-select-cb2-"
    >
      <template #trigger>
        <Button is:danger>Open select</Button>
      </template>
      <template #option="{option}">
        <Checkbox
          name="dd-cbx-2"
          :key="'dd-select-cb2-' + option.slug"
          :id="'dd-select-cb2-' + option.slug"
          :label="option.text"
        />
      </template>
    </DropdownSelect>-->
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import DropdownSelect from '@/lib/components/DropdownSelect.vue';
  import Button from '@/lib/components/Button.vue';
  import Checkbox from '@/lib/components/Checkbox.vue';

  export default Vue.extend({
    name: 'Dropdowns',
    components: {
      Button,
      DropdownSelect,
      Checkbox,
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
        values1: [{
          slug: 'two',
          text: 'Two',
        }],
      };
    },
  });
</script>
