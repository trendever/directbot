<template lang="pug">
#trendever-hero.full-screen-desk(
  :style="{ height: (isMobile ? heroHeight : heroHeight/2/*366*/) + 'px'}",
  )

  slot

  .screen-one
    .bg-plank
    i.ic-arrow-down(@click="scrollFirst").no-mobile
    .wrap-together

      .title-area.no-desk
        .brand-logo: img(src="./img/Trendever_logo.svg")

      .fake-vertical-align
      .wrap-mini-slider
        mini-slider(:directbot="directbotHero")
      h1.first
        .wrap-title(v-html="title")

        .screen-getapp.no-mob
          .contain
            template(v-if="isTrendever")
              .application-icons(:class="{'trendever': isTrendever}")
                a(href="https://itunes.apple.com/ru/app/trendever/id1124212231")
                  //-img(src="./hero-imgs/appstore.svg")
                  i.ic-app_store
                a(href="https://play.google.com/store/apps/details?id=com.trendever.app")
                  //-img(src="./hero-imgs/google_play.svg")
                  i.ic-google_play
                a(href="https://t.me/InstaDirectbot" target="_blank")
                  i.ic-telegram_icon
                .tooltip
                  span *сервис для бизнеса в Instagram, 
                  a(src="https://directbot.io", target="_blank") Directbot.io,
                  span доступен в приложении Trendever
          .contain
            .wrap-input(v-if="isTrendever")
              input(type="text" placeholder="Номер телефона" v-model="phoneNumber" @keydown.enter="getLink")
              button(:disable="disableButton" @click="getLink").app-btn {{ getLinkTitle }}
            
            button.button-auth( 
              :class="{trendever: isTrendever}",
              @click="$router.push({name: 'auth'})"
              ) 
              template(v-if="isTrendever") Зарегистрироваться
              template(v-else) Регистрация 

            template(v-if="!isTrendever")
              a(href="https://t.me/InstaDirectbot" target="_blank",
                  v-if="!isTrendever")
                  i.ic-telegram_icon


    .auth-btn(@click="$router.push({name: 'auth'})"): span ВХОД И РЕГИСТРАЦИЯ
    .how-btn(@click="scrollFirst"): span КАК ЭТО РАБОТАЕТ?


    .social-icons.column
      a.s-facebook(:href="'https://www.fb.com/'+ socialLinks[0]", target="_blank")
        .facebook
        img.svg(src="./img/social_facebook_color.svg")
      a.s-vkontakte(:href="'https://www.vk.com/'+ socialLinks[1]", target="_blank")
        .vkontakte
      a.s-instagram(:href="'https://www.instagram.com/'+ socialLinks[2]", target="_blank")
        .instagram


  .screen-two.no-desk

    .wrap-second

      h1.second
        | Находите и покупайте#[br]
        | трендовые товары#[br]
        | из Instagram

      .wrap
        i.ic-play(@click='goVideo')
        p(@click='goVideo') (смотреть видео)

      .wrap
        a(href="https://directbot.io", target="_blank")
          button МАГАЗИНАМ И БРЕНДАМ

    .watch-btn(@click="scrollSecond"): span ЗАГЛЯНУТЬ ВНУТРЬ


</template>

<script>
import miniSlider from './mini-slider';
import listen from 'event-listener';
import  JQuery from 'jquery';
import * as commonService from 'services/common';

