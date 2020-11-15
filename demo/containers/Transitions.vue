<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Transition</h2>
    <Toggle v-model="shown" />
    <Transition name="fade" appear mode="out-in">
      <Button v-if="shown" key="on" is:primary>Hello</Button>
      <Button v-else key="off" is:danger>Good bye</Button>
    </Transition>

    <br>
    <br class="mt-4">
    <Toggle v-model="shown1" />
    <Transition name="slide" appear :animation="{easing: 'easeInOutBack', duration: 500}">
      <Button v-if="shown1" key="on" is:primary>Slide with easeInOutBack easing</Button>
    </Transition>

    <h2 class="text-xl mt-8 mb-2">Transition Group</h2>
    <Button is:primary @click.native="add" class="mr-2">Add</Button>
    <Button is:primary @click.native="remove" class="mr-2">Remove</Button>
    <Button is:primary @click.native="shuffle">Shuffle</Button>

    <TransitionGroup tag="p" name="fly" :animation="{y: 16}">
      <span v-for="item in items" v-bind:key="item" class="inline-block mr-2">
        {{ item }}
      </span>
    </TransitionGroup>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Button from '../../src/components/Button';
  import Transition from '../../src/components/Transition';
  import TransitionGroup from '../../src/components/TransitionGroup';
  import Toggle from '../../src/components/Toggle';

  export default Vue.extend({
    name: 'Radios',
    components: {
      Button,
      Transition,
      TransitionGroup,
      Toggle,
    },
    data () {
      return {
        shown: true,
        shown1: true,
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      };
    },
    methods: {
      randomIndex () {
        return Math.floor(Math.random() * this.items.length);
      },
      add () {
        this.items.splice(this.randomIndex(), 0, Math.max(...this.items) + 1);
      },
      remove () {
        this.items.splice(this.randomIndex(), 1);
      },
      shuffle () {
        this.items.sort(() => Math.random() - 0.5);
      },
    },
  });
</script>
