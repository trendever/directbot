<!-- <style src="./styles/info-screen.pcss"></style>
<template lang="pug">
.info-screen
  i.ic-close(@click='closePage', v-if="isMobile")
  .description.fourth Да, вы не ослышались,  мы создадим вам интернет-магазин доступный с любых устройств и наполним  его товарами из вашего Instagram. Поможем поддерживать ассортимент актуальным, просто задавая вопросы в чате. А еще, больше не нужно беспокоиться об оплате и доставке
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
