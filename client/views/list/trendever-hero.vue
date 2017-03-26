<template lang="pug">
#trendever-hero(:style="{ height: heroHeight + 'px'}")

  .screen-one
    .title-area
      .brand-logo: img(src="../dress-blogger/images/Trendever_logo.png")
      h1 Шопинг в Instagram#[br.mobile] стал проще!

    .auth-btn: span ПРИЛОЖЕНИЕ
    .how-btn(@click="scrollFirst"): span КАК ЭТО РАБОТАЕТ?

  .screen-two

    h1
      | Находи и покупай#[br]
      | трендовые товары здесь#[br]
      | или прямо в Instaram

    .watch-btn(@click="scrollSecond"): span ЗАГЛЯНУТЬ ВНУТРЬ



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

#trendever-hero {
  text-align: center;

  h1 {
    color: white;
    padding-top: 400px;
    @media (--overmobile){
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
        padding-top: 290px;
      }
    }
    h1{
      padding-top: 100px;
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
    background: url(./img/Bgr_clg_mob.jpg);
    height: calc(50% - 100px);
  }
  .screen-two {
    position: relative;
    background-color: $color__brand-dark;
    height: calc(50% + 100px);

    @media (--tabletandless){
      background: url(./img/blue_bgr.png);
    }

  }

  @media (--overtablet) {
    .screen-one,.screen-two{
      height: 50%;
    }
  }

}

</style>
