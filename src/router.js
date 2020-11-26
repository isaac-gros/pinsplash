import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Pinned from './views/Pinned.vue'
import Search from './views/Search.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Accueil - Pinsplash',
    }
  },
  { 
    path: '/search/:query',
    name: 'search', 
    component: Search,
    meta: {
      title: 'Résultats de la recherche - Pinsplash',
    },
  },
  {
    path: '/pinned',
    name: 'pins',
    component: Pinned,
    meta: {
      title: 'Épingles - Pinsplash',
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
