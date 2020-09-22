<template>
  <div
    ref="wrapper"
    :class="wrapperClasses"
    @click.self="select"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="commonHandler"
    @drop="handleDrop"
  >
    <input
      type="file"
      ref="input"
      style="display: none"
      :multiple="multiple"
      :required="required"
      :disabled="disabled"
      v-bind="inputAttrs"
      @change="inputChange"
    >

    <slot :files="files" :dragOver="dragOver" :select="select" />
  </div>
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue';
  import {FileInputAttrs} from '@/lib/types/components';
  import composeClasses from '@/lib/utils/compose-classes';
  import isProperties from '@/lib/utils/is-properties';

  type ValueType = File | File[] | null;

  export default Vue.extend({
    name: 'Dropzone',
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: {
        type: [Array, Object] as PropType<ValueType>,
        default: null,
      },
      multiple: {
        type: Boolean,
        default: false,
      },

      noDrop: {
        type: Boolean,
        default: false,
      },

      blobs: {
        type: Boolean,
        default: false,
      },

      required: {
        type: Boolean,
        default: false,
      },

      disabled: {
        type: Boolean,
        default: false,
      },

      maxAmount: {
        type: Number,
        default: null,
        validator: (val) => Number.isNaN(val) && val > 0,
      },

      maxSize: {
        type: Number,
        default: null,
        validator: (val) => Number.isNaN(val) && val > 0,
      },

      maxRatio: {
        type: Number,
        default: null,
        validator: (val) => Number.isNaN(val) && val > 0,
      },

      minRatio: {
        type: Number,
        default: null,
        validator: (val) => Number.isNaN(val) && val > 0,
      },

      formats: {
        type: Array as PropType<string[] | null>,
        default: null,
      },

      inputAttrs: {
        type: Object as PropType<FileInputAttrs | null>,
        default: () => ({
          id: null,
          name: null,
          accept: null,
          capture: null,
          autofocus: null,
        }),
      },
    },

    data () {
      return {
        values: this.value,
        dragOver: false,
      };
    },

    computed: {
      files: {
        get (): File[] | [] {
          if (Array.isArray(this.values)) return this.values;
          if (this.values && typeof this.values === 'object') return [this.values];
          return [];
        },
        set (val: ValueType) {
          this.values = val;
        },
      },

      wrapperClasses (): string|null {
        const component = this.$iui.components.dropzone;
        return composeClasses(
          this.$iui.globalClass,
          component.class,
          isProperties(component.isProperties, this.$attrs),
          this.required ? component.requiredClass : '',
          this.disabled ? component.disabledClass : '',
          this.dragOver ? component.dragOverClass : '',
          (this.files as File[] | []).length ? component.hasFilesClass : component.hasNoFilesClass
        );
      },
    },

    watch: {
      value (val: ValueType) {
        this.values = val;
      },
    },

    methods: {
      select () {
        (this.$refs.input as HTMLInputElement).click();
      },

      toggleDragOver (val: boolean) {
        const wrapper = this.$refs.wrapper as HTMLElement;
        const wrapperChildren = wrapper.childNodes as unknown as HTMLElement[];
        wrapperChildren.forEach((node) => {
          if (val) node.style.pointerEvents = 'none';
          else node.style.pointerEvents = '';
        });

        this.dragOver = val;
      },

      changeChildrenPointerEvents (style: string) {
        const wrapper = this.$refs.wrapper as HTMLElement;
        const wrapperChildren = wrapper.childNodes as unknown as HTMLElement[];
        wrapperChildren.forEach((node) => node.style.pointerEvents = style);
      },

      handleDragEnter (event: Event) {
        this.toggleDragOver(true);
        this.commonHandler(event);
      },

      handleDragLeave (event: DragEvent) {
        this.toggleDragOver(false);
        this.commonHandler(event);
      },

      handleDrop (event: DragEvent) {
        this.toggleDragOver(false);
        this.commonHandler(event);

        if (event.dataTransfer) this.upload(Array.from(event.dataTransfer.files));
        else this.upload([]);
      },

      inputChange ({target}: {target: HTMLInputElement}) {
        if (target.files) this.upload(Array.from(target.files));
      },

      commonHandler (event: Event) {
        event.preventDefault();
        this.$emit(event.type, event);
      },

      upload (files: File[]|null) {
        console.log('handled', files); // eslint-disable-line
      },
    },
  });
</script>
