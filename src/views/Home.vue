<template>
  <div id="home">
    <div :v-if="picturesFound">
      <div class="masonry" v-for="picturePage in picturesPages" :key="picturePage.page">
        <p class="page_index">Page {{ picturePage.page }} —</p>
        <photo 
          v-for="picture in picturePage.pictures" 
          :key="picture.id"
          :src="picture.urls.regular"
          :alt="picture.alt_description">
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
      isFetchingPictures: true,
      picturesFound: false,
      picturesPages: []
    }
  },
  methods: {
    ...mapActions([
      'fetchPictures',
      'debug'
    ]),
    updatePictures() {
      this.isFetchingPictures = true
      this.fetchPictures().then(response => {
        console.log(response)
        this.isFetchingPictures = false
        this.picturesPages = response
        this.picturesFound = true
      })
    },
    handleScroll() {
      let scrollHeight = document.body.scrollHeight
      let scrollPos = window.scrollY || window.scrollTop
      let windowHeight = window.innerHeight;
      let beforeEnd = scrollHeight - ((scrollPos + windowHeight) - 50)

      if(beforeEnd < 100 && !this.isFetchingPictures) {
        this.updatePictures();
      }
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted() {
    this.updatePictures()
  },
  updated() {
    this.picturesFound = (this.picturesPages.length > 0)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>