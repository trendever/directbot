<template lang="pug">
#landing-top.section__content(:style="{ height: isMobile ? $parent.windowHeight + 'px': 'initial' }").hero__content

  .hero__content__background

  a.landing-top(href="https://trendever.com")
    | Подключайтесь и продавайте на Trendever бесплатно
  .profile-header
    .profile-header__center
    button(v-on:click="$router.push({name: 'auth'})").profile-header__auth-btn.btn-smaller ВХОД И РЕГИСТРАЦИЯ

  .logo__mobile

  .left-logo(v-if="!isMobile")
    a(@click="$store.dispatch('logOut')")
      img(src="../img/directbot-logo-txt.svg")

  .center-logo(v-if="!isMobile")
    img(src="../img/directbot-main-logo.png")

  .description(:class="{'bottom-fix': isSafari || isFacebok && !isInstagram }")
    | Оператор магазина #[br(v-if="isMobile")] в Instagram #[br]
    span.time__text
      | Повышает продажи и#[br(v-if="isMobile")]
      span(v-if="!isMobile") &nbsp
      | отвечает клиентам

  .set-up
    button(v-on:click="$router.push({name: 'auth'})").set-up-btn ПОПРОБОВАТЬ БЕСПЛАТНО
  button.btn.btn_primary.__orange.__xl.enter__btn.fast__big__btn(v-on:click="$router.push({name: 'auth'})")
    | ВХОД И РЕГИСТРАЦИЯ
  a.how-button(v-on:click="$parent.scrollFirst") КОМУ НУЖЕН DIRECTBOT?
</template>

<script>

export default {

  data(){
    return {
      isSafari: window.browser.safari,
      isFacebok: window.browser.facebook,
      isInstagram: window.browser.instagram
    }
  }

};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';
#landing-top {

  height: 100%;

  .landing-top {

    display: none;
    @media (--tabletandless) {
      display: block;
      background: $color__blue;
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
    }
  }
  .profile-header {
    z-index: 2;
    //auth btn on desktop (top right corner)
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
      @media(--tabletandless) {
        display: none;
      }

    }
    .auth-btn:hover{
      background: $color__white;
      border-color: $color__white;
      color: $color__blue;
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
  }
  //mobile logo on first welcome screen

  //description in the center of the screen both versions (mob&desk)
  .description {
    font-family: $font__family__regular;
    &.bottom-fix {
      margin-bottom:30px;
    }

    .time__text {
      font-size: .7em;
      font-family: $font__family__light;
      @media (--mobile) {
        font-size: 1em;
      }
    }

    z-index: 1;
    box-sizing: border-box;
    color: $color__white;
    font-size: 46px;
    text-align: center;
    margin-top: 4px;
    @media(--tabletandless) {
      width: 100%;
      font-size: 54px;
      text-align: center;
      margin-top: 45px;
      padding: 0px 80px;
      position: relative;
      line-height: 60px;
    }
    @media(--tabletandless) {
      width: 100%;
      font-size: 46px;
      text-align: center;
      margin-top: 16px;
      margin-bottom: 81px;
      padding: 0px 30px;
      top: 0;
      left: 0;
      font-family: $font__family__semibold;
      line-height: 55px;
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
      margin-top: 15px;
      cursor: pointer;
      &:hover{
        background-color: $color__white;
        border-color: $color__white;
        color: $color__blue;
      }
    }
    @media(--tabletandless) {
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
