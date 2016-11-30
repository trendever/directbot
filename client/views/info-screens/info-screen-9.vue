<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description._9 НАЖМИТЕ КНОПКУ НАЙТИ БЛОГЕРА #[br(v-if="!isMobile")] ПОД СВОИМ ТОВАРОМ, #[br(v-if="isMobile")] И МЫ НАЧНЕМ РАССЫЛАТЬ ПРЕДЛОЖЕНИЯ БЛОГЕРАМ. #[br] ОБЫЧНО ОПЛПАТА ПО БАРТЕРУ
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
