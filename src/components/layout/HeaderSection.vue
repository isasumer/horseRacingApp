<template>
  <section class="header">
    <h1 class="header-title">Horse Racing</h1>
    <div class="header-actions">
      <BaseButton size="md" @click="handleGenerateProgram()" :disabled="isRunning">
        GENERATE PROGRAM
      </BaseButton>
      <BaseButton size="md" @click="handleStartPause()" :disabled="isReady">
        {{ getStartPauseButtonText }}
      </BaseButton>
      <BaseButton size="md" @click="handleReset()" :disabled="isRunning"> RESET </BaseButton>
    </div>
  </section>
</template>
<script setup lang="ts">
import { BaseButton } from '../ui'
import store from '@/store'
import { computed } from 'vue'
import { RaceStatusMap } from '@/types/raceCourse'
const isRunning = computed(() => store.getters['raceCourse/isRunning'])
const isReady = computed(() => store.getters['raceCourse/raceStatus'] === RaceStatusMap.Initial)
const raceStatus = computed(() => store.getters['raceCourse/raceStatus'])

const getStartPauseButtonText = computed(() => {
  if (raceStatus.value === RaceStatusMap.Running) {
    return 'PAUSE'
  } else if (raceStatus.value === RaceStatusMap.Stopped) {
    return 'RESUME'
  } else if (raceStatus.value === RaceStatusMap.Finished) {
    return 'FINISHED'
  }
  return 'START'
})

const handleGenerateProgram = () => {
  store.dispatch('raceCourse/generateRaceProgram')
}

const handleStartPause = () => {
  if (raceStatus.value === RaceStatusMap.Running) {
    store.dispatch('raceCourse/pauseRace')
  } else if (raceStatus.value === RaceStatusMap.Stopped) {
    store.dispatch('raceCourse/resumeRace')
  } else if (
    raceStatus.value === RaceStatusMap.Ready ||
    raceStatus.value === RaceStatusMap.Initial
  ) {
    store.dispatch('raceCourse/startRace')
  }
}

const handleReset = () => {
  store.dispatch('raceCourse/resetGame')
}
</script>

<style scoped lang="scss">
.header {
  background-color: $header-color;
  @include flex-between;
  @include gap-16;
  padding: 12px 24px;
  &-title {
    font-size: 22px;
    font-weight: 700;
    color: $black-color;
  }
}
.header-actions {
  @include flex-center;
  @include gap-16;
}
</style>
