<!-- <style src="./styles/info-screen.pcss"></style>
<template lang="pug">
.info-screen
  i.ic-close(v-if="isMobile")
  .description.1 Наш опытный оператор, вооружившись Directbot-ом, обслужит всех ваших клиентов быстро и в любое время дня и ночи.  Он вежливо поговорит  с покупателем прямо  в Instagram Direct,  как консультант от  имени вашего магазина. Вы не тратите время на клиентов, которые не покупают
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
