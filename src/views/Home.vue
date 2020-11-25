<template>
  <div id="home">
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
      picturesPages: [],
      picturesHeightRatio: 0,
    }
  },
  methods: {
    ...mapActions(['fetchPictures']),
    updatePictures() {
      this.isFetchingPictures = true
      this.fetchPictures().then(response => {
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
    },
    setDefaultImageRatio() {
      let breakpoints = [
        {min_width: 1536, max_width: Infinity, ratio: 2.159}, // xxl
        {min_width: 1280, max_width: 1536, ratio: 2.599}, // xl
        {min_width: 1024, max_width: 1280, ratio: 3.279}, // lg
        {min_width: 768, max_width: 1024, ratio: 4.425}, // md
        {min_width: 640, max_width: 768, ratio: 3.478}, // sm
        {min_width: 0, max_width: 768, ratio: 3.478}, // xs
      ]

      // Calculate the min height of the img element 
      // based on container sizes
      let windowWidth = window.innerWidth
      for(let i = 0; i < breakpoints.length; i++) {
        if(windowWidth > breakpoints[i].min_width && windowWidth < breakpoints[i].max_width) {
          this.picturesHeightRatio = breakpoints[i].ratio
          break;
        }
      }
    }
  },
  created() {
    window.onresize = this.setDefaultImageRatio()
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