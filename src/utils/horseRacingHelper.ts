import { LAP_DISTANCES, TOTAL_ROUNDS } from '../constants/raceRules';
import store from '../store';
import type { IHorse, IProgram } from '../types/raceCourse';
import { RaceStatusMap } from '../types/raceCourse';
import { generateHorses, generate10Horses } from './generateHorses';

export class HorseRacingHelper {

  static generateHorses(): IHorse[] {
    return generateHorses();
  }

  static generateRaceProgram() {
    const allHorses: IHorse[] = this.generateHorses();
    store.commit('raceCourse/setHorseList', allHorses);

    const program: IProgram[] = [];
    const result: IProgram[] = [];

    for (let roundIndex = 0; roundIndex < TOTAL_ROUNDS; roundIndex++) {
      const selectedHorses: IHorse[] = generate10Horses(allHorses);

      const programPositionList: string[] = selectedHorses.map(horse => horse.name);
      program.push({
        lap: roundIndex,
        positionList: programPositionList
      });

      const raceResults = this.simulateRace(selectedHorses, LAP_DISTANCES[roundIndex]);
      const resultPositionList: string[] = raceResults.map(horse => horse.name);

      result.push({
        lap: roundIndex,
        positionList: resultPositionList
      });
    }

    store.commit('raceCourse/setProgram', program);
    store.commit('raceCourse/setResult', result);
    store.commit('raceCourse/setRaceStatus', RaceStatusMap.Ready);
    store.commit('raceCourse/setCurrentLap', 0);
  }

  static simulateRace(horses: IHorse[], distance: number): IHorse[] {
    const raceResults = horses.map(horse => {
      const conditionFactor = horse.condition / 100;
      const raceTime = distance / (horse.speed * conditionFactor);

      return {
        ...horse,
        raceTime: raceTime
      };
    });
    return raceResults.sort((a, b) => a.raceTime - b.raceTime);
  }


  static startRace() {
    store.commit('raceCourse/setIsRunning', true);
    store.commit('raceCourse/setRaceStatus', RaceStatusMap.Running);
  }

  static pauseRace() {
    store.commit('raceCourse/setIsRunning', false);
    store.commit('raceCourse/setRaceStatus', RaceStatusMap.Stopped);
  }

  static finishRace() {
    store.commit('raceCourse/setIsRunning', false);
    store.commit('raceCourse/setRaceStatus', RaceStatusMap.Finished);
  }

  static resetRace() {
    store.dispatch('raceCourse/resetGame');
  }

  static getCurrentRaceStatus() {
    return (store.state as any).raceCourse.raceStatus;
  }

  static getCurrentLap() {
    return (store.state as any).raceCourse.currentLap;
  }

  static setCurrentLap(lap: number) {
    store.commit('raceCourse/setCurrentLap', lap);

    if (lap >= TOTAL_ROUNDS) {
      this.finishRace();
    }
  }

  static async startFullRaceSequence() {
    const { RaceTimer } = await import('./raceTimer');
    RaceTimer.startRaceSequence();
  }

  static async pauseFullRaceSequence() {
    const { RaceTimer } = await import('./raceTimer');
    RaceTimer.pauseRaceSequence();
  }

  static async resumeFullRaceSequence() {
    const { RaceTimer } = await import('./raceTimer');
    RaceTimer.resumeRaceSequence();
  }

  static async stopFullRaceSequence() {
    const { RaceTimer } = await import('./raceTimer');
    RaceTimer.stopRaceSequence();
  }

  static async advanceToNextLap() {
    const { RaceTimer } = await import('./raceTimer');
    RaceTimer.advanceToNextLap();
  }
}
