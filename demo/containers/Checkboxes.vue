<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Checkbox</h2>
    <IuiCheckbox name="cbx1" id="opt1" label="Hello">
      <span class="w-4 h-4 inline-block mr-6 rounded flex-no-shrink">
        <svg viewBox="0 0 12 10">
          <path d="M10 2L4.5 7.5L2 5" />
        </svg>
      </span>
      Hello
    </IuiCheckbox>

    <h2 class="text-xl mb-2">Checkbox group</h2>
    <IuiCheckboxGroup
      :options="options"
      :values="[options[0], options[2]]"
      :max-amount="3"
      group-name="radiogroup1"
    >
      <template #option="option">
        <span class="w-4 h-4 inline-block mr-6 rounded flex-no-shrink">
          <svg viewBox="0 0 12 10">
            <path d="M10 2L4.5 7.5L2 5" />
          </svg>
        </span>
        <span class="whitespace-no-wrap">{{ option.label }}</span>
      </template>
    </IuiCheckboxGroup>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {IuiCheckbox, IuiCheckboxGroup} from '@/main';

  export default Vue.extend({
    name: 'Checkboxes',
    components: {IuiCheckbox, IuiCheckboxGroup},
    data () {
      return {
        options: [
          {
            slug: 'opt1',
            label: 'Check 1',
          },
          {
            slug: 'opt2',
            label: 'Check 2',
          },
          {
            slug: 'opt3',
            label: 'Check 3',
          },
          {
            slug: 'opt4',
            label: 'Check 4',
          },
          {
            slug: 'opt5',
            label: 'Disabled',
            disabled: true,
          },
        ],
      };
    },
  });
</script>
