<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Context menus</h2>

    <Button is:primary @contextmenu.native="(e) => $refs.cm.open(e)">Right click me</Button>
    <Button is:primary class="mt-4 block" @click.native="(e) => $refs.cm.open(e)">Left click me</Button>

    <ContextMenu ref="cm" tag="ul">
      <li>Hello</li>
      <li>World</li>
    </ContextMenu>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import ContextMenu from '@/components/ContextMenu';
  import Button from '@/components/Button';

  export default Vue.extend({
    name: 'Buttons',
    components: {ContextMenu, Button},
    data () {
      return {
        open: false,
      };
    },
  });
</script>