export default {

  props:{
    directbotHero:{
      default:false,
    },
    socialLinks: {
      type: Array,
      default(){
        return ['trendevercom','trendever','trendevercom']
      }
    },
    title:{
      type: String,
      default:`
        <span>Шопинг в Instagram</span>
        <br />
        <span class="second-word">стал проще</span>
      `
    }
  },
  data () {
    return {
      heroHeight:0,
      phoneNumber: '',
      smsSent: false,
      phoneError: false
    };
  },
  mounted(){

    this.$nextTick(()=>{

      this.heroHeight = window.innerHeight * 2;

    })

  },

  components:{miniSlider},
  computed:{
    disableButton(){
      if (this.phoneNumber.length >= 11 && !this.phoneError){
        return false;
      }else{
        return true;
      }
    },
    getLinkTitle(){
      if (this.phoneError){
        return "НЕВЕРНЫЙ НОМЕР";
      }
      if (this.smsSent){
        return "ОТПРАВЛЕНО";
      }else{
        return "СКАЧАТЬ ПРИЛОЖЕНИЕ";
      }
    },
    disableButton(){
      if (this.phoneNumber.length >= 11 && !this.phoneError){
        return false;
      }else{
        return true;
      }
    }
  },
  methods:{
    goVideo(){this.$router.push({name: "video-trendever"})},
    scrollFirst() {
      JQuery(document.body).animate({scrollTop: window.innerHeight},450);
    },
    scrollSecond() {
      JQuery(document.body).animate({scrollTop: 2 * window.innerHeight},450);
    },
    getLink(){
      commonService.marketSms({phone: this.phoneNumber }).then(data=>{
          //yaCounter35346175.reachGoal('get_link')
          this.smsSent = true
          this.phoneNumber = ''
          setTimeout( () => {this.smsSent =  false}, 3000)
        },err=>{
          this.phoneError=true
          setTimeout( () => {this.phoneError =  false}, 3000)
        }
      );
    },
  },

};
</script>

<style lang="postcss">

@import 'style/vars/vars.pcss';
$dark_green_btn: #095609;
$wrap__width: 470px;
$color_blue_change: #5986c7;
.screen-one {
  position: relative;
  .social-icons {

    padding-left: 0px;
    //position: absolute -30px -500px 0 0;
    z-index: 100;

    &.column {
      @media (--tabletandless){
        display: none;
      }
      height: 200px;
      position: absolute 205px 0 *  *;
      display: inline-block;
      width: 80px;
      @media screen and (max-height:800px){
          transform: translateY(-70px);
      }
    }

    .vkontakte {
      background-image: url(./img/social_vkontakte.svg);
      &:hover {
        background-image: url(./img/social_vkontakte_color.svg);
        background-color: white;
      }

    }

    .facebook{
      background-image: url(./img/social_facebook.svg);

      &:hover {
        background-image: url(./img/social_facebook_color.svg);
        background-color: white;
      }

    }


    .instagram{
      border-radius: 13px !important;
      background-image: url(./img/social_instagram_linear_white.svg);
      &:hover {
        //background-image: url(./img/social_instagram_linear.svg);
        background-image: url(./img/instagram_newicon_col_small.png);
        background-color: white;
      }

    }


    .vkontakte,
    .facebook,
    .instagram {
      opacity: .92;
      cursor: pointer;
      background-repeat: no-repeat;
      overflow: hidden;
      background-size: 45px;
      size: 45px;
      border-radius: 7px;

    }

    a {
      margin-right: 10px;
      margin-bottom: 20px;
      vertical-align: bottom;
      i {
        color: inherit;
      }
    }
    img {
      display: none;
    }
    img, i {

      width: 50px;
      cursor: pointer;
      vertical-align: bottom;
      margin-bottom:20px;
      padding-right: 10px;
    }
  }

}

.wrap-together {
  height: 100%;
  @media (--overtablet) {
    line-height: 366px;
    transform: translateX(-20px);
    .first, .wrap-mini-slider {
      display: inline-block;
    }


    .first {

      position: relative;
      width: auto !important;
      margin-left: 40px;
      .wrap-title {
        margin-top: 100px;
        line-height: 60px;
        text-align: left;
        @media screen and (max-height:800px){
          transform: translateY(-70px);
        }

        .directbot & {
          @media screen and (max-height:800px){
            transform: translateY(-8px);
          }

        }
      }
    }
  }
  .social-icons {

    @media (--tabletandless){
      display: none;
    }
  }

  @media (--tabletandless) {
    display: flex;
    height: calc(100% - 100px);
    flex-direction: column;
    justify-content: center;
   .title-area, .first, .brand-logo {
      padding: 0 !important;
    }
    .first {
      margin-top: 20px;
      font-family:  $font__family__semibold;
    }
  }

}


