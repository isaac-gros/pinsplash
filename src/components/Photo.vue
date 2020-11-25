<template>
  <div class="photo w-full max-w-full block mb-5 relative" :id="pictureId" :style="defaultColor + defaultHeight">
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
    pictureId: String,
    ratio: Number,
  },
  data() {
    return {
      imgElement: '',
      defaultHeightValue: 0,
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
    },
    defaultColor() {
      return "background-color: " + this.picture.color + ";"
    },
    defaultHeight() {
      return "min-height: " + this.defaultHeightValue + ";"
    }
  },
  created() {
    let thisRef = this
    let img = new Image()
    img.src = this.picture.urls.regular
    img.onload = function() {
      thisRef.defaultHeightValue = (this.naturalHeight / thisRef.ratio)
    }

    this.imgElement = img
  },
  mounted() {
    document.getElementById(this.pictureId).prepend(this.imgElement) 
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
    },
  }
}
</script>