<template lang="pug">

#monetization
  .monetization-popup

</template>

<script>
export default {

  created(){

    this.checkbot();
    this.$root.$on('checkbot-after',this.checkbot)

  },

  methods:{

    checkbot(){

      if(!this.$store.getters.isAuth) {
        this.$emit('checkbot');
        return;
      }

      this.$store.dispatch('setMonetization')
        .then(()=>{
          //Показывать части сайта после проверки с сервера
          this.$emit('checkbot');
        })
        .catch(()=>{
          this.$emit('checkbot');
        })

    }

  }

};

</script>

<style lang="postcss">
</style>
