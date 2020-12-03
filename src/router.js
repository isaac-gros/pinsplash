import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Pinned from './views/Pinned.vue'
import Search from './views/Search.vue'

const globalName = 'Pinsplash';
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Accueil',
    }
  },
  { 
    path: '/search/:query',
    name: 'search', 
    component: Search,
    meta: {
      title: 'Résultats de la recherche',
    },
  },
  {
    path: '/pinned',
    name: 'pins',
    component: Pinned,
    meta: {
      title: 'Épingles',
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  document.title = to.meta.title + ' - ' + globalName
})

export default router
