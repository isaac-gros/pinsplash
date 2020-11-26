<template>
  <div id="error">
    <div v-if="errorType === 'not_found'">
      <h1 class="pt-10 pb-5 text-center">
      Nous avons beau avoir cherché, rien n'a été trouvé.</h1>
      <img src="/images/undraw-empty.png">
    </div>
    <div v-else>
      <h1 class="pt-10 pb-5 text-center">Quelque chose a mal fonctionné. Réessayez.</h1>
      <img src="/images/undraw-question.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    errorType: String
  }
}
</script>