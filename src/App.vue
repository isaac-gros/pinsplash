<template>
  <div class="container mx-auto">
    <h1 class="text-4xl border-b border-black" id="title">Pinsplash</h1>
    <div id="nav" class="py-5 flex w-full sticky top-0 z-10 bg-white">
      <router-link to="/" class="flex items-center">Accueil</router-link>
      <router-link to="/pinned" class="flex items-center">
        Épingles
        <span
          class="ml-3 font-normal flex items-center justify-center text-center w-5 h-5 
          bg-blue-700 text-white text-sm rounded-full" 
          v-if="(pinsCount) > 0">
          {{ pinsCount }}
        </span>
      </router-link>
      <search-bar></search-bar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchBar from './components/SearchBar.vue'

export default {
  name: 'App',
  components: { 
    SearchBar 
  },
  computed: {
    ...mapGetters(['pinsCount'])
  }
}
</script>