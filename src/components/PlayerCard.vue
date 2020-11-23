<template>
  <div class="card" v-if="!isSelected">
    <p>{{ firstName }} - {{ position }}</p>
    <custom-button
      class="btn btn-blue mt-2"
      buttonText="J'achète !"
      :disabled="isSelected"
      @click="playerSelection"
    ></custom-button>
  </div>
</template>

<script>
import CustomButton from './CustomButton.vue';

export default {
  name: 'player-card',
  components: {
    CustomButton
  },
  props: {
    playerData: Object,
    isSelected: Boolean,
    isInjured: Boolean,
  },
  computed: {
    firstName() {
      let playerName = this.playerData.name.split('.');
      return (playerName.length > 1) ? playerName[1] : this.playerData.name;
    },
    position() {
      return this.playerData.position
    }
  },
  methods: {
    playerSelection() {
      this.$emit('add-player', this.playerData);
    },
  }
}
</script>