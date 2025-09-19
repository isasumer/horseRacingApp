import { HORSE_LIST, HORSE_COLORS, TOTAL_HORSES } from '../constants/raceRules'
import { shuffleArray } from './shuffleArray'
import type { IHorse } from '../types/raceCourse'

export function generateHorses(): IHorse[] {
  const shuffledColors = shuffleArray([...HORSE_COLORS]);

  return HORSE_LIST.slice(0, TOTAL_HORSES).map((horse: string, index: number) => ({
    name: horse,
    id: index + 1,
    color: shuffledColors[index],
    condition: Math.floor(Math.random() * 60) + 40,
    speed: Math.floor(Math.random() * 10) + 90,
  }))
}

export function generate10Horses(allHorses: IHorse[]): IHorse[] {
  return shuffleArray([...allHorses]).slice(0, 10)
}
