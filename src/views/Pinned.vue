<template>
  <div id="pinned">
    <div :v-if="picturesFound">
      <p>
        <span v-if="!pinsFound">
          Vous ne semblez pas avoir d'épingles. 
          <router-link
            class="font-bold underline" 
            to="/">Commencez mainteant.</router-link>
        </span>
        <span v-else>Vos épingles</span>
      </p>
      <div class="masonry">
        <photo
          v-for="picture in pins" 
          :key="picture.id"
          :picture="picture"
          :pictureId="picture.id"
          :ratio="0">
        </photo>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Photo from '../components/Photo';

export default {
  name: 'Home',
  components: {
    Photo
  },
  data() {
    return {
      pinsSearching: true,
      pinsFound: false,
      pins: []
    }
  },
  created() {
    this.searchPins()
  },
  updated() {
    this.searchPins()
  },
  methods: {
    ...mapActions(['getPins', 'removePin']),
    searchPins() {
      this.getPins().then(response => {
        if(response.length > 0) {
          this.pinsFound = true
          this.pins = response
        } else {
          this.pinsFound = false
        }
      })
    }
  }
}
</script>