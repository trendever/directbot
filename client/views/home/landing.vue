<style src="./style.pcss"></style>
<template lang="pug">

#landing

  router-view

  .top-landing-background

  landing-top
  who-need
  show-bot
  operator-skills
  operator-actions
  toggle-role
  connect-get

  .free-connect(v-if="toggleBtns")
    a.link-info(@click.stop="openPopup('is10')")
      | ХОЧЕШЬ ПОДКЛЮЧИТЬ СВОЕГО  ОПЕРАТОРА? ИЛИ ТЫ САМ ОПЕРАТОР?

  .free-wrap(:class="{'fixed-btns': !isMobile && showBtns}")
    button( v-if="showBtns", :style="{zIndex: showBtns ? 190 : 0}",
      v-on:click="$router.push({name: 'auth'})").btn.btn_primary.__orange.__xl.fast__big__btn.try-free ПОПРОБОВАТЬ БЕСПЛАТНО
    button(v-if="isMobile && showBtns", :style="{zIndex: showBtns ? 190 : 0}", @click="ask").ask-btn СПРОСИТЬ
    button(v-if="!isMobile && showBtns", @click="ask").ask-btn СПРОСИТЬ В ЧАТЕ


</template>

<script>

import whoNeed from './parts/who-need';
import showBot from './parts/show-bot';
import operatorSkills from './parts/operator-skills';
import operatorActions from './parts/operator-actions';
import toggleRole from './parts/toggle-role';
import connectGet from './parts/connect-get';
import landingTop from './parts/landing-top';


import listen from 'event-listener';
import { mapGetters } from 'vuex';
import * as authService from 'services/auth';
import config from 'root/../config';

import JQuery from 'jquery';

export default {
  data(){
    return {
      toggleBtns: false,
      showBtns: false,
      windowHeight: 0,
      pricePopupShown: false
    }
  },
  created(){

    if(this.isAuth && !this.isFake){
      this.$router.replace({name: 'profile'})
    }

    window.eventHub.$on('open-landing-popup',name=>{this.openPopup(name)})
    window.eventHub.$on('toggle-landing-buttons',()=>{
      this.toggleBtns = true;
    })

    this.scrollListener=listen(window, 'scroll',()=>{

      if(this.isMobile){
        this.showBtns = document.body.scrollTop > window.innerHeight * 2;
      } else {
        this.showBtns = document.body.scrollTop > window.innerHeight;
      }

      if(document.body.scrollTop >= JQuery('#operator-skills').offset().top) {
        if(this.pricePopupShown) return;

        this.pricePopupShown = true;
        setTimeout(()=>{
          this.$router.push({name: 'home-info', params: {id: 'price'}});
        }, 7000)

      }
    })

    this.resize = listen(window, 'resize',()=>{
      if(window.browser.instagram) {
        this.windowHeight = window.innerHeight;
      }
    })

  },
  mounted(){
    this.$nextTick(()=>{
      if(window.browser.safari && !window.browser.instagram){
        this.windowHeight = document.body.offsetHeight;
      } else {
         this.windowHeight = window.innerHeight;
      }
    })
  },
  beforeDestroy(){
    this.scrollListener.remove();
    this.resize.remove();
  },
  methods: {
    openPopup(name){
      this.$router.push({name: 'home-info', params: {id: name}})
    },
    scrollFirst() {
      JQuery(document.body).animate({scrollTop: window.innerHeight},450);
    },
    scrollSecond() {
      JQuery(document.body).animate({scrollTop: 2 * window.innerHeight},450);
    },
    ask(){
      yaCounter42602829.reachGoal('askfrommain');
      let dispatch = this.$store.dispatch.bind(this);
      function openChat(vm){
        dispatch('createLead',config.info_id)
          .then(lead=>{
            dispatch('setFakeAction', 'chat-info');
            vm.$router.push({name: 'chat', params: { id: lead.id} })
          },err => console.log(err))
      }
      if(this.isFake && this.isAuth) {
        openChat(this);
        return;
      }
      if ( !this.isAuth ) {
        authService
          .fakeRegister()
          .then(({token,user})=>{
            dispatch('authUser', { user, token })
              .then( () => {
                openChat(this)
              })
        });
      }
    }
  },

  computed:{
    ...mapGetters([
      'isAuth',
      'isFake'
    ])
  },
  components:{
    whoNeed,
    landingTop,
    showBot,
    operatorSkills,
    operatorActions,
    toggleRole,
    connectGet
  }
}


</script>

<style lang="postcss">

@import 'style/vars/vars.pcss';

#landing {
  width: 100%;
  overflow: hidden;
  min-height: 100%;
  background: url(./img/DirectBot_landing-desk_pattern.png)

}

.who-need, #landing-top {
  transition: height .3s;
}

#landing .top-landing-background {
  position: absolute 0 0 * 0;
  height: 483px;
  @media screen and (min-width: 1024px) {
    background: url(/static/media/Bgr_clg-blue_1920.2c872bac.png) no-repeat;
    background-size: cover;
  }
}


