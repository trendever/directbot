<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description._8 ВЫ ПОЛУЧИТЕ ПОЛНОЦЕННЫЙ ИНТЕРНЕТ-МАГАЗИН, С СЕРВИСАМИ ПО ПРИЕМУ ПЛАТЕЖЕЙ #[br(v-if="isMobile")] И ОРГАНИЗАЦИИ ДОСТАВКИ. #[br] ОЧЕНЬ ПРОСТОЙ В УПРАВЛЕНИИ
</template>

<script>
export default {
  methods: {
    closePage(){

      this.$emit('info-popup.close')
    }
  }
}
</script>

<style lang="css">
</style>
