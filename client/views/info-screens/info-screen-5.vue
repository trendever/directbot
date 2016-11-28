<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  //i.ic-close(@click='closePage', v-if="isMobile")
  .description._5 Да, вы не ослышались, #[br] мы создадим вам интернет-магазин доступный с любых устройств и наполним #[br] его товарами из вашего Instagram. Поможем поддерживать ассортимент актуальным, просто задавая вопросы в чате. А еще, больше не нужно беспокоиться об оплате и доставке
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
  },
}
</script>

<style lang="css">
</style>
