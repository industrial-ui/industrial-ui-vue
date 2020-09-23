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
  import {DropzoneError, FileInputAttrs} from '@/lib/types/components';
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
      /**
       * Value of the dropzone. Use it to model or clear the input
       */
      value: {
        type: [Array, Object] as PropType<ValueType>,
        default: null,
      },

      /**
       * Accept one or multiple files. Depending on this prop, the change event
       * sends an Object of a file or an Array of files
       */
      multiple: {
        type: Boolean,
        default: false,
      },

      /**
       * If true, no drag&drop events will work. Can select only with click then
       */
      noDrop: {
        type: Boolean,
        default: false,
      },

      /**
       * Make the input required and give dropzone a special class
       */
      required: {
        type: Boolean,
        default: false,
      },

      /**
       * Disable the dropzone and give it a special class
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * Check the amount of files selected in multiple mode. Return MaxAmountError if wrong
       */
      maxAmount: {
        type: Number,
        default: null,
        validator: (val) => !Number.isNaN(val) && val > 0,
      },

      /**
       * Check the sizes of each selected file, reject wrong ones with MaxSizeError
       */
      maxSize: {
        type: Number,
        default: null,
        validator: (val) => !Number.isNaN(val) && val > 0,
      },

      /**
       * Check the extensions of each selected file, reject wront with FormatsError
       */
      formats: {
        type: Array as PropType<string[] | null>,
        default: null,
      },

      // TODO: work with ratio for image files
      maxRatio: {
        type: Number,
        default: null,
        validator: (val) => !Number.isNaN(val) && val > 0,
      },
      minRatio: {
        type: Number,
        default: null,
        validator: (val) => !Number.isNaN(val) && val > 0,
      },

      /**
       * If true, return files with blobs. For example, if images are selected, blobs
       * will return the generated url of the image to display it immediately on the page.
       */
      // TODO: blobs property
      blobs: {
        type: Boolean,
        default: false,
      },

      /**
       * Input HTML-attributes. Pass in the object
       */
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
        set (val: File | File[]) {
          let value;
          if (this.multiple) value = Array.isArray(val) ? [...(this.files as File[]), ...val] : [val];
          else value = Array.isArray(val) ? val[0] || null : val;

          this.values = value;
          this.$emit('change', value);
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
        if (this.noDrop || this.disabled) return;

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

        if (this.noDrop || this.disabled) return;
        if (event.dataTransfer) this.upload(Array.from(event.dataTransfer.files));
        else this.upload([]);
      },

      inputChange ({target}: {target: HTMLInputElement}) {
        if (target.files && !this.disabled) this.upload(Array.from(target.files));
      },

      commonHandler (event: Event) {
        event.preventDefault();
        this.$emit(event.type, event);
      },

      upload (files: File[]|null) {
        if (!files) {
          this.files = [];
        } else {
          const thisFiles = this.files as File[] | [];
          const errors: DropzoneError[] = [];

          // Handle MaxAmountError and prevent all files from being uploaded if the
          // given amount of files is more than allowed
          if (this.multiple && this.maxAmount && thisFiles.length + files.length > this.maxAmount) {
            errors.push({
              type: 'MaxAmountError',
              value: thisFiles.length + files.length,
              allowed: this.maxAmount,
            });
            this.$emit('errors', errors);
            return;
          }

          const passedFiles: File[] = [];
          files.forEach((file) => {
            // Handle FormatsError - when single file is not in the list of allowed formats
            if (this.formats !== null) {
              const format = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
              if (this.formats.indexOf(format) === -1) {
                errors.push({
                  type: 'FormatsError',
                  value: format,
                  name: file.name,
                  allowed: this.formats,
                });
                return;
              }
            }

            // Handle MaxSizeError - when single file is too heavy
            if (this.maxSize && file.size >= this.maxSize * 1024 * 1024) {
              errors.push({
                type: 'MaxSizeError',
                value: file.size,
                name: file.name,
                allowed: this.maxSize,
              });
              return;
            }

            passedFiles.push(file);
          });

          if (errors.length) this.$emit('errors', errors);

          this.files = passedFiles;
        }
      },
    },
  });
</script>
