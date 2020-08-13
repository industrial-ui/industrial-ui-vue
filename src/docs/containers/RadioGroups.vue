<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Radio group</h2>
    <RadioGroup :options="options" :value="options[0]" group-name="radiogroup1">
      <template #option="option">
        <span class="w-6 h-6 inline-block mr-2 rounded-full border border-grey flex-no-shrink" />
        {{ option.label }}
      </template>
    </RadioGroup>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import RadioGroup from '@/lib/components/RadioGroup.vue';

  export default Vue.extend({
    name: 'Radios',
    components: {RadioGroup},
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
            disabled: true,
          },
        ],
      };
    },
  });
</script>
