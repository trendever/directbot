<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description._10 DIRECTBOT - это eCommerce платформа для InstАgram магазинов, к которой #[br(v-if="isMobile")] вы можете подключить #[br(v-if="isMobile")] себя и команду
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
