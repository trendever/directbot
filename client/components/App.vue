<style>
.faderoute-enter-active, .faderoute-leave-active {
  transition: opacity .3s ease;
}
.faderoute-enter, .faderoute-leave-active {
  opacity: 0;
}

</style>

<template lang="pug">
#app.directbot(:class="{'standalone': isStandalone}")

  template(v-if="!noSockConnection")

    transition(:name="transName" mode="out-in")
      router-view(v-if="authDone && monetizationDone")

    listener(v-if="authDone")
    monetization(v-if="authDone", v-on:checkbot="monetizationDone = true")

  template(v-if="noSockConnection")

    router-view

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

  //-desktop-phone
  native-popup(:show-popup="showDesktopPhone")
    .title-text.title-font Звоните на
    .main-text {{ phoneNumber }}
    .button-text(v-on:click.stop="showDesktopPhone = false")
      span СПАСИБО

  input(type="hidden", value="", id="get-user-login")
</template>

<script>

import 'style/fonts/trendever-icons/trendever-icons.font.js';
import 'style/index.pcss';


import store from 'root/store';
import Listener from './Listener.vue';
import Monetization from './Monetization.vue';
import nativePopup from 'components/popup/native';

import { setToken } from 'services/user';

export default {

  watch: {
    '$route' (to, from) {
      this.transName = to.name==="chat" ? 'faderoute' : ''
    }
  },

  data(){
    return {
      authDone: false,
      monetizationDone: false,
      showOperatorInfo: false,

      //clipboard
      showCopyMessage: false,
      copyMessage: '',
      //phone
      showDesktopPhone: false,
      phoneNumber: '',
      isStandalone: window.browser.standalone,

      noSockConnection: false,
      transName: ''
    }
  },
  components: {
    Listener,
    Monetization,
    nativePopup
  },

  //get user for ios push actions logic

  created(){

    let self = this;

    window.setUserToken = function(token,type){
      setToken(token,type).then(data => console.log(data));
    },

    window.authIsDone = function(){
      if (self.$store.state.user.token != null){
        return true;
      }else{
        return false;
      }
    }
    window.entryPoint = this.$route.name;
  },


  mounted(){

    window.eventHub.$on('no-sock-connection',data=>{
      this.noSockConnection = data;
    })

    window.eventHub.$on('show-desktop-phone', data=>{
      this.showDesktopPhone = true;
      this.phoneNumber = data;
    })

    window.eventHub.$on('copy-product-link', data=>{
      this.showCopyMessage = true;
      this.copyMessage = data;
    })

    window.eventHub.$on('show-operator', data=>{
      this.showOperatorInfo = true;
    })
  },
  beforeCreate(){
    if ( this.$route.query && this.$route.query.token) {
      let token = this.$route.query.token;
      store.dispatch('authUser',{token})
      .then(()=>{
        this.authDone = true;
      })
      .then( () => {
        let banners = JSON.parse(localStorage.getItem('bannerInfo'));
        if(banners){
          this.$store.state.monetization.bannerInfo = banners;
        }
      })
    }else{
      store
      .dispatch('authUser', {} )
      .then( () => {
        this.authDone = true;
      })
      .then( () => {
        let banners = JSON.parse(localStorage.getItem('bannerInfo'));
        if(banners){
          this.$store.state.monetization.bannerInfo = banners;
        }
      })
    }
  }
}

</script>

<style lang="postcss">

@import 'style/vars/fonts.pcss';

#app{
  height: 100%;
}

</style>
