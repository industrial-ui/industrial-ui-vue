<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Modal window</h2>
    <Button @click.native="open = true" is:primary>Open simple modal</Button>
    <Button
      @click.native="open1 = true"
      is:danger
      class="mt-4"
    >
      Open destroyable non-closable modal
    </Button>

    <Modal v-model="open">
      <template #default="{close}">
        <h2>Hello, world</h2>
        <Button @click.native="close" is:danger>Close modal</Button>
      </template>
    </Modal>

    <Modal v-model="open1" destroyable non-closable>
      <template #default="{close}">
        <Counter :close="close" />
      </template>
    </Modal>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Button from '@/lib/components/Button.vue';
  import Modal from '@/lib/components/Modal.vue';
  import Counter from '../components/Counter.vue';

  export default Vue.extend({
    name: 'Radios',
    components: {Modal, Button, Counter},
    data () {
      return {
        open: false,
        open1: false,
      };
    },
  });
</script>
