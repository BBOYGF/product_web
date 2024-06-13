import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
import QuickStartView from '@/views/QuickStartPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }, {
      path: '/quick_start_View',
      name: 'QuickStartView',
      component: QuickStartView
    }
  ]
})

export default router
