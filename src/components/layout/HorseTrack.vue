<template>
  <div class="horse-track">
    <div v-for="(horse, index) in currentHorses" :key="`lane-${horse.id}`" class="track-lane">
      <div class="lane-number">{{ index + 1 }}</div>
      <div
        class="horse"
        :class="{
          racing: isRaceAnimating,
          finished: isRaceFinished(horse.name),
        }"
        :style="{
          '--horse-color': horse.color,
          transform: `translateY(-50%) translateX(${getHorsePosition(horse.name)}px)`,
        }"
      >
        <span class="horse-name">{{ horse.name }}</span>
      </div>
    </div>
    <div class="track-bottom" v-if="currentRoundProgram">
      <div class="bottom-text">Race</div>
      <div class="bottom-text">{{ currentLap + 1 }} Lap - {{ LAP_DISTANCES[currentLap] }}m</div>
      <div class="bottom-text">FINISH</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from '@/store'
import { computed, ref, watch, onUnmounted } from 'vue'
import { LAP_DISTANCES } from '@/constants/raceRules'
import type { IHorse } from '@/types/raceCourse'
import { RaceStatusMap } from '@/types/raceCourse'
import { HorseRacingHelper } from '@/utils/horseRacingHelper'

const currentLap = computed(() => store.getters['raceCourse/currentLap'])
const raceStatus = computed(() => store.getters['raceCourse/raceStatus'])
const isRunning = computed(() => store.getters['raceCourse/isRunning'])
const allHorseList = computed(() => store.getters['raceCourse/allHorseList'])
const currentRoundProgram = computed(() => store.getters['raceCourse/currentRoundProgram'])
const currentRoundResult = computed(() => store.getters['raceCourse/currentRoundResult'])
const horsePositions = ref<Record<string, number>>({})
const raceTimer = ref<number | null>(null)
const raceStartTime = ref<number>(0)
const isRaceAnimating = ref(false)

const currentHorses = computed(() => {
  if (!currentRoundProgram.value || !allHorseList.value.length) return []

  return currentRoundProgram.value.positionList
    .map((horseName: string) => {
      return allHorseList.value.find((horse: IHorse) => horse.name === horseName)
    })
    .filter(Boolean)
})

const getRaceDuration = (horse: IHorse) => {
  const baseTime = 4
  const conditionFactor = horse.condition / 100
  const speedFactor = horse.speed / 100

  return baseTime / (conditionFactor * speedFactor)
}

const getTrackDistance = () => {
  const trackElement = document.querySelector('.horse-track')
  if (trackElement) {
    const trackWidth = trackElement.clientWidth
    const horseStartPosition = 40
    const trackPadding = 16
    const horseWidth = 100
    const finishLinePosition = trackWidth - trackPadding - horseWidth
    return Math.max(300, finishLinePosition - horseStartPosition)
  }
  return 600
}

const getSlowestHorseDuration = () => {
  if (!currentHorses.value.length) return 4

  const durations = currentHorses.value.map((horse: IHorse) => getRaceDuration(horse))
  return Math.max(...durations)
}

const getHorsePosition = (horseName: string) => {
  return horsePositions.value[horseName] || 0
}

const updateHorsePositions = (elapsedTime: number) => {
  const trackDistance = getTrackDistance()

  currentHorses.value.forEach((horse: IHorse) => {
    const horseDuration = getRaceDuration(horse)
    const progress = Math.min(elapsedTime / horseDuration, 1)

    horsePositions.value[horse.name] = progress * trackDistance
  })
}

const startRaceAnimation = () => {
  if (isRaceAnimating.value) return

  isRaceAnimating.value = true
  raceStartTime.value = performance.now()
  currentHorses.value.forEach((horse: IHorse) => {
    horsePositions.value[horse.name] = 0
  })

  const animate = () => {
    const currentTime = performance.now()
    const elapsedTime = (currentTime - raceStartTime.value) / 1000
    if (elapsedTime < getSlowestHorseDuration()) {
      updateHorsePositions(elapsedTime)
      raceTimer.value = requestAnimationFrame(animate)
    } else {
      finishRace()
    }
  }

  raceTimer.value = requestAnimationFrame(animate)
}

const finishRace = () => {
  isRaceAnimating.value = false

  const trackDistance = getTrackDistance()
  currentHorses.value.forEach((horse: IHorse) => {
    horsePositions.value[horse.name] = trackDistance
  })

  if (raceTimer.value) {
    cancelAnimationFrame(raceTimer.value)
    raceTimer.value = null
  }

  HorseRacingHelper.advanceToNextLap()
}

const stopRaceAnimation = () => {
  if (raceTimer.value) {
    cancelAnimationFrame(raceTimer.value)
    raceTimer.value = null
  }
  isRaceAnimating.value = false
}

const isRaceFinished = (horseName: string) => {
  return (
    raceStatus.value === RaceStatusMap.Finished ||
    (currentRoundResult.value && currentRoundResult.value.positionList.includes(horseName))
  )
}

watch(
  [isRunning, raceStatus],
  ([running, status]) => {
    if (running && status === 'running') {
      if (!isRaceAnimating.value) {
        startRaceAnimation()
      }
    } else {
      stopRaceAnimation()
    }
  },
  { immediate: true },
)

watch(currentLap, () => {
  if (isRunning.value && raceStatus.value === 'running') {
    horsePositions.value = {}
    stopRaceAnimation()
    setTimeout(() => {
      if (isRunning.value && raceStatus.value === 'running') {
        startRaceAnimation()
      }
    }, 100)
  }
})

watch(raceStatus, (newStatus) => {
  if (newStatus === RaceStatusMap.Initial || newStatus === RaceStatusMap.Ready) {
    horsePositions.value = {}
  }
})

watch(currentRoundProgram, () => {
  if (raceStatus.value === RaceStatusMap.Ready || raceStatus.value === RaceStatusMap.Initial) {
    horsePositions.value = {}
  }
})

onUnmounted(() => {
  stopRaceAnimation()
})
</script>

<style scoped lang="scss">
.horse-track {
  width: 100%;
  height: 100%;
  padding: 16px;
  border-right: 2px solid red;
  border-top: 2px dashed #dee2e6;
}

.track-lane {
  position: relative;
  height: 64px;
  border-bottom: 2px dashed #dee2e6;
  display: flex;
  align-items: center;

  .lane-number {
    width: 56px;
    height: 36px;
    background: #43862c;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    z-index: 3;
    transform: rotate(-90deg);
    border-right: 2px solid white;
    border-left: 2px solid white;
  }

  .horse {
    position: absolute;
    left: 40px;
    top: 50%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 12px;
    border-radius: 20px;
    border: 2px solid var(--horse-color, #6c757d);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.1s ease-out;
    z-index: 4;
    will-change: transform;

    &.racing {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    &.finished {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .horse-name {
      font-weight: 700;
      color: white;
      white-space: nowrap;
    }
  }
}
.track-bottom {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  font-size: 20px;
  color: rgb(178, 1, 1);
}
</style>
