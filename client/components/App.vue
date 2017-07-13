<style>
.faderoute-enter-active, .faderoute-leave-active {
  transition: opacity .1s ease;
}
.faderoute-enter, .faderoute-leave-active {
  opacity: 0;
}

</style>

<template lang="pug">
#app.directbot(:class="{'standalone': isStandalone }")
  .landing-background(v-if="$route.name=='home'&&!isTrendever")

  .router-header
    .plank

  template(v-if="!noSockConnection")

    transition(:name="transName" mode="out-in")
      router-view(v-if="authDone && monetizationDone")

    listener(v-if="authDone")
    monetization(v-if="authDone", v-on:checkbot="monetizationDone = true")

  template(v-if="noSockConnection")

    router-view


  native-popup(:show-popup="popups.clipboard")
    .title-text.title-font Ссылка скопирована
    .main-text {{copyMessage}}
    .button-text(v-on:click.stop="closePopup")
      span OK

  //-popup-operator-info
  native-popup(:show-popup="popups.operatorInfo")
    .title-text.title-font Внимание!
    .main-text ДИАЛОГ КОНТРОЛИРУЮТ ЖИВЫЕ ОПЕРАТОРЫ
    .button-text(v-on:click.stop="closePopup")
      span OK

  //-desktop-phone
  native-popup(:show-popup="popups.showPhone")
    .title-text.title-font Звоните на
    .main-text {{ phoneNumber }}
    .button-text(v-on:click.stop="closePopup")
      span СПАСИБО

  native-popup.del-popup(:show-popup="popups.deleteChat")
    .title-text.title-font Осторожно!
    .main-text Подтвердите удаление
    .button-text
      span(@click.stop="deleteProduct") OK
      span(@click.stop="closePopup") Отмена

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
import { isStandalone } from 'root/utils'

export default {

  watch: {
    '$route' (to, from) {
      let routes = ['chat', 'profile', 'user', 'chat_list', 'product', 'home']
      if(routes.indexOf(to.name) != -1){
        this.transName = 'faderoute'
      } else {
        this.transName = ''
      }
    }
  },

  data(){
    return {
      authDone: false,
      monetizationDone: false,
      isStandalone: isStandalone(),
      noSockConnection: false,
      transName: '',

      //popups
      popups: {
        deleteChat: false,
        clipboard: false,
        operatorInfo: false,
        showPhone: false
      },
      //clipboard
      copyMessage: '',
      //phone
      phoneNumber: '',
    }
  },
  components: {
    Listener,
    Monetization,
    nativePopup
  },

  methods:{
    deleteProduct(){
      window.eventHub.$emit('action-delete-product')
    },
    closePopup(){
      for(let k in this.popups){
        this.popups[k]=false
      }
    }
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

    window.eventHub.$on('no-sock-connection',val=>{
      this.noSockConnection = val;
    })

    //Native popups
    window.eventHub.$on('popup-clipboard',val=>{
      this.popups.clipboard = true
      this.copyMessage = val
    })

    window.eventHub.$on('popup-delete-product', val=>{
      this.popups.deleteChat = val
    })

    window.eventHub.$on('popup-show-phone', val=>{
      this.popups.showPhone = true;
      this.phoneNumber = val;
    })

    window.eventHub.$on('popup-operator-info', val=>{
      this.popups.operatorInfo = true;
    })

    window.eventHub.$on('close-native-popup', val=>{
      this.closePopup()
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
@import 'style/vars/vars.pcss';

#app{
  height: 100%;

  .landing-background {
    display: none;
    position: fixed;
    top:0px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url(../views/home/img/DirectBot_landing-desk_pattern.png) repeat center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  &.standalone {
    .router-header {
      height: calc(89px + $standalone__fake__height);
      .plank {
        display: block;
        height: $standalone__fake__height;
        background: $color__brand;
      }
    }



  }
  .router-header {
    background: rgba(247,247,247,1);
    position: fixed 0 0 * 0;
    z-index: -1;
    height: 50px;
    @media (--tabletandless){
      height: 89px;
    }

    .plank {
      display: none;
    }
  }
}

</style>
