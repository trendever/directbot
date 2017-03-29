<template lang="pug">
#trendever-hero(:style="{ height: (isMobile ? heroHeight : heroHeight/5.157) + 'px'}")

  .screen-one
    .title-area.no-desktop
      .brand-logo: img(src="../dress-blogger/images/Trendever_logo.png")

    h1 Шопинг в Instagram стал проще!

    .auth-btn: span ПРИЛОЖЕНИЕ
    .how-btn(@click="scrollFirst"): span КАК ЭТО РАБОТАЕТ?

  .screen-two.no-desktop

    h1
      | Находи и покупай#[br]
      | трендовые товары здесь#[br]
      | или прямо в Instaram

    .watch-btn(@click="scrollSecond"): span ЗАГЛЯНУТЬ ВНУТРЬ

  .screen-getapp.no-mobile
    h2 Приложение для шопинга в instagram
    .wrap-input
      input(placeholder="Номер телефона")
      span.app-btn ПОЛУЧИТЬ ССЫЛКУ




</template>

<script>
import JQuery from 'jquery';
export default {
  data () {
    return {
      heroHeight:0
    };
  },
  created(){
    this.heroHeight = window.innerHeight * 2;
  },
  methods:{
    scrollFirst() {
      JQuery(document.body).animate({scrollTop: window.innerHeight},450);
    },
    scrollSecond() {
      JQuery(document.body).animate({scrollTop: 2 * window.innerHeight},450);
    },
  }
};
</script>

<style lang="postcss">

@import 'style/vars/vars.pcss';


*.no-desktop {
  @media (--overtablet){
    display: none;
  }
}


#trendever-hero {
  position: relative;
  text-align: center;
  @media (--overtablet){
    background: url(./img/hero.jpg);
  }

  .screen-getapp {
    max-width: 500px;
    margin: 0 auto;
    padding-bottom: 20px;

    &.no-mobile {
      @media (--tabletandless) {
        display: none;
      }
    }
    h2 {
      color: white;
      font-size: calc($font__normal - 4px);
      font-family: $font__family__semibold;
      padding: 5px;
      padding-bottom: 15px;
    }
    .wrap-input {
      margin: 0 auto;
      max-width: 405px;
      overflow: hidden;
      border-radius: 5px;
      width: 100%;
      height: 40px;

      input, span {
        display: inline-block;
        width: 50%;
        height: 100%;
        float: left;
      }
      input {
        color: $color__gray-dark;
        font-size: calc($font__normal - 5px);
        border: none;
        outline: none;
        background: white;
        padding: 0 10px;
        &::focus {

        }

      }
      span {
        background-color: $color-orange;
        cursor: pointer;
        line-height: 40px;
        font-size: calc($font__normal - 5px);
      }

    }
  }


  .screen-getapp {
    position: absolute * 0 0 0;
    font-size: $font_normal;

  }

  h1 {
    color: white;
    padding-top: 400px;
    @media (--overmobile){
      height: 100%;
      padding-top: 158px;

      font-size:46px;
      font-family: $font__family__semibold;
    }
    @media (--mobile){
      font-size: 54px;
      font-family: $font__family__light;
    }

  }

  .title-area {
    .brand-logo {
      width: 500px;
      padding-top: 400px;

      margin: 0 auto;

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
      //bottom: 0px;
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
    @media (--tabletandless){
      background: url(./img/Bgr_clg_mob.jpg);
    }
    height: calc(50% - 100px);
  }
  .screen-two {
    position: relative;
    background-color: $color__brand-dark;
    height: calc(50% + 100px);

    @media (--tabletandless){
      background: url(./img/blue_bgr.png);
    }

    @media (--overtablet){
      &.no-desktop {
        display: none;
      }
    }

  }

  @media (--overtablet) {
    .screen-one,.screen-two{
      height: 50%;
    }
  }

}

</style>
