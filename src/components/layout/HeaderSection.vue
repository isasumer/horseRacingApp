<template>
  <section class="header">
    <h1 class="header-title">Horse Racing</h1>
    <div class="header-actions">
      <BaseButton size="md" @click="handleGenerateProgram()">GENERATE PROGRAM</BaseButton>
      <BaseButton size="md" @click="handleStartStop()">START / STOP</BaseButton>
    </div>
  </section>
</template>
<script setup lang="ts">
import { BaseButton } from '../ui'

const handleGenerateProgram = () => {
  console.log('Generate Program')
}

const handleStartStop = () => {
  console.log('Start Stop')
}
</script>

<style scoped lang="scss">
.header {
  background-color: $header-color;
  @include flex-between;
  @include gap-16;
  padding: 16px 32px;
  &-title {
    font-size: 24px;
    font-weight: 700;
    color: $black-color;
  }
}
.header-actions {
  @include flex-center;
  @include gap-16;
}
</style>
