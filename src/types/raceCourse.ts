export interface IHorse {
  id: number
  name: string
  color: string
  condition: number
  speed: number
}

export interface IProgram {
  lap: number
  positionList: string[]
}

export interface IRaceCourseSchedule {
  program: IProgram
  result?: IProgram
}

export type RaceStatus = "initial" | "ready" | "stopped" | "running" | "finished"

export const RaceStatusMap = {
  "Initial": "initial",
  "Ready": "ready",
  "Stopped": "stopped",
  "Running": "running",
  "Finished": "finished"
}

export type Dictionary<T> = Record<string, T>


export interface IRaceCourseState {
  horseList: IHorse[]
  program: IProgram[]
  result: IProgram[]
  isRunning: boolean
  currentLap: number
  raceStatus: RaceStatus
}
