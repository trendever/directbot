<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  //i.ic-close(v-on:click="closePage")
  .description._1 Наш опытный оператор, вооружившись Directbot-ом, обслужит всех ваших клиентов быстро и в #[br] любое время дня и ночи. #[br] Он вежливо поговорит #[br] с покупателем прямо #[br] в Instagram Direct, #[br] как консультант от #[br] имени вашего магазина. #[br] Вы не тратите время #[br] на клиентов, которые не покупают
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
