<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description._5 Да, вы не ослышались, #[br] мы создадим вам интернет-магазин доступный с любых устройств и наполним #[br] его товарами из вашего Instagram. Поможем поддерживать ассортимент актуальным, просто задавая вопросы в чате. А еще, больше не нужно беспокоиться об оплате и доставке
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
