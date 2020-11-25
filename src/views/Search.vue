<template>
  <div id="search">
    <p>Résultats de la recherche pour {{ $route.params.query }}</p>
    <div :v-if="picturesFound">
      <div class="masonry" v-for="picturePage in picturesPages" :key="picturePage.page">
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Photo from '../components/Photo'

export default {
  name: 'Search',
  components: {
    Photo
  },
  data() {
    return {
      isFetchingPictures: true,
      picturesFound: false,
      picturesPages: [],
      picturesHeightRatio: 0,
    }
  },
  methods: {
    ...mapActions(['searchPictures']),
    updateSearch() {
      this.searchPictures(this.$route.params.query).then(response => {
        this.picturesFound = response.length > 0
        this.picturesPages = response
      })
    }
  },
  created() {
    this.updateSearch()
  }
}
</script>