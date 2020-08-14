<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Checkbox</h2>
    <Checkbox name="cbx1" id="opt1" label="Hello">
      <span class="w-4 h-4 inline-block mr-6 rounded flex-no-shrink">
        <svg viewBox="0 0 12 10">
          <path d="M10 2L4.5 7.5L2 5" />
        </svg>
      </span>
      Hello
    </Checkbox>

    <h2 class="text-xl mb-2">Checkbox group</h2>
    <CheckboxGroup
      :options="options"
      :values="[options[0], options[2]]"
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
    </CheckboxGroup>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Checkbox from '@/lib/components/Checkbox.vue';
  import CheckboxGroup from '@/lib/components/CheckboxGroup.vue';

  export default Vue.extend({
    name: 'Checkboxes',
    components: {Checkbox, CheckboxGroup},
    data () {
      return {
        options: [
          {
            slug: 'opt1',
            label: 'Radio 1',
          },
          {
            slug: 'opt2',
            label: 'Radio 2',
          },
          {
            slug: 'opt3',
            label: 'Radio 3',
          },
          {
            slug: 'opt4',
            label: 'Radio 4',
            disabled: true,
          },
        ],
      };
    },
  });
</script>
