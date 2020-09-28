<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Dropzone</h2>

    <Dropzone
      v-model="files"
      multiple
      :max-size="1"
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

    <div v-for="file in files" :key="file.name" class="w-full py-1 px-2 bg-gray-200 flex justify-between rounded mt-1">
      {{ file.name }}
      <span @click="files = []" class="inline-block ml-4 text-orange-700 cursor-pointer">Remove</span>
    </div>

    <Dropzone
      :value="singleFile"
      :formats="['jpg', 'jpeg', 'png']"
      class="mt-4"
      @change="handleUpload"
      @errors="handleErrors"
    >
      <template #default="slotProps">
        <Button is:primary @click="slotProps.select">Select one image</Button>

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

    <Transition name="fade">
      <img
        v-if="fileImg"
        :src="fileImg"
        class="w-full rounded mt-2 cursor-pointer"
        alt=""
        @click="removeImg"
      >
    </Transition>

    <Dropzone disabled class="mt-4">Disabled dropzone</Dropzone>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Dropzone from '@/lib/components/Dropzone';
  import Transition from '@/lib/components/Transition';
  import Button from '@/lib/components/Button';
  import {DropzoneError} from '@/lib/types/components';

  const ErrTexts = {
    FormatsError: 'Incorrect format of the file',
    MaxAmountError: 'To many files uploaded',
    MaxSizeError: 'File is too large',
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
        singleFile: null,
        fileImg: '',
        files: [],
      };
    },
    methods: {
      handleErrors (errors: DropzoneError[]) {
        alert(errors.map((error) => ErrTexts.print(error)).join('\n'));
      },
      handleUpload (file: File) {
        this.fileImg = URL.createObjectURL(file);
      },
      removeImg () {
        this.singleFile = null;
        this.fileImg = '';
      },
    },
  });
</script>
