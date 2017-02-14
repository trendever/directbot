<template lang="pug">

.who-need(
  :style="{ height: isMobile ? $parent.windowHeight + 'px': 'initial' }",
  :class="{ 'cross-fix': (isFacebook || isSafari) && isInstagram}")

  .head-title(v-if="!isMobile") Кому нужен Directbot?

  .wrap-box
    .digit 1
    .title Крупным #[br] интернет-магазинам,
    .paragraph
      p кто продаёт в Instagram, #[br] но не успевает отвечать клиентам #[br] в Direct и комментариях под постами
      p(v-if="!isMobile").bold-txt 2 часа ожидания #[br]
      p(v-if="!isMobile").light-txt нужно в среднем, чтобы #[br] получить ответ от инста-шопа

  .wrap-box
    .digit 2
    .title Продавцам #[br] в Instagram-магазинах,
    .paragraph
      p которым надоело отвечать #[br] одно и то же в комментариях #[br] и Instagram Direct
      p(v-if="!isMobile").bold-txt 9 из 10 покупателей #[br]
      p(v-if="!isMobile").light-txt спрашивают про товары #[br] в комментариях или Instagram Direct
  .wrap-box
    .digit 3
    .title Начинающим #[br] Instagram-магазинам,
    .paragraph
      p кому нужно управлять #[br] продажами и быстро #[br] отвечать клиентам
      p(v-if="!isMobile").bold-txt 10 из 10 инста-шопов #[br]
      p(v-if="!isMobile").light-txt хотят свой интернет-магазин #[br] и ставить активные ссылки под постами

  button.how-works(v-on:click="$parent.scrollSecond") КАК ЭТО РАБОТАЕТ?

</template>

<script>
export default {
  data(){
    return {
      isFacebook: window.browser.facebook,
      isSafari: window.browser.safari,
      isInstagram: window.browser.instagram
    }
  }

};
</script>

<style lang="postcss">

@import 'style/vars/vars.pcss';


.who-need {

  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;

  @media (--tabletandless) {
  	display: block;
    height: 100 !important;
    background-image: url(../img/Pattern_bgr_mob.svg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y: -100px;

  }
  &.cross-fix {
    .wrap-box {
      padding: 5;
      .paragraph p {
        line-height: 42px;
      }
    }

  }



  button.how-works{
    display: none;
    @media(--tabletandless) {
      display: inline-block;
      font-size: 36px;
      color: #fff;
      width: 100%;
      height: 100px;
      position: absolute;
      bottom: 0px;
      left: 0;
      background: #5E8BCE;
      border: none;
      font-family: $font__family__light;
    }
  }
  //btn that put you down to the second screen
  a{
    display: none;
    @media(--tabletandless) {
      display: inline-block;
      width: 100%;
      font-size: 36px;
      color: #fff;
      margin-top: 30px;
      margin-bottom: 20px;
      width: 100%;
      line-height: 40px;
      font-family: $font__family__light;
    }
  }
  //btn that put you down to the second screen
  .digit{
    width: 100%;
    margin: 0;
    display: inline-block;
    margin: 20px;
    border: 2px solid $color__blue;
    border-radius: 50%;
    color: $color__blue;
    font-size: 46px;
    font-family: $font__family__light;
    width: 112px;
    height: 112px;
    padding-top: 25px;
    @media (--tabletandless) {
      font-size: 35px;
      color: $color__white;
      border: 1.5px solid $color__white;
      border-radius: 50%;
      height: 50px;
      width: 50px;
      margin: 0px auto 0px;
      padding-top: 2px;
    }
  }

  .head-title{
    color: $color__gray-dark;
    font-size: 60px;
    font-family: $font__family__thin;
    text-align: center;
    margin: 0 auto;
    width: 80%;
     @media (--tabletandless) {
      color: $color__white;
      font-size: 46px;
      margin-top: 15px;
    }
  }

  .title{
    font-family: $font__family__semibold;
    color: $color__gray-dark;
    font-size: 32px;
    text-align: center;
    @media (--tabletandless) {
      color: $color__white;
      font-size: 46px;
      margin-top: 15px;
    }
  }

  .paragraph p{
    font-family: $font__family__light;
    color: $color__gray-dark;
    font-size: 24px;
    margin-top: 7px;
    @media (--tabletandless) {
      color: $color__white;
      font-size: 36px;
      font-family: $font__family__semibold;
      margin-top: -3px;
    }
  }

  p.bold-txt{
    font-size: 16px;
    font-family: $font__family__semibold;
    margin-top: 22px;
  }
  p.light-txt{
    font-size: 16px;
    font-family: $font__family__light;
    margin-top: 0px;
  }


  .wrap-box{
  	//padding-top: 30px;
    text-align: center;
    margin: 0 20px 20px 20px;

    &.fix-padding{
      margin-bottom: 0;
    }

  }

}

</style>
