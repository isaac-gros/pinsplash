import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/Home.vue'
import PinnedView from './views/Pinned.vue'
import SearchView from './views/Search.vue'

const globalName = 'Pinsplash';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Accueil',
    }
  },
  { 
    path: '/search/:query',
    name: 'search', 
    component: SearchView,
    meta: {
      title: 'Résultats de la recherche',
    },
  },
  {
    path: '/pinned',
    name: 'pins',
    component: PinnedView,
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
