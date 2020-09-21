<template>
  <div
  >

  </div>
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue';
  import {FileInputAttrs} from '@/lib/types/components';

  export default Vue.extend({
    name: 'Dropzone',
    props: {
      multiple: {
        type: Boolean,
        default: false,
      },

      noDrop: {
        type: Boolean,
        default: false,
      },

      blobs: {
        type: Boolean,
        default: false,
      },

      required: {
        type: Boolean,
        default: false,
      },

      disabled: {
        type: Boolean,
        default: false,
      },

      maxAmount: {
        type: Number,
        default: null,
      },

      maxSize: {
        type: Number,
        default: null,
      },

      maxRatio: {
        type: Number,
        default: null,
      },

      minRatio: {
        type: Number,
        default: null,
      },

      formats: {
        type: Array as PropType<string[] | null>,
        default: null,
      },

      inputAttrs: {
        type: Object as PropType<FileInputAttrs | null>,
        default: null,
      },
    },
    computed: {
    },
  });
</script>
