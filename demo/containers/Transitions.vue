<template>
  <section class="w-full rounded shadow-lg p-4">
    <h2 class="text-xl mb-2">Transition</h2>
    <IuiToggle v-model="shown" />
    <IuiTransition name="fade" appear mode="out-in">
      <IuiButton v-if="shown" key="on" is:primary>Hello</IuiButton>
      <IuiButton v-else key="off" is:danger>Good bye</IuiButton>
    </IuiTransition>

    <br>
    <br class="mt-4">
    <IuiToggle v-model="shown1" />
    <IuiTransition name="slide" appear :animation="{easing: 'easeInOutBack', duration: 500}">
      <IuiButton v-if="shown1" key="on" is:primary>Slide with easeInOutBack easing</IuiButton>
    </IuiTransition>

    <h2 class="text-xl mt-8 mb-2">Transition Group</h2>
    <IuiButton is:primary @click.native="add" class="mr-2">Add</IuiButton>
    <IuiButton is:primary @click.native="remove" class="mr-2">Remove</IuiButton>
    <IuiButton is:primary @click.native="shuffle">Shuffle</IuiButton>

    <IuiTransitionGroup tag="p" name="fly" :animation="{y: 16}">
      <span v-for="item in items" v-bind:key="item" class="inline-block mr-2">
        {{ item }}
      </span>
    </IuiTransitionGroup>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {
    IuiButton, IuiTransition, IuiTransitionGroup, IuiToggle
  } from '@/main';

  export default Vue.extend({
    name: 'Radios',
    components: {
      IuiButton,
      IuiTransition,
      IuiTransitionGroup,
      IuiToggle,
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
