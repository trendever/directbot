<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  //i.ic-close(v-on:click="closePage")
  .description.first Наш опытный оператор, вооружившись Directbot-ом, обслужит всех ваших клиентов быстро и в любое время дня и ночи.  Он вежливо поговорит  с покупателем прямо  в Instagram Direct,  как консультант от  имени вашего магазина. Вы не тратите время на клиентов, которые не покупают
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
