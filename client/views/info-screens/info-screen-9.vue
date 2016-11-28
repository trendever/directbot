<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description._9 НАЖМИТЕ КНОПКУ НАЙТИ БЛОГЕРА ПОД СВОИМ ТОВАРОМ, #[br] И МЫ НАЧНЕМ РАССЫЛАТЬ ПРЕДЛОЖЕНИЯ БЛОГЕРАМ. #[br] ОБЫЧНО ОПЛПАТА ПО БАРТЕРУ
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
