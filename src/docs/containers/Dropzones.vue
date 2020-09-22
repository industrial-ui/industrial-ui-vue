<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Dropzone</h2>

    <Dropzone>
      <template #default="slotProps">
        <Button is:primary @click="slotProps.select">Select files</Button>

        <Transition name="fade">
          <div
            v-show="slotProps.dragOver"
            class="absolute flex align-center justify-center w-full h-full top-0 left-0 bg-teal-300"
          >
            Drop files here
          </div>
        </Transition>
      </template>
    </Dropzone>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Dropzone from '@/lib/components/Dropzone.vue';
  import Transition from '@/lib/components/Transition.vue';
  import Button from '@/lib/components/Button.vue';

  export default Vue.extend({
    name: 'Dropdowns',
    components: {Button, Dropzone, Transition},
  });
</script>
