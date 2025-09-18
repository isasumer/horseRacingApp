import { createRouter, createWebHistory } from 'vue-router'
import RaceCourse from '../views/RaceCourse.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RaceCourse,
    },
  ],
})

export default router
