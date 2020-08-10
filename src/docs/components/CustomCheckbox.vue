<template>
  <Checkbox :id="id">
    <template #default>
      <span>
        <svg viewBox="0 0 12 10">
          <path d="M10 2L4.5 7.5L2 5" />
        </svg>
      </span>
      <span>{{ label }}</span>
    </template>
  </Checkbox>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Checkbox from '@/lib/components/Checkbox.vue';

  export default Vue.extend({
    name: 'CustomCheckbox',
    components: {Checkbox},
    props: {
      id: String,
      label: String,
    },
  });
</script>
