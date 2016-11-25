<!-- <style src="./styles/info-screen.pcss"></style>
<template lang="pug">
.info-screen
  i.ic-close(@click='closePage', v-if="isMobile")
  .description.second Узнает для вас телефон покупателя, отправит ему ссылку на ваш сайт  и товар. Потом узнает размеры, сверит  с наличием. Спросит адрес доставки или запишет  в шоу-рум. Клиент доволен быстрой реакцией, а у вас останется больше времени  на личное общение
</template>

<script>
export default {
  data () {
    return {
      isMobile: window.browser.mobile
    }
  },
  computed: {},
  mounted () {},
  methods: {
    closePage(){
      if(window.history.length > 3){
        window.history.back();
        return;
      }
      this.$router.go({name: 'home'})
    }
  },
  components: {}
}
</script>

<style lang="css">
</style> -->
