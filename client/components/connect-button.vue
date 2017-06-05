<template lang="pug">

button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom.turn-on-bot-btn(
  @click="connect")
  template(v-if="!isTrendever") ПОДКЛЮЧИТЬ INSTAGRAM
  template(v-if="isTrendever") НАЧАТЬ БИЗНЕС
</template>

<style lang="postcss">
  button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom.turn-on-bot-btn {
    position: fixed;
  }
</style>
<script>

export default {

  methods:{
    connect(){
      if(!this.isTrendever){
        this.$router.push({name: 'connect-bot'})
      } else {
        window.open('directbot.io/profile?token=' + this.$store.state.user.token)
      }
    }
  }
}

</script>

