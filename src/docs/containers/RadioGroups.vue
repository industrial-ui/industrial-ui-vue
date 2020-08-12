<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Radio group</h2>
    <RadioGroup :options="options" group-name="radiogroup1" />

    <RadioGroup :options="options">
      <template #option="option">
        <Radio name="radio1" v-bind="option">
          <span class="w-6 h-6 inline-block mr-2 rounded-full border border-grey flex-no-shrink" />
          Second choice
        </Radio>
      </template>
    </RadioGroup>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Radio from '@/lib/components/Radio.vue';
  import RadioGroup from '@/lib/components/RadioGroup.vue';

  export default Vue.extend({
    name: 'Radios',
    components: {Radio, RadioGroup},
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
        ],
      };
    },
  });
</script>
