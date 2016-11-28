<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description._7 ТЕХНОЛОГИЯ DIRECTBOT ПОЗВОЛЯЕТ ОДНОМУ ОПЕРАТОРУ ОБСЛУЖИВАТЬ НЕСКОЛЬКО МАГАЗИНОВ БЫСТРО #[br] И КАЧЕСТВЕННО
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
