import { HORSE_LIST, HORSE_COLORS } from '../constants/raceRules'
import { shuffleArray } from './shuffleArray'

export function generateHorses() {
  return shuffleArray(HORSE_LIST).map((name: string, index: number) => ({
    name,
    id: index.toString(),
    color: HORSE_COLORS[Math.floor(Math.random() * HORSE_COLORS.length)],
    condition: Math.floor(Math.random() * 100),
    speed: Math.floor(Math.random() * 20) + 80,
  }))
}
