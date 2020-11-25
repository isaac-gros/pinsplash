<template>
  <div class="photo w-full max-w-full block mb-5 relative">
      <img :src="picture.urls.regular">
      <p class="title absolute bottom-0 left-0 p-2 text-white bg-black bg-opacity-30 w-full">
        {{ titleCase }}
      </p>
      <photo-action :isPinned="isPinned" @click="pinAction"></photo-action>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PhotoAction from './PhotoAction.vue'

export default {
  components: { 
    PhotoAction 
  },
  name: 'photo',
  props: {
    picture: Object,
  },
  data() {
    return {
      isPinned: false,
    }
  },
  computed: {
    titleCase() {
      if(this.picture.alt_description) {
        let firstLetter = this.picture.alt_description.charAt(0).toUpperCase()
        let endOfString = this.picture.alt_description.substring(1)
        return firstLetter + endOfString
      } else {
        return 'Untitled'
      }
    }
  },
  mounted() {
    this.checkPinStatus()
  },
  methods: {
    ...mapActions(['checkPin', 'addPin', 'removePin']),
    checkPinStatus() {
      let pins = this.$store.state.pins
      this.isPinned = pins.includes(this.picture)
    },
    pinAction() {
      if(this.isPinned) {
        this.removePin(this.picture).then(() => {
          this.checkPinStatus()
        })
      } else {
        this.addPin(this.picture).then(() => {
          this.checkPinStatus()
        })
      }
    }
  }
}
</script>