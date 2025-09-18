<template>
  <button :class="['base-button', sizeClass]" @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: 'BaseButton',
  emits: ['click'],
  props: {
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
    },
  },
  computed: {
    sizeClass() {
      return `base-button--${this.size}`
    },
  },
}
</script>

<style scoped>
.base-button {
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
.base-button--sm {
  padding: 4px 8px;
  font-size: 12px;
}
.base-button--md {
  padding: 8px 16px;
  font-size: 14px;
}
.base-button--lg {
  padding: 12px 20px;
  font-size: 16px;
}
</style>
