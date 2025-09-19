<template>
  <div class="container">
    <div class="program">
      <TitleWrapper title="Program" backgroundColor="blue" />
      <div v-for="(item, index) in raceCourseProgram" :key="`program-${index}`">
        <div class="lap-title">
          {{ item.program.lap + 1 }}. Lap {{ LAP_DISTANCES[item.program.lap] }}m
        </div>
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
              v-for="(name, i) in item.program.positionList"
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
      <div v-for="(item, index) in raceCourseProgram" :key="`result-${index}`">
        <div class="lap-title">
          {{ item.program.lap + 1 }}. Lap {{ LAP_DISTANCES[item.program.lap] }}m
        </div>
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
              v-for="(name, i) in item.result.positionList"
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
const raceCourseProgram = computed(() => store.getters['raceCourse/raceCourseProgram'])
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

<!--
raceCourseProgram:
[{"_custom":{"type":"reactive","stateTypeName":"Reactive","value":{"program":{"lap":0,"positionList":["Kara Kız","Tepeli","Irmak Su","Kop Gel","Canikli","RockStar","Lion","Winner","Miss Ilay","Canyurt"]},"result":{"lap":0,"positionList":["Winner","Kara Kız","Irmak Su","Kop Gel","Tepeli","Miss Ilay","RockStar","Lion","Canikli","Canyurt"]}}}},{"_custom":{"type":"reactive","stateTypeName":"Reactive","value":{"program":{"lap":1,"positionList":["Canikli","Can Can","RockStar","Serdeniz","Sümer Bey","Kızılık","Tepeli","King","Kara Kız","Arap Kızı"]},"result":{"lap":1,"positionList":["Kızılık","Canikli","King","Arap Kızı","Can Can","Tepeli","Kara Kız","RockStar","Sümer Bey","Serdeniz"]}}}},{"_custom":{"type":"reactive","stateTypeName":"Reactive","value":{"program":{"lap":2,"positionList":["Miss Ilay","Kızılık","Serdeniz","RockStar","Arap Kızı","Can Can","Canikli","Kara Kız","Winner","Canyurt"]},"result":{"lap":2,"positionList":["RockStar","Miss Ilay","Arap Kızı","Kızılık","Can Can","Canyurt","Serdeniz","Winner","Kara Kız","Canikli"]}}}},{"_custom":{"type":"reactive","stateTypeName":"Reactive","value":{"program":{"lap":3,"positionList":["Sümer Bey","Irmak Su","Miss Ilay","Canyurt","Bayır Efe","Serdeniz","King","Sultanım","Lion","Arap Kızı"]},"result":{"lap":3,"positionList":["Arap Kızı","King","Lion","Sümer Bey","Serdeniz","Bayır Efe","Sultanım","Miss Ilay","Canyurt","Irmak Su"]}}}},{"_custom":{"type":"reactive","stateTypeName":"Reactive","value":{"program":{"lap":4,"positionList":["Bayır Efe","Superstar","RockStar","Tepeli","Lion","Winner","Sultanım","Kara Kız","Serdeniz","Sümer Bey"]},"result":{"lap":4,"positionList":["Tepeli","Bayır Efe","Lion","Serdeniz","RockStar","Sümer Bey","Winner","Kara Kız","Sultanım","Superstar"]}}}},{"_custom":{"type":"reactive","stateTypeName":"Reactive","value":{"program":{"lap":5,"positionList":["Tepeli","Superstar","RockStar","Ersele Bey","Bayır Efe","Canikli","Irmak Su","Winner","King","Sultanım"]},"result":{"lap":5,"positionList":["Ersele Bey","Bayır Efe","Superstar","King","Tepeli","Irmak Su","RockStar","Winner","Canikli","Sultanım"]}}}}]
-->
