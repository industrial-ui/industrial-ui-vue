<template>
  <component
    :is="tag"
    :class="wrapperClasses"
    ref="group"
  >
    <template v-for="option in options">
      <Radio
        :key="option.slug"
        :name="groupName"
        :value="val && val.slug === option.slug"
        v-bind="option"
        @toggle="newVal => change(option.slug, newVal)"
      >
        <slot name="option" v-bind="option" />
      </Radio>
    </template>
  </component>
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue';
  import {Option} from '@/lib/types';
  import composeClasses from '@/lib/utils/compose-classes';
  import isProperties from '@/lib/utils/is-properties';
  import Radio from './Radio.vue';

  export default Vue.extend({
    name: 'RadioGroup',
    components: {Radio},
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      tag: {
        type: String,
        default: 'div',
      },

      options: {
        type: Array as PropType<Option[]>,
        default: null,
      },

      value: {
        type: Object as PropType<Option|null>,
        default: null,
      },

      groupName: String,
    },
    data () {
      return {
        val: this.value,
      };
    },
    computed: {
      wrapperClasses (): string | null {
        const component = this.$iui.components.radioGroup;
        return composeClasses(
          component.class,
          isProperties(component.isProperties, this.$attrs)
        );
      },
    },
    watch: {
      value (val) {
        if (val?.slug !== this.val?.slug) {
          this.val = val;

          // Check the new input that came from parent
          this.checkBySlug(val?.slug);
        }
      },
    },
    methods: {
      change (slug: string, val: boolean) {
        if (val) {
          const newVal = this.options.find((opt) => opt.slug === slug);
          if (newVal) {
            this.val = newVal;
            this.$emit('change', newVal);
          }
        }
      },

      checkBySlug (slug: string) {
        this.$nextTick(() => {
          const input = (this.$refs.group as HTMLElement).querySelector(`input[value="${slug}"]`) as HTMLInputElement;
          if (input) input.checked = true;
        });
      },
    },
  });
</script>
