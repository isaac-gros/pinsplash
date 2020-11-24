<template>
  <div class="flex flex-col justify-items-center max-w-xl mx-auto mt-5">
    <h1 class="text-center text-2xl">
      {{ teamName }}
      <span v-if="hasPlayerSelected()">
        — Sélection : x{{ selectedPlayers.length }}.
      </span>
    </h1>
    <div class="cards flex flex-wrap">
      <player-card 
        v-for="(player, index) in teamPlayers" 
        :key="index"
        :isSelected="isSelected(player)"
        :player-data="player"
        @add-player="addPlayer"
      />
      <div class="last-item flex-grow flex justify-center items-center">
        <custom-button
          class="btn btn-red float-right" 
          buttonText="Réinitialiser" @click="resetSelections"></custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import teamData from '../data/teamData.json';
import PlayerCard from '../components/PlayerCard';
import CustomButton from '../components/CustomButton.vue';

export default {
  name: 'home',
  components: {
    CustomButton,
    PlayerCard
  },
  data: () => {
    return {
      selectedPlayers: [],
      teamData: teamData
    }
  },
  computed: {
    teamName: () => {
      return teamData.name;
    },
    teamPlayers: () => {
      return teamData.players;
    }
  },
  methods: {
    addPlayer(payload) {
      this.selectedPlayers.push(payload)
    },
    resetSelections() {
      this.selectedPlayers = [];
    },
    hasPlayerSelected() {
      return (this.selectedPlayers.length > 0); 
    },
    isSelected(player) {
      return this.selectedPlayers.includes(player);
    },
  }
}
</script>