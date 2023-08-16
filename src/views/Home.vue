<template>
  <div id="home">
    <div v-if="picturesFound">
      <div class="masonry" v-for="picturePage in picturesPages" :key="picturePage.page">
        <p class="page_index">Page {{ picturePage.page }} —</p>
        <photo-item v-for="picture in picturePage.pictures" :key="picture.id" :picture="picture" :pictureId="picture.id"> </photo-item>
      </div>
    </div>
    <div v-if="(!picturesFound || displayError) && !isFetchingPictures">
      <error errorType="error"></error>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PhotoItem from "../components/Photo";
import Error from "../components/Error";

export default {
  name: "HomeView",
  components: { PhotoItem, Error },
  data() {
    return {
      displayError: false,
      isFetchingPictures: false,
      picturesFound: false,
      picturesPages: [],
    };
  },
  methods: {
    ...mapActions(["fetchPictures", "resetPictures"]),
    updatePictures() {
      if(!this.isFetchingPictures) {
        this.isFetchingPictures = true
        this.fetchPictures().then((response) => {
          this.displayError = false
          this.picturesPages = response
          this.picturesFound = true
          setTimeout(() => {
            this.isFetchingPictures = false
          }, 3000)
        }).catch(error => {
          console.log(error)
          this.isFetchingPictures = false
          this.displayError = true
        });
      }
    },
    handleScroll() {
      let scrollHeight = document.body.scrollHeight;
      let scrollPos = window.scrollY || window.scrollTop;
      let windowHeight = window.innerHeight;
      let beforeEnd = scrollHeight - (scrollPos + windowHeight - 50);

      if (beforeEnd < 100) {
        this.updatePictures();
      }
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.updatePictures();
  },
  updated() {
    this.picturesFound = this.picturesPages.length > 0;
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    $route(to) {
      if(to.name == 'search') {
        this.resetPictures().then(() => {
          return
        })
      }
    }
  }
};
</script>