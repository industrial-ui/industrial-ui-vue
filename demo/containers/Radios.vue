<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Radio input</h2>
    <IuiRadio name="radio1">
      <span class="w-6 h-6 inline-block mr-2 rounded-full border border-grey flex-no-shrink" />
      First choice
    </IuiRadio>
    <IuiRadio name="radio2">
      <span class="w-6 h-6 inline-block mr-2 rounded-full border border-grey flex-no-shrink" />
      Different choice
    </IuiRadio>

    <h2 class="text-xl mb-2">Radio group</h2>
    <IuiRadioGroup :options="options" :value="options[0]" group-name="radiogroup1">
      <template #option="option">
        <span class="w-6 h-6 inline-block mr-2 rounded-full border border-grey flex-no-shrink" />
        {{ option.label }}
      </template>
    </IuiRadioGroup>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import IuiRadio from '@/components/Radio';
  import IuiRadioGroup from '@/components/RadioGroup';

  export default Vue.extend({
    name: 'Radios',
    components: {IuiRadio, IuiRadioGroup},
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
