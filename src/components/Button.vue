<template>
  <button>
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<script>
  export default {
    name: 'IUIButton',
    props: {
      label: String,
    },
  };
</script>
