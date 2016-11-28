<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description._3 Мы знаем как много сейчас разных CRM для управления продажами. Наш сервис #[br] хорош тем, что работает #[br] на вас, а не вы в нем. Нужно просто нажать на кнопку, #[br] а не разбираться в новых приложениях и программах
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
