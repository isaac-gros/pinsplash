<template>
  <img
    :data-src="lazySrc"
    :data-srcset="lazySrcset"
    :style="style">
</template>

<script>
import lozad from 'lozad'

export default {
  name: 'LazyImage',
  props: {
    width: Number,
    height: Number,
    backgroundColor: String,
    lazySrc: String,
    lazySrcset: String,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    aspectRatio() {
      if (!this.width || !this.height) return null;
      return (this.height / this.width) * 100;
    },
    style() {
      const style = { backgroundColor: this.backgroundColor };
      if (this.width) style.width = `${this.width}px`;
      
      const applyAspectRatio = this.loading && this.aspectRatio;
      if (applyAspectRatio) {
        style.height = 0;
        style.paddingTop = `${this.aspectRatio}%`;
      }
      return style;
    },
  },
  methods: {
    setLoadingState() {
      this.loading = false;
    },
  },
  mounted() {
    this.$el.addEventListener('load', this.setLoadingState);
    const observer = lozad(this.$el);
    observer.observe();
  },
  beforeUnmount() {
    this.loading = false;
    this.$el.removeEventListener('load', this.setLoadingState);
  },
}
</script>