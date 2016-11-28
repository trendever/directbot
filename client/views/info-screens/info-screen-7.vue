<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  //i.ic-close(@click='closePage', v-if="isMobile")
  .description._7 ТЕХНОЛОГИЯ DIRECTBOT ПОЗВОЛЯЕТ ОДНОМУ ОПЕРАТОРУ ОБСЛУЖИВАТЬ НЕСКОЛЬКО МАГАЗИНОВ БЫСТРО #[br] И КАЧЕСТВЕННО
</template>

<script>
export default {
  methods: {
    closePage(){
      if(window.history.length > 3){
        window.history.back();
        return;
      }
      this.$router.push({name: 'home'})
    }
  },
}
</script>

<style lang="css">
</style>
