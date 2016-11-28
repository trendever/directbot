<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description._6 Оператор через Directbot интегрируется в ваш #[br] Instagram
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
