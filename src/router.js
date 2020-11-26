import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Pinned from './views/Pinned.vue'
import Search from './views/Search.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  { 
    path: '/search/:query',
    name: 'search', 
    component: Search
  },
  {
    path: '/pinned',
    name: 'pins',
    component: Pinned
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
