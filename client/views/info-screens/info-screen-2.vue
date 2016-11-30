<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description._2 Узнает для вас телефон покупателя, отправит ему ссылку на ваш сайт #[br(v-if="isMobile")] и товар. #[br(v-if="!isMobile")] Потом узнает размеры, сверит #[br] с наличием. Спросит адрес доставки или запишет #[br(v-if="isMobile")] в шоу-рум. Клиент доволен быстрой реакцией, а у вас останется больше времени #[br(v-if="isMobile")] на личное общение
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
