export interface IHorse {
  id: string
  name: string
  color: string
  condition?: number
}


export interface IRaceCourseProgram {
  _id: string
  program: [
    {
      lap: number;
      positionList: [
        {
          position: number
          horse: IHorse
        }
      ]
    }
  ]
  result: [
    {
      lap: number
      positionList: IPositionList[]
    }
  ]
}

export interface IPositionList {
  position: number
  horse: IHorse
}

