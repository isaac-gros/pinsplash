<template>
  <form id="searchbar" method="get" @submit.prevent="doSearch" 
    :class="{'is-open': isOpen}"
    class="flex justify-end flex-grow">
    <button id="toggle-search" 
    class="focus:outline-none block px-2 w-8 bg-white">
      {{ isOpen ? '›' : '‹'}}
    </button>
    <input
    class="w-full max-w-xs p-2 border-gray-200 border-b focus:outline-none" v-model="query" type="text" placeholder="Rechercher..." />
    <button type="submit" class="w-8 h-full p-2 border-gray-200 border-b hover:bg-gray-200 focus:bg-gray-300 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 text-gray-800 fill-current" viewBox="0 0 512 512">
        <title>Search</title>
        <path d="M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z" />
      </svg>
    </button>
  </form>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      isOpen: false,
      query: undefined,
    }
  },
  mounted() {
    this.query = this.$route.params.query
  },
  methods: {
    doSearch() {
      (this.isOpen) ? this.closeMenu() : this.openMenu()
      if(typeof(this.query) != 'undefined' && this.query != '') {
        this.$router.push({ name: 'search', params: { query: this.query } })
      }
    },
    openMenu() {
      this.isOpen = true
    },
    closeMenu() {
      this.isOpen = false
    }
  },
  computed: {
    formAction() {
      return '/search/' + this.query
    }
  },
}
</script>
