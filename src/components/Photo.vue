<template>
  <div class="photo w-full max-w-full h-auto block mb-5 relative">
      <img :src="src">
      <p class="title absolute bottom-0 left-0 p-2 text-white bg-black bg-opacity-30 w-full">
        {{ titleCase }}
      </p>
      <button class="
      absolute top-3 right-3 flex flex-col w-10 h-10 rounded-full p-2 
      bg-white shadow-md focus:outline-none hover:bg-gray-300 transition-colors duration-300
      ">
        <photo-button-icon></photo-button-icon>
      </button>
  </div>
</template>

<script>
import PhotoButtonIcon from './PhotoButtonIcon.vue'

export default {
  components: { 
    PhotoButtonIcon 
  },
  name: 'photo',
  props: {
    src: String,
    alt: String,
  },
  computed: {
    titleCase() {
      if(this.alt) {
        let firstLetter = this.alt.charAt(0).toUpperCase()
        let endOfString = this.alt.substring(1)
        return firstLetter + endOfString
      } else {
        return 'Untitled'
      }
    }
  }
}
</script>