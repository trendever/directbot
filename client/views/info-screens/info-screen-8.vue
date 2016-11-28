<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  //i.ic-close(@click='closePage', v-if="isMobile")
  .description._8 ВЫ ПОЛУЧИТЕ ПОЛНОЦЕННЫЙ ИНТЕРНЕТ-МАГАЗИН, С СЕРВИСАМИ ПО ПРИЕМУ ПЛАТЕЖЕЙ #[br] И ОРГАНИЗАЦИИ ДОСТАВКИ. #[br] ОЧЕНЬ ПРОСТОЙ В УПРАВЛЕНИИ
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
