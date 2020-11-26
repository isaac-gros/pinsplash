<template>
  <button
    @mouseover="isHovered = true" @mouseleave="isHovered = false"
    v-bind:class="{ 'animated': animationActive }"
    class="absolute top-3 right-3 flex flex-col w-10 h-10 rounded-full p-2 
    bg-white shadow-md focus:outline-none transition-colors duration-300">
    <span v-if="isPinned" class="w-6 h-6 block">
      <div v-if="animated || !isHovered">
        <svg xmlns='http://www.w3.org/2000/svg' class='fill-current text-green-800' viewBox='0 0 512 512'>
          <title>Ajouté aux éplingles</title>
          <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M416 128L192 384l-96-96'/>
        </svg>
      </div>
      <div v-else-if="isHovered && !animated">
        <svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'>
          <title>Retirer des épingles</title>
          <path d='M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/>
          <path stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M80 112h352'/>
          <path d='M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/>
        </svg>
      </div>
    </span>
    <span v-else class="w-6 h-6 block">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-current text-red-500">
        <title>Ajouter aux épingles</title>
        <path d="M256 448l-9-6c-42.78-28.57-96.91-60.86-137-108.32-42.25-50-62.52-101.35-62-157C48.63 114.54 98.46 64 159.08 64c48.11 0 80.1 28 96.92 48.21C272.82 92 304.81 64 352.92 64c60.62 0 110.45 50.54 111.08 112.65.56 55.68-19.71 107-62 157-40.09 47.49-94.22 79.78-137 108.35z"/>
      </svg>
    </span>
  </button>
</template>

<script>
export default {
  name: 'PhotoAction',
  props: {
    isPinned: Boolean,
    animated: Boolean,
  },
  data() {
    return {
      isHovered: false,
      animationActive: false,
    }
  },
  updated() {
    this.animationActive = this.animated
  }
}
</script>