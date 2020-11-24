<template>
  <div class="container mx-auto mt-10">
    <h1 class="text-4xl">Pinsplash</h1>
    <div id="nav">
      <router-link to="/">Accueil</router-link>
      <router-link to="/pinned">Épingles</router-link>
    </div>
    <router-view/>
  </div>
</template>