#trendever-hero {
  height: 0;
  overflow: hidden;
  transition: all .5s;
  position: relative;
  text-align: center;
  @media (--overtablet){
    background: url(./img/hero.jpg);
  }


  &.full-screen-desk{
    .fake-vertical-align,
    .bg-plank {
      display: none;
    }

    @media (--overtablet){

      background: url(./hero-imgs/Pattern_green_light_desk_1920x900.jpg);
      //background-size: 50%;
      .wrap-together {
        line-height: initial;
        transform: translateX(0px);
        height: 100% !important;
        width: 100%;

        >div {
          vertical-align: middle;
        }
      }

      .wrap-mini-slider {
        height: 650px !important;
      }
      .fake-vertical-align {
        display: inline-block;
        height: 100%;
      }
      .first {
        vertical-align: top;
        height: 300px;
        line-height: 300px;
        margin-top: 170px;
      }


      .screen-one {
        height: 100%;

        .bg-plank {
          background-image: url(./hero-imgs/Bgr_clg_1920_green.png);
          background-size: cover;
          display: block;
          position: absolute 0 0 * 0;
          height: calc(50% + 60px);
        }

        i.ic-arrow-down {
          z-index: 200;
          cursor: pointer;
          position: absolute * * 20px *;
          color: $color__brand-dark;
        }
      }
    }
  }

  &.directbot-top {
    display: none;
    position: relative;
    @media (--overtablet){
      display: block;
      background: none;
    }
    .bg-plank {
      background-image: url(../home/img/Bgr_clg-blue_1920.png) !important;
    }

  }



  .wrap-second {
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 100px);
    justify-content: center;

    :last-child.wrap {
      padding-top: 28%;
    }

    h1.second {
      padding-top: 0;
      padding-bottom: 28%;
    }

    i {
      font-size: 150px;
      color: white;
    }
    p {
      padding: 0px;
      color: white;
      font-size: $font__medium;
      text-align: center;
    }

    button {
      padding: 40px 60px;
      border-radius: 10px;
      border: 1px solid white;
      color:white;
      background: transparent;
      width: 600px;
      height: 118px;
      font-size: 36px;
      line-height: 118px;
      padding: 0;
      font-family: $font__family__semibold;
    }
  }

  i.ic-telegram_icon {
    .directbot & {
      font-size: 60px;
      color: $color_blue_change;
      vertical-align: bottom;
      margin-bottom: 15px;
      margin-left: 10px;
    }
  }

  .application-icons {
    line-height: initial;
    display: block;
    position: absolute * 0 -62px 0;
    text-align: left;
    z-index: 10;

    &.trendever {
      i {
        color: $dark_green_btn;
      }
    }
    a {
      display: inline-block;
      margin: 0 5px 5px 0;
      vertical-align: middle;
      height: 42px; 
      img {
        clear: both;
        display: inline-block;
        width: 134px;
      }
    }


    i {
      font-size: 42px;
      color: $color_blue_change;
    }
    .tooltip {
      position: absolute * * -40px *;
      font-size: $font__size;
      color: $color__gray-dark;
      font-family: $font__family__regular;
      a {
        display: inline-block;
        border-bottom: 1px solid $color__gray-dark;
        height: 19px;
        cursor: pointer;
      }
      width: calc(100% + 150px);
    }
  }
  .screen-getapp {
    max-width: 700px;
    margin: 0 auto;
    padding-bottom: 20px;
    position: absolute * * -110px 0;
    font-size: $font__normal;
    z-index: 20;

    &.no-mob {
      @media (--tabletandless) {
        display: none;
      }
    }
    h2 {
      color: $color__brand-dark;
      font-size: calc($font__normal - 4px);
      font-family: $font__family__semibold;
      padding: 5px;
      padding-bottom: 15px;
      line-height: 30px;
      text-align: left;

    }

    
    .wrap-input {
      border: 1px solid $color__gray;
      margin: 3px auto 0 auto;
      width: $wrap__width;
      overflow: hidden;
      border-radius: 5px;
      height: 50px;

      input, button {
        position: relative;
        display: inline-block;
        height: 100%;
        float: left;
      }
      input {
        width: 43%;
        font-family: $font__family__light;
        color: $color__gray-dark;
        font-size: calc($font__normal - 3px);
        border: none;
        outline: none;
        background: white;
        padding: 0 10px;
        &::focus {
        }
      }
      button {
        width: 57%;
        border: none;
        outline: none;
        color: black;
        background-color: $color-orange;
        cursor: pointer;
        line-height: 40px;
        font-family: $font__family__light;
        font-size: calc($font__normal - 3px);
        &:hover {
          background: $color-orange-dark;
        }
      }
    }


    button.button-auth {
      outline: none;
      background: transparent;
      position: absolute 3px -280px * *;
      border: 1px solid $color_blue_change;
      line-height:initial; 
      padding: 0 20px;
      height:50px;
      border-radius: 5px;
      font-family: $font__family__light;
      color: $color_blue_change;
      cursor: pointer;
      font-size: calc($font__normal - 3px);
      text-transform: uppercase;
      &:hover {
        color: white;
        background: $color_blue_change;
      }

      &.trendever {
        color: $dark_green_btn;
        border-color: $dark_green_btn;
        &:hover {
          color: white;
          background: $dark_green_btn;
        }
      }

      .directbot & {
        position: relative;
        left: 0;
        top: 100px;
        height: 60px;
        border-width: 2px;
        font-family: $font__family__semibold;
        border-radius: 8px;
      }
    }
  }

  h1 {
    color: white;
    padding-top: 400px;
    @media (--overtablet){
      padding-top: 0;
      position: relative;
      display: inline-block;
/*       top: 50%;
      left:50%;
      transform: translate(-50%, -50%); */
      width: 100%;
      font-size:46px;
      font-family: $font__family__semibold;
    }
    @media (--tabletandless){
      font-size: 54px;
      font-family: $font__family__light;

      &.first {
        padding-top: 50px;
        font-family: $font__family__semibold;
      }
    }

    &.second {
      font-family: $font__family__semibold;
    }

  }

  .title-area {
    .brand-logo {
      width: 500px;
      padding-top: 400px;

      margin: 0 auto;
      @media (--tabletandless){
        padding-top: 350px;
        img {
          width: 500px;
        }
      }
      @media (--overtablet){
        padding-top: 0px;
      }
    }

  }

  .watch-btn,
  .how-btn,
  .auth-btn {
    @mixin standart__font;
    position: absolute * 0 0 0;
    width: 100%;
    line-height: 100px;
    height: 100px;
    color: white;
    @media (--overtablet) {
      bottom: 200px;
      span {
        width: auto;
        padding:13px 65px;
        border-radius: 5px;
        font-family: $font__family__semibold;
        font-size: $font__normal;
        border: 1px solid white;
        color: white;
        border-radius: 5px;
        width: initial;
        &:hover {
          cursor: pointer;
          background: white;
          color: black;
        }
      }

    }
  }



  .how-btn {
    @media (--overtablet){
      display: none;
    }
    @media (--tabletandless){
      bottom: -100px;

    }
    z-index: 200;
    background: transparent;
  }

  .auth-btn {
    color: black;
    background: $color-orange;
    @media (--overtablet) {
      display: none;
      background: transparent;
      span {
        color: black;
        border:none;
        background-color: $color-orange;
        width: auto;

        &:hover {
          background-color: $color-orange-dark;
        }
      }

    }
  }

  .watch-btn {
    background-color: $color__green;
  }

  .screen-one {
    position: relative;
    height: calc(50% - 100px);
    @media (--tabletandless){
      background: url(./img/Bgr_clg_mob.jpg);
    }
    @media (--overtablet) {
      height: 366px;
    }
    .wrap-mini-slider {
      height: 100%;
      position: relative;
      display: inline-block;
      @media (--tabletandless){
        display: none;
      }
      vertical-align: middle;
    }

  }
  .screen-two {
    position: relative;
    background-color: $color__brand-dark;
    height: calc(50% + 100px);

    @media (--tabletandless){
      background: url(./img/Trvr_pattern_green_dark.svg);
      background-size: 200%;
      //background: url(./img/blue_bgr.png);
    }

    @media (--overtablet){
      &.no-desk {
        display: none;
      }
    }

  }

}

</style>
