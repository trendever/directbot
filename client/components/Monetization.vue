<template lang="pug">

#monetization
  .monetization-popup

</template>

<script>
export default {

  beforeCreate(){

    this.$store.dispatch('setMonetization')

  }

};

</script>

<style lang="postcss">
</style>
