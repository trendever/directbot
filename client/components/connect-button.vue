<template lang="pug">

button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom.turn-on-bot-btn(
  @click="connectDirect", v-if="!hideConnectBtn")
  template(v-if="!isTrendever") ПОДКЛЮЧИТЬ INSTAGRAM
  template(v-if="isTrendever") НАЧАТЬ БИЗНЕС
</template>

<style lang="postcss">
  button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom.turn-on-bot-btn {
    position: fixed;
  }
</style>
<script>
import { connectDirect } from 'root/utils';

export default {
  data(){
    return {
      hideConnectBtn: false
    }
  },
  mounted(){
    window.eventHub.$on('hide-connect-btn', val => {this.hideConnectBtn = true});
  },
  methods:{
    connectDirect
  }
}

</script>

