<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Modal window</h2>
    <Button @click.native="open = true" is:primary>Open modal</Button>

    <Modal v-model="open">
      <template #default="{close}">
        <h2>Hello, world</h2>
        <Button @click.native="close" is:danger>Close modal</Button>
      </template>
    </Modal>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Button from '@/lib/components/Button.vue';
  import Modal from '@/lib/components/Modal.vue';

  export default Vue.extend({
    name: 'Radios',
    components: {Modal, Button},
    data () {
      return {
        open: false,
      };
    },
  });
</script>
