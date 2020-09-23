<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Dropzone</h2>

    <Dropzone
      v-model="files"
      multiple
      :max-size="1"
      :formats="['jpg', 'jpeg']"
      :max-amount="3"
      @errors="handleErrors"
    >
      <template #default="slotProps">
        <Button is:primary @click="slotProps.select">Select files</Button>

        <Transition name="fade">
          <div
            v-show="slotProps.dragOver"
            class="absolute flex align-center justify-center rounded w-full h-full top-0 left-0 bg-teal-300"
          >
            Drop files here
          </div>
        </Transition>
      </template>
    </Dropzone>

    <div v-for="file in files" :key="file.name" class="w-full py-1 px-2">
      {{ file.name }}
      <span @click="files = []" class="inline-block ml-4 text-orange-700 cursor-pointer">Remove</span>
    </div>

    <Dropzone disabled class="mt-4">Disabled dropzone</Dropzone>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Dropzone from '@/lib/components/Dropzone.vue';
  import Transition from '@/lib/components/Transition.vue';
  import Button from '@/lib/components/Button.vue';
  import {DropzoneError} from '@/lib/types/components';

  const ErrTexts = {
    FormatsError: 'Incorrect format of the file',
    MaxAmountError: 'To many files uploaded',
    MaxSizeError: 'File is too large',
    MaxRatioError: 'File ratio is incorrect',
    MinRatioError: 'File ratio is incorrect',
    print (err: DropzoneError): string {
      const name = err.name ? ` in ${err.name}` : '';
      return `${this[err.type]}${name}. Given: ${err.value}. Allowed: ${err.allowed.toString()}`;
    },
  };

  export default Vue.extend({
    name: 'Dropdowns',
    components: {Button, Dropzone, Transition},
    data () {
      return {
        files: [],
      };
    },
    methods: {
      handleErrors (errors: DropzoneError[]) {
        alert(errors.map((error) => ErrTexts.print(error)).join('\n'));
      },
    },
  });
</script>