#landing,
#connect-get,
#toggle-role,
#landing-top,
#operator-actions,
#operator-skills,
#show-bot,
.who-need {


  .bg-face-1,
  .bg-face-2,
  .bg-face-3 {

    @media (--tabletandless){
      display: none;
    }

  }

  a.link-info {
    border-bottom: 1px solid #595959 !important;
  }

  .free-connect{
    background: white;
    text-align: center;
    padding-top: 31px;
    font-size: 18px;
    font-family: $font__family__semibold;
    color: $color__black;
    padding-bottom: 110px;
    margin-bottom: 0;
    @media(--tabletandless) {
      font-size: 36px;
      padding: 85px 30px 150px 30px;
      margin-bottom: 0px;
    }

    a{
      display: inline;
      color: $color__black;
      border-bottom: 1px solid $color__black;
      text-decoration: none;

      &:hover{
        cursor: pointer;
        border-bottom: 1px solid transparent;
      }
    }
  }

  .free-wrap{
    height: 80px;
    background-color: rgba(9, 22, 43, 0.85);
    margin-top: 0px;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    @media (--tabletandless) {
      display: block;
      height: auto;
      background-color: transparent;
      margin-top: 0px;
    }
    &.fixed-btns {
      position: fixed * 0 -1px 0;
      z-index: 300;
    }
  }

  button.try-free{
    width: 275px !important;
    height: 40px !important;
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 0px !important;
    line-height: normal !important;
    padding: 0;
    @media(--tabletandless){
      display: block;
      position: fixed;
      bottom: -50px;
      right: 0;
      width: 50% !important;
      height: 100px !important;
      font-size: 36px;
      margin-top: 0px;
      margin-bottom: 50px !important;
      line-height: 100px !important;
    }
  }
  .ask-btn{
    width: 275px;
    height: 40px;
    color: $color__white;
    border: 1px solid $color__white;
    border-radius: 5px;
    background-color: transparent;
    font-size: 16px;
    font-family: $font__family__light;
    margin-top: 20px;
    margin-right: 10px;
    @media(--tabletandless){
      display: block;
      position: fixed;
      bottom: 0px;
      left: 0;
      width: 50% !important;
      height: 100px !important;
      font-size: 36px;
      margin-top: 0px;
      margin-right: 0px;
      line-height: 100px !important;
      border: none;
      border-radius: 0px;
      background-color: $color__blue;
    }
    &:hover{
      cursor: pointer;
      background-color: $color__white;
      color: $color__dark-blue;
    }
  }



  .skills-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    padding: 0 25px;
  }

  .info-box{
    text-align: center;
    padding: 40px 0;

    max-width: 500px;
    @media (--mobile) {
      max-width: 100%;
    }

    @media screen and (min-width: 1024px){
      margin: 0 20px;
      min-width: 400px;
    }

    @media screen and (min-width: 1815px){
      width: 500px;
    }
    .skills-icon {

      img {
        width: 100%;
        max-width: 250px;
        @media(--mobile){
          max-width: 350px;
          min-width: 350px;
        }
      }
    }
  }

  .wrap-flex {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding:0 25px;
    text-align: center;


  }

  .sub-title {
    font-family: $font__family__semibold;
    color: #595959;
    font-size: 32px;
    display: inline-block;
    margin-top: 20px;
    @media(--tabletandless) {
      display: block;
      text-align: center;
      font-size: 46px;
    }
  }

  .screen {

    text-align: center;
    margin: 0 30px;
    img {
      max-width: 370px;

      @media (--mobile){
        min-width: 500px;
      }
    }

  }

  .tip{

    font-size: 16px;
    font-family: $font__family__light;
    color: $color__gray-dark;
    @media(--tabletandless) {
      font-size: 28px;
      margin-top: 14px;
    }

  }
  .caption{
    margin-top: 7px;
    font-size: 24px;
    line-height: 32px;
    color: #595959;
    position: relative;

    @media(--tabletandless) {
      text-align: center;
      font-size: 36px;
      font-family: $font__family__light;
      margin-top: 8px;
      line-height: normal;
      padding-top: 0px;
    }

    .link-info{

      display: inline;
      color: #595959;
      border-bottom: 1px solid #595959;
      cursor: pointer;
      text-decoration: none;

      .bold{
        font-family: $font__family__semibold;
      }

      &:hover{
        cursor: pointer;
        border-bottom: none;
      }
    }
  }
}

.landing-title {
  text-align: center;
  font-family: $font__family__thin;
  color: #595959;
  font-size: 60px;
  padding-top: 30px;
  padding-bottom: 30px;
}


.screen-title{
  text-align: center;
  display: block;
  font-size: 28px;
  font-family: $font__family__semibold;
  color: $color__blue;
  padding-top: 40px;
  padding-bottom: 20px;
  @media(--tabletandless) {
    display: inline-block;
    font-size: 36px;
  }
}

</style>
