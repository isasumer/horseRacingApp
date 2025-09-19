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
      <div v-for="(item, index) in result" :key="`result-${index}`">
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
import { computed } from 'vue'
import { LAP_DISTANCES } from '@/constants/raceRules'
import TitleWrapper from '@/components/layout/TitleWrapper.vue'
const program = computed(() => store.getters['raceCourse/program'])
const result = computed(() => store.getters['raceCourse/result'])
// const currentLap = computed(() => store.getters['raceCourse/currentLap']) || 0
const headers = ['position', 'name']
</script>

<style scoped lang="scss">
.container {
  display: flex;
  overflow-y: auto;
  max-height: 100%;
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
