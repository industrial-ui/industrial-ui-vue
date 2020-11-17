<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Context menus</h2>

    <Button is:primary @contextmenu.native="(e) => $refs.cm.toggle(e)">Right click me</Button>
    <Button is:danger class="mt-4 block" @click.native="open = !open">Left click, v-model CM</Button>
    <Button is:danger class="mt-4 block" @click.native="(e) => $refs.cm1.toggle(e)">Left click, fixed position</Button>
    <Button is:primary class="mt-4 block" @click.native="(e) => $refs.cm.toggle(e)">Left click, relative position</Button>
    <Button is:danger class="mt-4 block" @click.native="(e) => $refs.cm2.toggle(e)">Left click, bottom position</Button>

    <ContextMenu
      ref="cm"
      tag="ul"
      class="bg-white w-32 py-2 px-0 m-0 list-none rounded z-50 shadow-lg"
      position="auto"
      position-relative="section"
    >
      <template #default="slotProps">
        <li class="py-1 px-2 hover:bg-blue-100 border-b cursor-pointer" @click="slotProps.close()">Hello</li>
        <li class="py-1 px-2 hover:bg-blue-100 cursor-pointer" @click="slotProps.close()">World</li>
      </template>
    </ContextMenu>

    <ContextMenu
      v-model="open"
      :fixed-position="{x: 150, y: 10}"
      tag="ul"
      class="bg-white w-32 py-2 px-0 m-0 list-none rounded z-50 shadow-lg"
    >
      <template #default="slotProps">
        <li class="py-1 px-2 hover:bg-blue-100 border-b cursor-pointer" @click="slotProps.close()">Hello</li>
        <li class="py-1 px-2 hover:bg-blue-100 cursor-pointer" @click="slotProps.close()">World</li>
      </template>
    </ContextMenu>

    <ContextMenu
      ref="cm1"
      tag="ul"
      fixed-position
      class="bg-white w-32 py-2 px-0 m-0 list-none rounded z-50 shadow-lg"
    >
      <template #default="slotProps">
        <li class="py-1 px-2 hover:bg-blue-100 border-b cursor-pointer" @click="slotProps.close()">Hello</li>
        <li class="py-1 px-2 hover:bg-blue-100 cursor-pointer" @click="slotProps.close()">World</li>
      </template>
    </ContextMenu>

    <ContextMenu
      ref="cm2"
      tag="div"
      style="width: 150px"
      class="bg-white py-2 px-0 rounded z-50 shadow-lg"
      position="bottom left"
    >
      <template #default="slotProps">
        <ul class="p-0 m-0 list-none">
          <li class="py-1 px-2 hover:bg-blue-100 border-b cursor-pointer" @click="slotProps.close()">Hello</li>
          <li class="py-1 px-2 hover:bg-blue-100 cursor-pointer" @click="slotProps.close()">World</li>
        </ul>
      </template>
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
