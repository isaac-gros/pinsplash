<template>
  <div class="container mx-auto">
    <h1 class="text-4xl" id="title">Pinsplash</h1>
    <div id="nav" class="py-5 flex w-full sticky top-0 z-10 bg-white border-t border-black">
      <router-link to="/">Accueil</router-link>
      <router-link to="/pinned" class="flex items-center">
        Épingles
        <span
          class="ml-3 flex items-center justify-center text-center w-5 h-5 
          bg-blue-700 text-white text-sm rounded-full" 
          v-if="(pinsCount) > 0">
          {{ pinsCount }}
        </span>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['pinsCount'])
  }
}
</script>