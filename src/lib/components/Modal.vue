<template>
  <Transition :name="transitionName" v-bind="transitionProps">
    <dialog
      v-show="val"
      :class="overlayClasses"
      :open="val"
      @click="close(true)"
    >
      <slot
        name="in-overlay"
        :open="open"
        :close="close"
        :value="val"
      />

      <!-- Modal itself -->
      <div
        :class="wrapperClasses"
        v-bind="$attrs"
        :key="key"
        @click.stop
      >
        <slot
          :open="open"
          :close="close"
          :value="val"
        />
      </div>
    </dialog>
  </Transition>
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue';
  import composeClasses from '@/lib/utils/compose-classes';
  import isProperties from '@/lib/utils/is-properties';
  import Transition from '@/lib/components/Transition.vue';
  import {TransitionOptions} from '@/lib/types';

  export default Vue.extend({
    name: 'Modal',
    components: {Transition},
    model: {
      prop: 'value',
      event: 'toggle',
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },

      nonClosable: {
        type: Boolean,
        default: false,
      },

      destroyable: {
        type: Boolean,
        default: false,
      },

      overlayClass: String,
      bodyClass: String,

      transition: String,
      transitionProps: Object as PropType<TransitionOptions>,
    },
    data () {
      return {
        val: this.value,
        key: 0,
        body: '',
      };
    },
    computed: {
      wrapperClasses(): string | null {
        const component = this.$iui.components.modal;
        return composeClasses(
          this.$iui.globalClass,
          component.class,
          isProperties(component.isProperties, this.$attrs),
          this.val ? component.openClass : component.closeClass
        );
      },
      overlayClasses(): string | null {
        const component = this.$iui.components.modal;
        return composeClasses(
          this.overlayClass,
          component.overlayClass,
          this.val ? component.openOverlayClass : component.closeOverlayClass
        );
      },
      bodyClasses(): string | null {
        const component = this.$iui.components.modal;
        return composeClasses(
          this.bodyClass,
          component.bodyClass,
          this.val ? component.openBodyClass : component.closeBodyClass
        );
      },

      transitionName (): string | null {
        const component = this.$iui.components.modal;
        return this.transition || component.transition || null;
      },
    },
    watch: {
      value (val: boolean) {
        if (val) this.open();
        else this.close();

        this.val = val;
        if (val && typeof window !== 'undefined') {
          document.addEventListener('keyup', (e: {key: string}) => {
            if (e.key === 'Escape') this.close(true);
          });
        }
      },
      bodyClasses (val: string|null) {
        if (val && typeof window !== 'undefined') {
          document.body.setAttribute('class', composeClasses(this.body, val) || '');
        }
      },
    },
    mounted () {
      // Get initial value of the body's classes and always add it to custom classes
      const classes = document.body.getAttribute('class') || '';
      this.body = classes;
      document.body.setAttribute('class', composeClasses(classes, this.bodyClasses || '') || '');
    },
    methods: {
      close (closingInComponent = false) {
        // Disallow clicking on overlay and pressing Escape cause modal closing
        if (this.nonClosable && typeof closingInComponent === 'boolean' && closingInComponent) return;

        this.val = false;
        this.$emit('close');
        this.$emit('toggle', false);

        // Destroy all modal's insides via changing a key of the content
        if (this.destroyable) this.$nextTick(() => this.key += 1);
      },
      open () {
        this.val = true;
        this.$emit('open');
        this.$emit('toggle', true);
      },
    },
  });
</script>
