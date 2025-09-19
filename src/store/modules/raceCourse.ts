import type { IHorse, IRaceCourseSchedule } from '../../types/raceCourse'
import { HorseRacingHelper } from '../../utils/horseRacingHelper'

const state: IRaceCourseState = {
  horseList: [] as IHorse[],
  raceCourseProgram: [] as IRaceCourseSchedule[],
  isRunning: false,
  currentLap: 0

}

const mutations = {
  setHorseList(state: IRaceCourseState, horseList: IHorse[]) {
    state.horseList = horseList
  },
  setRaceCourseProgram(state: IRaceCourseState, raceCourseProgram: IRaceCourseSchedule[]) {
    state.raceCourseProgram = raceCourseProgram;
  },
  setIsRunning(state: IRaceCourseState, isRunning: boolean) {
    state.isRunning = isRunning;
  },
  setCurrentLap(state: IRaceCourseState, currentLap: number) {
    state.currentLap = currentLap;
  }
}

const actions = {
  generateHorseList({ commit }: { commit: (mutation: string, payload: IHorse[]) => void }) {
    const horseList = HorseRacingHelper.generateHorses()
    commit('setHorseList', horseList)
  },
  setCurrentLap({ commit }: { commit: (mutation: string, payload: number) => void }, currentLap: number) {
    commit('setCurrentLap', currentLap)
  }
}

const getters = {
  allHorseList: (state: IRaceCourseState) => state.horseList,
  raceCourseProgram: (state: IRaceCourseState) => state.raceCourseProgram,
  currentLap: (state: IRaceCourseState) => state.currentLap,
  isRunning: (state: IRaceCourseState) => state.isRunning
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
  raceCourseProgram: IRaceCourseSchedule[]
  isRunning: boolean
  currentLap: number
}
