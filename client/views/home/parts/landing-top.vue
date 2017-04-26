<template lang="pug">
#landing-top(:style="{ height: isMobile ? $parent.windowHeight + 'px': 'initial' }")

  .hero__content__background


  brand-menu
    template(slot="desktop-view")
      //-img(src="../img/directbot-logo-txt.svg" onclick="window.open('https://www.trendever.com')")
      .land__top-btn(@click="$router.push({name: 'auth'})") ВХОД
      .land__top-btn(onclick="window.open('https://www.trendever.com')") ПОКУПАТЕЛЯМ
      .land__top-btn(onclick="window.open('https://www.trendever.com/dressblogger')") БЛОГЕРАМ

    template(slot="mobile-view")
      i.ic-menu_bullets(@click="showMenu=true")
      menu-sample.blue(:opened="showMenu", v-on:close="showMenu = false")
        .item(@click="$router.push({name: 'auth'})")
          .text Вход
        .item(onclick="window.open('https://www.trendever.com')")
          .text Покупателям
        .item(@click="$router.push({name: 'dress-blogger'})")
          .text Блогерам
        .item
          .text.__txt-blue Отмена


  a.header-sticker(href="https://trendever.com", target="_blank", :class="{'new-landing': newLanding}")
    span.wrap
      | Подключайтесь и продавайте#[br]
      | на Trendever
      span(style="font-weight: bold") &nbspбесплатно

  //-a.landing-top(href="https://www.trendever.com", target="_blank")
    | Подключайтесь и продавайте на Trendever бесплатно
  .profile-header
    .profile-header__center
    //-button(v-on:click="$router.push({name: 'auth'})").profile-header__auth-btn.btn-smaller ВХОД И РЕГИСТРАЦИЯ
    //-a(href="https://www.trendever.com/dressblogger", target="_blank").for-blogers БЛОГЕРАМ

  .logo__mobile

  .left-logo(v-if="!isMobile")
    a(@click="$store.dispatch('logOut')")
      img(src="../img/directbot-logo-txt.svg")

  .center-logo(v-if="!isMobile")
    img(src="../img/directbot-main-logo.png")

  .description(:class="{'bottom-fix': isSafari || isFacebok && !isInstagram }", v-if="!newLanding")
    | CRM для бизнеса в Instagram#[br]
    span.time__text(v-if="!newLanding")
      | Автоматизация взаимодействия#[br]
      | с покупателями и блогерами#[br]

  .description.new-land(:class="{'bottom-fix': isSafari || isFacebok && !isInstagram }", v-if="newLanding")
    | CRM для бизнеса#[br.mobile] в Instagram

  .set-up
    button(v-on:click="$router.push({name: 'auth'})").set-up-btn ПОПРОБОВАТЬ БЕСПЛАТНО
  button.enter-btn(v-on:click="$router.push({name: 'auth'})")
    | ВХОД И РЕГИСТРАЦИЯ
  a.how-button(v-on:click="$parent.scrollFirst", :class="{'new-land': newLanding }") {{ nextButtonText }}
</template>

<script>
import menuSample from 'components/menu/menu-sample';
import brandMenu from 'components/menu/brand-menu';

export default {
  props:{
    newLanding:{
      default: false
    }
  },
  computed:{
    nextButtonText(){
      return this.newLanding ? 'КАК ЭТО РАБОТАЕТ?' : 'КОМУ НУЖЕН DIRECTBOT?'
    }
  },
  components: {menuSample, brandMenu},
  data(){
    return {
      isSafari: window.browser.safari,
      isFacebok: window.browser.facebook,
      isInstagram: window.browser.instagram,
      showMenu: false
    }
  }

};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';

