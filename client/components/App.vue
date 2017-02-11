<template lang="pug">
#app.directbot
  router-view(v-if="authDone && monetizationDone")
  listener(v-if="authDone")
  monetization(v-if="authDone", v-on:checkbot="monetizationDone = true")


  //-clipboard
  native-popup(:show-popup="showCopyMessage")
    .title-text.title-font Ссылка скопирована
    .main-text {{copyMessage}}
    .button-text(v-on:click.stop="showCopyMessage = false")
      span OK

  //-show-operator
  native-popup(:show-popup="showOperatorInfo")
    .title-text.title-font Внимание!
    .main-text ДИАЛОГ КОНТРОЛИРУЮТ ЖИВЫЕ ОПЕРАТОРЫ
    .button-text(v-on:click.stop="showOperatorInfo = false")
      span OK


</template>

<script>

import 'style/fonts/trendever-icons/trendever-icons.font.js';
import 'style/index.pcss';


import store from 'root/store';
import Listener from './Listener.vue';
import Monetization from './Monetization.vue';
import nativePopup from 'components/popup/native';

export default {
  data(){
    return {
      authDone: false,
      monetizationDone: false,

      //clipboard
      showCopyMessage: false,
      copyMessage: '',
      showOperatorInfo: false
    }
  },
  components: {
    Listener,
    Monetization,
    nativePopup
  },
  mounted(){
    window.eventHub.$on('copy-product-link', data=>{
      this.showCopyMessage = true;
      this.copyMessage = data;
    })

    window.eventHub.$on('show-operator', data=>{
      this.showOperatorInfo = true;
    })
  },
  beforeCreate(){

    store
      .dispatch('authUser', { null, null } )
      .then( () => {
        this.authDone = true;
      })
      .then( () => {
        let banners = JSON.parse(localStorage.getItem('bannerInfo'));
        console.log(banners)
        if(banners){
          this.$store.state.monetization.bannerInfo = banners;
        }
      })
  }
}

</script>

<style lang="postcss">

@import 'style/vars/fonts.pcss';

* {

  box-sizing: border-box;
  margin: 0;
  padding: 0;

}

body, html {
  height: auto;
  font-size: 14px;
  font-family: $font__family;

  @media screen and (max-width:1023px) {
    height: 100%;
  }
}

#app{
  height: 100%;
}

</style>
