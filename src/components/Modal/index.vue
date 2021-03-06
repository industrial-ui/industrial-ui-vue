<template>
  <IuiTransition :name="transitionName" v-bind="transitionProps">
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
  </IuiTransition>
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue';
  import type {TransitionOptions} from '@/types/transitions';
  import composeClasses from '@/utils/compose-classes';
  import isProperties from '@/utils/is-properties';
  import IuiTransition from '@/components/Transition/index.vue';

  export default Vue.extend({
    name: 'IuiModal',
    components: {IuiTransition},
    model: {
      prop: 'value',
      event: 'toggle',
    },
    props: {
      /**
       * Boolean that indicates whether modal is open or not
       */
      value: {
        type: Boolean,
        default: false,
      },

      /**
       * Prohibit closing modal by clicking on the overlay or by pressing Esc.
       * Therefore, modal could be closed only with close() function from the slot
       */
      nonClosable: {
        type: Boolean,
        default: false,
      },

      /**
       * If true – forceUpdate all child components when the modal is closed.
       */
      destroyable: {
        type: Boolean,
        default: false,
      },

      /**
       * Dynamic classes of the overlay and the document.body
       */
      overlayClass: String,
      bodyClass: String,

      /**
       * Customize transition of dropdown opening.
       * Read more about it on the special page in documentation
       */
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
        const component = this.$iui.config.components.modal;
        return composeClasses(
          this.$iui.config.globalClass,
          component.class,
          isProperties(component.isProperties, this.$attrs),
          this.val ? component.openClass : component.closeClass
        );
      },
      overlayClasses(): string | null {
        const component = this.$iui.config.components.modal;
        return composeClasses(
          this.overlayClass,
          component.overlayClass,
          this.val ? component.openOverlayClass : component.closeOverlayClass
        );
      },
      bodyClasses(): string | null {
        const component = this.$iui.config.components.modal;
        return composeClasses(
          this.bodyClass,
          component.bodyClass,
          this.val ? component.openBodyClass : component.closeBodyClass
        );
      },

      transitionName (): string | null {
        const component = this.$iui.config.components.modal;
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

      /**
       * Watch for bodyClasses change and update document.body's classes
       */
      bodyClasses (val: string|null) {
        if (typeof window !== 'undefined') {
          document.body.setAttribute('class', composeClasses(this.body, val || '') || '');
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
