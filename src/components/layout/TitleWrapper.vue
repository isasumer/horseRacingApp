<template>
  <div class="title-wrapper" :style="{ backgroundColor: backgroundColor }">
    <div class="title-wrapper-title">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    required: true,
  },
})
</script>

<style scoped lang="scss">
.title-wrapper {
  @include center;
}
.title-wrapper-title {
  font-size: 24px;
  font-weight: 700;
  color: $black-color;
  padding: 16px 32px;
}
</style>
