<template lang="pug">
#trendever-hero(:style="{ height: heroHeight + 'px'}")

  .screen-one

    h1 Шопинг в Instagram#[br.mobile] стал проще!

    .auth-btn СКАЧАТЬ ПРИЛОЖЕНИЕ
    .how-btn(@click="scrollFirst") КАК ЭТО РАБОТАЕТ?

  .screen-two

    h1
      | Находи и покупай#[br]
      | трендовые товары здесь#[br]
      | или прямо в Instaram

    .watch-btn(@click="scrollSecond") ЗАГЛЯНУТЬ ВНУТРЬ



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

  .watch-btn,
  .how-btn,
  .auth-btn {
    @mixin standart__font;
    position: absolute * 0 0 0;
    width: 100%;
    line-height: 100px;
    height: 100px;
    color: white;

  }



  .how-btn {
    bottom: -100px;
    z-index: 200;
    background: transparent;
  }

  .auth-btn {
    color: black;
    background: $color-orange;
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
    background: url(./img/blue_bgr.png);
    height: calc(50% + 100px);

  }

}

</style>
