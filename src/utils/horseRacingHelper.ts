import type { IRaceCourseSchedule, IHorse, IProgram } from '../types/raceCourse';
import store from '../store';
import { HORSE_LIST, HORSE_COLORS, LAP_DISTANCES } from '../constants/raceRules'
import { shuffleArray } from './shuffleArray'

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
    const raceProgram: IRaceCourseSchedule[] = [];

    LAP_DISTANCES.forEach((lap, index) => {
      const selectedHorses: IHorse[] = this.generate10HorsesForRace();
      const positionList: string[] = selectedHorses.map((horse: IHorse) => (horse.name));
      const program: IProgram = { lap: index, positionList: positionList };

      const resultPositionList: IHorse[] = selectedHorses.reduce((acc: IHorse[], horse: IHorse) => {

        acc.push({ ...horse, speed: horse.speed * horse.condition });
        return acc;
      }, []).sort((a, b) => b.speed - a.speed);

      const result: IProgram = { lap: index, positionList: resultPositionList.map((horse: IHorse) => (horse.name)) };

      raceProgram.push({ program, result });

    });

    store.commit('raceCourse/setRaceCourseProgram', raceProgram);
  }

  static startRace() {
    store.commit('raceCourse/setIsRunning', true);
  }

  static stopRace() {
    store.commit('raceCourse/setIsRunning', false);
  }
}
