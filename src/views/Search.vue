<template>
  <div id="search">
    <div v-if="picturesFound">
      <p>Résultats de la recherche pour {{ $route.params.query }}</p>
      <div class="masonry" v-for="picturePage in picturesPages.pictures" :key="picturePage.pictures.page">
        <p class="page_index">Page {{ picturePage.page }} —</p>
        <photo 
          v-for="picture in picturePage.pictures" 
          :key="picture.id"
          :picture="picture"
          :pictureId="picture.id"
          :ratio="picturesHeightRatio">
        </photo>
      </div>
    </div>
    <div v-if="(!picturesFound || displayError) && !isFetchingPictures">
      <error :errorType="errorType"></error>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Photo from '../components/Photo'
import Error from "../components/Error"

export default {
  name: 'Search',
  components: { Photo, Error },
  data() {
    return {
      displayError: false,
      errorType: 'error',
      isFetchingPictures: true,
      picturesFound: false,
      picturesPages: [],
      picturesHeightRatio: 0,
    }
  },
  methods: {
    ...mapActions(['searchPictures', 'resetPictures']),
    updateSearch() {
      this.searchPictures(this.$route.params.query).then(response => {
        if(response.total != 0) {
          this.picturesFound = true
          this.picturesPages = response
          this.displayError = false
          this.isFetchingPictures = false
        } else {
          this.errorType = 'not_found'
          this.isFetchingPictures = false
          this.picturesFound = false
        }
      }).catch(error => {
        console.log(error)
        this.isFetchingPictures = false
        this.picturesFound = false
        this.displayError = true
      })
    },
    handleScroll() {
      let scrollHeight = document.body.scrollHeight;
      let scrollPos = window.scrollY || window.scrollTop;
      let windowHeight = window.innerHeight;
      let beforeEnd = scrollHeight - (scrollPos + windowHeight - 50);

      if (beforeEnd < 100 && !this.isFetchingPictures) {
        this.updateSearch();
      }
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.updateSearch()
  },
  watch: {
    $route(to, from) {
      if(to.name != 'pins' || from.name == 'pins') {
        this.resetPictures().then(() => {
          return
        })
      }
    }
  }
}
</script>