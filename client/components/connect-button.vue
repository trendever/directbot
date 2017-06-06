<template lang="pug">

button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom.turn-on-bot-btn(
  @click="connect", v-if="!hideConnectBtn")
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
  data(){
    return {
      hideConnectBtn: false
    }
  },
  mounted(){
    window.eventHub.$on('hide-connect-btn', val => {this.hideConnectBtn = val});
  },
  methods:{
    connect(){
      if(!this.isTrendever){
        this.$router.push({name: 'connect-bot'})
      } else {
        window.open('https://directbot.io/profile?token=' + this.$store.state.user.token)
      }
    }
  }
}

</script>

