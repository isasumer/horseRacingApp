import { createStore } from 'vuex'
import raceCourse from './modules/raceCourse'

const store = createStore({
  modules: {
    raceCourse,
  }
})

export default store
