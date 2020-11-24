import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Pinned from './views/Pinned.vue'

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Home
  },
  {
    path: '/pinned',
    name: 'Épingles',
    component: Pinned
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
