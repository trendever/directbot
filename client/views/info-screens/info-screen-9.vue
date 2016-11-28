<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  //i.ic-close(@click='closePage', v-if="isMobile")
  .description._9 НАЖМИТЕ КНОПКУ НАЙТИ БЛОГЕРА ПОД СВОИМ ТОВАРОМ, #[br] И МЫ НАЧНЕМ РАССЫЛАТЬ ПРЕДЛОЖЕНИЯ БЛОГЕРАМ. #[br] ОБЫЧНО ОПЛПАТА ПО БАРТЕРУ
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
