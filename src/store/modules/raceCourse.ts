import type { IHorse, IProgram, IRaceCourseState, RaceStatus } from '../../types/raceCourse';
import { RaceStatusMap } from '../../types/raceCourse';
import { HorseRacingHelper } from '../../utils/horseRacingHelper';

const state: IRaceCourseState = {
  horseList: [] as IHorse[],
  program: setInitialRaceCourseProgram() as IProgram[],
  result: setInitialRaceCourseProgram() as IProgram[],
  isRunning: false,
  currentLap: 0,
  raceStatus: RaceStatusMap.Initial as RaceStatus
}
function setInitialRaceCourseProgram() {
  return Array.from({ length: 6 }, (_, lap) => (
    { lap, positionList: Array(10).fill("") }));

}

const mutations = {
  setHorseList(state: IRaceCourseState, horseList: IHorse[]) {
    state.horseList = horseList
  },
  setProgram(state: IRaceCourseState, raceCourseProgram: IProgram[]) {
    state.program = raceCourseProgram;
  },
  setResult(state: IRaceCourseState, result: IProgram[]) {
    state.result = result;
  },
  setIsRunning(state: IRaceCourseState, isRunning: boolean) {
    state.isRunning = isRunning;
  },
  setRaceStatus(state: IRaceCourseState, raceStatus: RaceStatus) {
    state.raceStatus = raceStatus;
  },
  setCurrentLap(state: IRaceCourseState, currentLap: number) {
    state.currentLap = currentLap;
  },
  resetGame(state: IRaceCourseState) {
    state.horseList = [];
    state.isRunning = false;
    state.raceStatus = RaceStatusMap.Initial as RaceStatus;
    state.currentLap = 0;
    state.program = setInitialRaceCourseProgram() as IProgram[];
    state.result = setInitialRaceCourseProgram() as IProgram[];
  },

}

const actions = {
  generateHorseList({ commit }: { commit: (mutation: string, payload: IHorse[]) => void }) {
    const horseList = HorseRacingHelper.generateHorses()
    commit('setHorseList', horseList)
  },
  generateRaceProgram() {
    HorseRacingHelper.generateRaceProgram()
  },
  startRace() {
    HorseRacingHelper.startFullRaceSequence()
  },
  pauseRace() {
    HorseRacingHelper.pauseFullRaceSequence()
  },
  resumeRace() {
    HorseRacingHelper.resumeFullRaceSequence()
  },
  stopRace() {
    HorseRacingHelper.stopFullRaceSequence()
  },
  finishRace() {
    HorseRacingHelper.finishRace()
  },
  setCurrentLap({ commit }: { commit: (mutation: string, payload: number) => void }, currentLap: number) {
    HorseRacingHelper.setCurrentLap(currentLap)
  },
  resetGame({ commit }: { commit: (mutation: string, payload: void) => void }) {
    commit('resetGame')
  },
}

const getters = {
  allHorseList: (state: IRaceCourseState) => state.horseList,
  program: (state: IRaceCourseState) => state.program,
  result: (state: IRaceCourseState) => state.result,
  currentLap: (state: IRaceCourseState) => state.currentLap,
  isRunning: (state: IRaceCourseState) => state.isRunning,
  raceStatus: (state: IRaceCourseState) => state.raceStatus,
  currentRoundProgram: (state: IRaceCourseState) => {
    return state.program[state.currentLap] || null
  },
  currentRoundResult: (state: IRaceCourseState) => {
    return state.result[state.currentLap] || null
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
