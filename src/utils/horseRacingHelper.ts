import { HORSE_COLORS, HORSE_LIST, LAP_DISTANCES } from '../constants/raceRules';
import store from '../store';
import type { IHorse, IProgram } from '../types/raceCourse';
import { shuffleArray } from './shuffleArray';

export class HorseRacingHelper {

  static generateHorses(): IHorse[] {
    return shuffleArray(HORSE_LIST).map((horse: string, index: number) => ({
      name: horse,
      id: index,
      color: HORSE_COLORS[Math.floor(Math.random() * HORSE_COLORS.length)],
      condition: Math.floor(Math.random() * 100),
      speed: Math.floor(Math.random() * 20) + 80,
    }))
  }

  static generate10HorsesForRace() {
    return shuffleArray(this.generateHorses()).slice(0, 10)
  }

  static generateRaceProgram() {
    const program: IProgram[] = [];
    const result: IProgram[] = [];

    LAP_DISTANCES.forEach((lap, index) => {
      const selectedHorses: IHorse[] = this.generate10HorsesForRace();
      const positionList: string[] = selectedHorses.map((horse: IHorse) => (horse.name));
      const _program = { lap: index, positionList: positionList };
      program.push(_program);
      const resultPositionList: IHorse[] = selectedHorses.reduce((acc: IHorse[], horse: IHorse) => {

        acc.push({ ...horse, speed: horse.speed * horse.condition });
        return acc;
      }, []).sort((a, b) => b.speed - a.speed);

      const _result = { lap: index, positionList: resultPositionList.map((horse: IHorse) => (horse.name)) };
      result.push(_result);

    });
    store.commit('raceCourse/setProgram', program);

    store.commit('raceCourse/setResult', result);

  }

  static startRace() {
    store.commit('raceCourse/setIsRunning', true);
  }

  static stopRace() {
    store.commit('raceCourse/setIsRunning', false);
  }
}
