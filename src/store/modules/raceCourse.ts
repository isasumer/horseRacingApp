import { generateHorses } from '@/utils/generateHorses';
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
    state.horseList = generateHorses();
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
  setCurrentLap({ commit }: { commit: (mutation: string, payload: number) => void }, currentLap: number) {
    commit('setCurrentLap', currentLap)
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
  isRunning: (state: IRaceCourseState) => state.isRunning
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}




/**[{"_custom":{"type":"reactive","stateTypeName":"Reactive","value":{"program":{"lap":0,"positionList":["Sultanım","Ersele Bey","RockStar","Miss Ilay","Superstar","Lion","King","Winner","Serdeniz","Kara Kız"]},"result":{"lap":0,"positionList":["Ersele Bey","Lion","Sultanım","Miss Ilay","RockStar","Superstar","Kara Kız","Winner","King","Serdeniz"]}}}},{"_custom":{"type":"reactive","stateTypeName":"Reactive","value":{"program":{"lap":1,"positionList":["Kop Gel","Bayır Efe","Canyurt","Miss Ilay","Ersele Bey","RockStar","Tepeli","Superstar","Serdeniz","Kara Kız"]},"result":{"lap":1,"positionList":["Ersele Bey","Kara Kız","Superstar","Canyurt","Tepeli","RockStar","Kop Gel","Bayır Efe","Miss Ilay","Serdeniz"]}}}},{"_custom":{"type":"reactive","stateTypeName":"Reactive","value":{"program":{"lap":2,"positionList":["Superstar","Irmak Su","Bayır Efe","Serdeniz","Arap Kızı","Ersele Bey","Kop Gel","RockStar","Kara Kız","Canikli"]},"result":{"lap":2,"positionList":["Canikli","Ersele Bey","Bayır Efe","Serdeniz","RockStar","Kop Gel","Arap Kızı","Irmak Su","Kara Kız","Superstar"]}}}},{"_custom":{"type":"reactive","stateTypeName":"Reactive","value":{"program":{"lap":3,"positionList":["Canikli","Kop Gel","Can Can","Winner","Sultanım","Tepeli","Miss Ilay","Kara Kız","Lion","Serdeniz"]},"result":{"lap":3,"positionList":["Kara Kız","Lion","Serdeniz","Canikli","Miss Ilay","Winner","Tepeli","Sultanım","Can Can","Kop Gel"]}}}},{"_custom":{"type":"reactive","stateTypeName":"Reactive","value":{"program":{"lap":4,"positionList":["Miss Ilay","Arap Kızı","Superstar","Winner","Lion","King","Sultanım","Canikli","Kop Gel","Sümer Bey"]},"result":{"lap":4,"positionList":["Sümer Bey","Superstar","King","Miss Ilay","Canikli","Sultanım","Winner","Kop Gel","Arap Kızı","Lion"]}}}},{"_custom":{"type":"reactive","stateTypeName":"Reactive","value":{"program":{"lap":5,"positionList":["Sümer Bey","Kop Gel","Tepeli","Sultanım","Kızılık","Ersele Bey","Miss Ilay","Canyurt","Superstar","Canikli"]},"result":{"lap":5,"positionList":["Kop Gel","Kızılık","Tepeli","Sümer Bey","Canyurt","Ersele Bey","Miss Ilay","Canikli","Sultanım","Superstar"]}}}}] */
