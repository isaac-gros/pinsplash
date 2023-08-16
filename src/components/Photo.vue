<template>
  <div class="photo w-full max-w-full block mb-5 relative" :id="pictureId">
      <lazy-image-item
        :width="1080" 
        :height="defaultHeightValue"
        :backgroundColor="picture.color" 
        :lazySrc="picture.urls.regular">
      </lazy-image-item>
      <p class="title absolute bottom-0 left-0 p-2 text-white bg-black bg-opacity-30 w-full">
        {{ titleCase }}
      </p>
      <photo-action :isPinned="isPinned" :animated="doPinAnimaiton" @click="pinAction">
      </photo-action>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PhotoAction from './PhotoAction.vue'
import LazyImageItem from './LazyImage.vue'

export default {
  components: { PhotoAction, LazyImageItem },
  name: 'PhotoItem',
  props: {
    picture: Object,
    pictureId: String,
    ratio: Number,
  },
  data() {
    return {
      imgElement: '',
      picturesHeightRatio: 0,
      defaultHeightValue: 0,
      isPinned: false,
      doPinAnimaiton: false,
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
    },
  },
  created() {
    // The images returned with urls.regular are always
    // 1080px wide. this.picture.width return the full width of the image
    let pictureWidth = 1080
    let proportion = this.picture.width / pictureWidth
    let pictureHeight = this.picture.height / proportion
    this.defaultHeightValue = pictureHeight
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
        this.doPinAnimaiton = true
        this.addPin(this.picture).then(() => {
          this.checkPinStatus()
          setTimeout(() => {
            this.doPinAnimaiton = false
          }, 1000)
        })
      }
    },
  }
}
</script>