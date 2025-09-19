<template>
  <div class="race-course">
    <HorseList />
    <HorseTrack />
    <RaceProgramAndResult />
  </div>
</template>

<script setup lang="ts">
import HorseList from '../components/layout/HorseList.vue'
import HorseTrack from '../components/layout/HorseTrack.vue'
import RaceProgramAndResult from '../components/layout/RaceProgramAndResult.vue'
</script>

<style scoped lang="scss">
.race-course {
  @include flex-between;
  margin-top: 24px;
  gap: 36px;
}
</style>