@keyframes margin-move {
  from {
    margin-left: -700px;
  }
  to {
    margin-left: 0px;
  }
}
#landing-top {
  @media (--tabletandless) {
    background: url(../img/Bgr_clg_mob.jpg), no-repeat;
    background-size: cover;
    background-position-x: 0px;
    height: 100%;
  }
  position: relative;
  width: 100%;
  text-align: center;
  height: 100%;


  .enter-btn {
    @media (--overtablet){
      display: none;
    }
    font-size: 36px;
    position: absolute * 0 100px 0;
    height: 100px;
    border: none;
    outline: none;
    width: 100%;
    font-family: $font__family__light;
    background: $color-orange;
  }

  .brand-section {
    position: absolute 0 0 * 0;
  }

  a.header-sticker {

    //display: none;
    text-decoration: none;
    color: white;
    text-align: center;
    font-size: $font__normal;
    height: 220px;
    width: 420px;
    background-image: url(../img/header_sticker.png);
    background-repeat: no-repeat;
    background-size: contain;

    @media (--tabletandless) {
      animation: margin-move .6s ease;
      padding-top: 8px;
      padding-left: 156px;
      position: absolute -10px *  * -150px;
      text-align: left;
      display: block;
      //height: 320px;
      width: 520px;
      transform: translateY(0%) rotate(5deg)


    }
    @media screen and (min-width: 1301px){
      display: block;
      position: absolute 400px -40px * *;
      z-index: 200;
    }

    @media screen and (min-width: 1024px) and (max-width: 1300px){
      display: block;
      position: absolute 300px -40px * *;
    }

    @media (--overtablet) {
      &.new-landing {
        top: 330px;
      }

      span.wrap {
        display: inline-block;
        transform: translateY(70%) rotate(-7deg)
      }

    }

    @media (--tabletandless) {
      span.wrap {
        display: inline-block;
        transform: translateY(70%) rotate(-5deg)
      }
    }
  }

  .landing-top {

    display: none;
    @media (--tabletandless) {
      display: block;
      background: $color__brand;
      color: white;
      font-size: 25px;
      font-family: $font__family__semibold;
      text-align: center;
      text-decoration: none;
      padding: 14px 0;


    }



  }
  .how-button {
    display: none;
    @media(--tabletandless) {
      background-image: url(../img/Pattern_bgr_mob.svg);
      display: inline-block;
      height: 100px;
      width: 100%;
      font-size: 36px;
      color: #fff;
      font-family: $font__family__light;
      padding-top: 30px;
      position: absolute;
      bottom: 0px;
      left: 0;
      &.new-land {
        background-image: url(../img/DirectBot_landing-desk_pattern.png);
        //background-image: url(../new-parts/img/drbt_pattern_mob_light.jpg);
        color:$color__brand;
        background-position: 0 -336px;
      }
    }

  }
  .profile-header {
    z-index: 2;
    //auth btn on desktop (top right corner)

    a.for-blogers {
      text-decoration: none;
      position: absolute;
      top: 20px;
      right: 275px;
      width: 158px;
      height: 40px;
      border: 1px solid #fff;
      border-radius: 5px;
      background: transparent;
      color: $color__white;
      font-size: 16px;
      font-family: $font__family__semibold;
      z-index: 100;
      line-height: 40px;
      @media(--tabletandless) {
        display: none;
      }


    }
    .auth-btn{
      position: absolute;
      top: 20px;
      right: 20px;
      width: 250px;
      height: 40px;
      border: 1px solid #fff;
      border-radius: 5px;
      background: transparent;
      color: $color__white;
      font-size: 16px;
      font-family: $font__family__semibold;
      z-index: 100;
      @media(--tabletandless) {
        display: none;
      }
    }
    .auth-btn:hover,
    .for-blogers:hover{
      background: $color__white;
      border-color: $color__white;
      color: $color__brand;
      cursor: pointer;
    }
  }
  //auth btn on desktop (top right corner)

  //logo on desktop (top left corner)
  .left-logo{
    text-align: left;
    img{
      width: 202px;
      height: 43px;
      margin-top: 19px;
      margin-left: 19px;
    }
    @media(--tabletandless) {
      display: none;
    }
  }
  //logo on desktop (top left corner)

  //logo on desktop in the center of the screen
  .center-logo{
    img{
      height: 100px;
      width: 92px;
    }
  }
  //logo on desktop in the center of the screen

  //mobile logo on first welcome screen
  .logo__mobile{
    display: none;
    @media(--tabletandless) {
      background: url(../img/directbot-logo.svg) no-repeat;
      display: inline-block !important;
      width: 445px;
      height: 345px;
      margin-top: 12.3%;
    }
    @media screen and (max-height: 1140px){

    }
  }
  //mobile logo on first welcome screen

  //description in the center of the screen both versions (mob&desk)
  .description {


    font-family: $font__family__regular;
    z-index: 1;
    box-sizing: border-box;
    color: $color__white;
    font-size: 46px;
    text-align: center;
    margin-top: 4px;

    @media(--tabletandless) {
      width: 100%;
      font-size: 46px;
      text-align: center;
      margin-top: 16px;
      margin-bottom: 81px;
      top: 0;
      left: 0;
      font-family: $font__family__semibold;
      line-height: 55px;

      &.new-land {
        font-size: 60px;
        font-family: $font__family__regular;
      }
    }


    @media screen and (max-height: 1140px){
      margin-bottom: 10px;
    }

    &.bottom-fix {
      margin-bottom:30px;
    }

    .time__text {

      font-size: .7em;
      font-family: $font__family__light;

      @media (--overmobile){
        display: inline-block;
        margin-bottom:20px;

      }
      @media (--mobile) {
        font-family: $font__family__thin;
        display: inline-block;
        width: 100%;
        font-size: 0.9em;
      }

    }

  }
  //description in the center of the screen both versions (mob&desk)

  //set up btn in the center of welcome screen
  .set-up{
    button{
      width: 420px;
      height: 60px;
      color: $color__white;
      font-family: $font__family__semibold;
      font-size: 24px;
      border-radius: 5px;
      border: 1px solid $color__white;
      background-color: transparent;
      margin-top: 5px;
      cursor: pointer;
      &:hover{
        background-color: $color__white;
        border-color: $color__white;
        color: $color__brand;
      }
    }
    @media (--tabletandless) {
      display: block;
      button{
        width: 600px;
        height: 118px;
        font-size: 36px;
        margin-top: 0px;
      }
    }
  }
}



</style>
