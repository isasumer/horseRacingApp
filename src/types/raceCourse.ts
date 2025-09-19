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



export type Dictionary<T> = Record<string, T>
