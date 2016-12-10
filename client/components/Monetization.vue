<template lang="pug">

#monetization
  .monetization-popup

</template>

<script>
export default {

  beforeCreate(){

    this.$store.dispatch('setMonetization')

      .then(()=>{
        //Показывать части сайта после проверки с сервера
        this.$emit('checkbot');
      })

      .catch(()=>{
        this.$emit('checkbot');
      })

  }

};

</script>

<style lang="postcss">
</style>
