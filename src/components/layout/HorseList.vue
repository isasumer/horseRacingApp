<template>
  <div class="horse-list">
    <TitleWrapper title="Horse List (1-20)" backgroundColor="yellow" />

    <table v-if="horseList.length" class="table">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="`${header}${i}`" class="header-item">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entity in horseList" :key="`entity-${entity.id}`" class="table-rows">
          <td v-for="(header, i) in headers" :key="`${header}-${i}`">
            {{ entity[header as keyof IHorse] }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No horses yet. Click Generate Program.</p>
  </div>
</template>
<script setup lang="ts">
import store from '@/store'
import { computed } from 'vue'
import type { IHorse } from '@/types/raceCourse'
import TitleWrapper from '@/components/layout/TitleWrapper.vue'
const horseList = computed(() => store.getters['raceCourse/allHorseList'])
const headers = ['name', 'condition', 'color']
</script>

<style scoped lang="scss">
.horse-list {
  height: 100%;
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
    padding: 16px 32px;
    text-transform: capitalize;
    color: $black-color;
    border: 1px solid $border-color;
    font-weight: 700;
  }
}
.table-rows {
  width: 100%;
  td {
    background-color: $white-color;
    color: $black-color;
    border: 1px solid $border-color;
    text-align: center;
  }
}
</style>
