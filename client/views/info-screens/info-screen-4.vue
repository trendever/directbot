<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description._4 Directbot сканирует твой Instagram на ключевые слова и уведомляет оператора #[br] о клиентах
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
