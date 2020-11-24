<template>
  <div id="home">
    <h1>This is the homepage.</h1>
    <div :v-if="picturesFound">
      <div id="masonry">
        <photo 
          v-for="picture in pictures" 
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
      picturesFound: false,
      pictures: []
    }
  },
  methods: {
    ...mapActions([
      'fetchPictures',
      'debug'
    ]),
  },
  mounted() {
    this.fetchPictures().then(response => {
      this.pictures = response;
      this.picturesFound = true;
    })
  },
  updated() {
    this.picturesFound = (this.pictures.length > 0);
  }
}
</script>