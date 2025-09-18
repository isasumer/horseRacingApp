import { generateHorses } from '@/utils/generateHorses'
import type { IHorse, IRaceCourseProgram } from '../../types/raceCourse'

const state: IRaceCourseState = {
  horseList: [] as IHorse[],
  raceCourseProgram: [] as IRaceCourseProgram[],
  isRunning: false

}

const mutations = {
  setHorseList(state: IRaceCourseState, horseList: IHorse[]) {
    state.horseList = horseList
  },

}

const actions = {
  generateHorseList({ commit }: { commit: (mutation: string, payload: IHorse[]) => void }) {
    const horseList = generateHorses()
    commit('setHorseList', horseList)
  },
}

const getters = {
  allHorseList: (state: IRaceCourseState) => state.horseList,
  horseListCount: (state: IRaceCourseState) => state.horseList.length
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}


interface IRaceCourseState {
  horseList: IHorse[]
  raceCourseProgram: IRaceCourseProgram[]
  isRunning: boolean
}
