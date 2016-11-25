<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  //i.ic-close(@click='closePage', v-if="isMobile")
  .description.second Узнает для вас телефон покупателя, отправит ему ссылку на ваш сайт  и товар. Потом узнает размеры, сверит  с наличием. Спросит адрес доставки или запишет  в шоу-рум. Клиент доволен быстрой реакцией, а у вас останется больше времени  на личное общение
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
  }
}
</script>

<style lang="css">
</style>
