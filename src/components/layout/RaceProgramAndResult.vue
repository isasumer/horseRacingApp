<template>
  <div class="container">
    <div class="program">
      <TitleWrapper title="Program" backgroundColor="blue" />
      <div v-for="(item, index) in program || []" :key="`program-${index}`">
        <div class="lap-title">{{ item.lap + 1 }}. Lap {{ LAP_DISTANCES[item.lap] }}m</div>
        <table class="table">
          <thead>
            <tr>
              <th v-for="(header, i) in headers" :key="`${header}${i}`" class="header-item">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(name, i) in item.positionList"
              :key="`program-entity-${i}`"
              class="table-rows"
            >
              <td>{{ i + 1 }}</td>
              <td>{{ name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="result">
      <TitleWrapper title="Result" backgroundColor="Green" />
      <div v-for="(item, index) in _result" :key="`result-${index}`">
        <div class="lap-title">{{ item.lap + 1 }}. Lap {{ LAP_DISTANCES[item.lap] }}m</div>
        <table class="table">
          <thead>
            <tr>
              <th v-for="(header, i) in headers" :key="`${header}${i}`" class="header-item">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(name, i) in item.positionList"
              :key="`result-entity-${i}`"
              class="table-rows"
            >
              <td>{{ i + 1 }}</td>
              <td>{{ name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import store from '@/store'
import { computed, onMounted, ref, watch } from 'vue'
import { LAP_DISTANCES } from '@/constants/raceRules'
import TitleWrapper from '@/components/layout/TitleWrapper.vue'
import type { IProgram } from '@/types/raceCourse'

const program = computed(() => store.getters['raceCourse/program'])
const result = computed(() => store.getters['raceCourse/result'])
const currentLap = computed(() => store.getters['raceCourse/currentLap'])
const raceStatus = computed(() => store.getters['raceCourse/raceStatus'])
const headers = ['position', 'name']

const _result = ref<IProgram[]>([])

const initializeResult = () => {
  if (result.value && result.value.length > 0) {
    _result.value = result.value.map((item: IProgram) => ({
      ...item,
      positionList: item.positionList.map(() => ''),
    }))
  }
}

onMounted(() => {
  initializeResult()
})

watch(
  program,
  () => {
    initializeResult()
  },
  { deep: true },
)

watch(currentLap, (newLap) => {
  if (result.value && _result.value) {
    for (let i = 0; i < newLap; i++) {
      if (result.value[i] && _result.value[i]) {
        _result.value[i].positionList = [...result.value[i].positionList]
      }
    }

    if (raceStatus.value === 'finished') {
      _result.value = result.value.map((item: IProgram) => ({ ...item }))
    }
  }
})

watch(raceStatus, (newStatus) => {
  if (newStatus === 'finished' && result.value) {
    _result.value = result.value.map((item: IProgram) => ({ ...item }))
  } else if (newStatus === 'initial') {
    initializeResult()
  }
})
</script>

<style scoped lang="scss">
.container {
  display: flex;
  overflow-y: auto;
  height: 720px;
  width: 40%;
  .program,
  .result {
    width: 100%;
  }
  .lap-title {
    text-align: center;
    font-weight: 700;
    color: $black-color;
    background-color: $tertiary-color;
    padding: 4px 0;
  }
}

.table {
  border-collapse: collapse;
  width: 100%;
  table-layout: auto !important;
  word-wrap: break-word;
  thead {
    background-color: $light-gray-color;
  }
  .header-item {
    padding: 0px 20px;
    text-transform: capitalize;
    color: $black-color;
    border: 1px solid $border-color;
    font-weight: 700;
    font-size: 12px;
  }
}
.table-rows {
  width: 100%;
  td {
    background-color: $white-color;
    color: $black-color;
    border: 1px solid $border-color;
    text-align: center;
    font-size: 12px;
  }
}
</style>
