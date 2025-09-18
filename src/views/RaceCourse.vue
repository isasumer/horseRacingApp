<template>
  <div class="race-course">
    <HorseList />
    <HorseTrack />
    <RaceResult />
  </div>
</template>

<script setup lang="ts">
import HorseList from '../components/layout/HorseList.vue'
import HorseTrack from '../components/layout/HorseTrack.vue'
import RaceResult from '../components/layout/RaceResult.vue'
</script>

<style scoped lang="scss">
.race-course {
  @include flex-between;
}
</style>
