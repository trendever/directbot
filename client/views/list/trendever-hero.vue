<template lang="pug">
#trendever-hero(:style="{ height: (isMobile ? heroHeight : heroHeight/5.157) + 'px'}")

  .screen-one
    .flex-column-center
      .title-area.no-desktop
        .brand-logo: img(src="./Trendever_logo.svg")

      h1.first Шопинг в Instagram стал проще

    .auth-btn: span ВХОД
    .how-btn(@click="scrollFirst"): span КАК ЭТО РАБОТАЕТ?

  .screen-two.no-desktop

    h1.second
      | Находите и покупайте#[br]
      | трендовые товары#[br]
      | из Instagram

    .video-link

      .wrap
        i.ic-play
        p(@click='$router.push({name: "video-trendever"})') (смотреть видео)

      .wrap
        button МАГАЗИНАМ И БРЕНДАМ

    .watch-btn(@click="scrollSecond"): span ЗАГЛЯНУТЬ ВНУТРЬ

  .screen-getapp.no-mobile(v-if="false")
    h2 Приложение для шопинга в instagram
    .wrap-input
      input(placeholder="Номер телефона")
      span.app-btn ПОЛУЧИТЬ ССЫЛКУ

  .screen-slider(v-if="false")
    slider




</template>

<script>
import slider from 'components/video/slider'
import JQuery from 'jquery';
import listen from 'event-listener';
export default {
  data () {
    return {
      heroHeight:0
    };
  },
  created(){
    this.heroHeight = window.innerHeight * 2;
  },
  mounted(){
    this.$nextTick(()=>{
      if(this.isIos){
        let resize=listen(window, 'resize',()=>{
          this.heroHeight = window.innerHeight * 2;
        })
        setTimeout(()=>{resize.remove()},1000);
      }
    })
  },
  components:{slider},
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

.flex-column-center {
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
  position: relative;
  text-align: center;
  @media (--overtablet){
    background: url(./img/hero.jpg);
  }

  .video-link {

    display: flex;
    flex-direction: column;
    height: calc(100% - 440px);
    justify-content: center;


    i {
      font-size: 150px;
      color: white;
    }
    p {
      padding: 20px;
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
      margin-top: 100px;
      font-family: $font__family__semibold;
    }
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

      &.first {
        padding-top: 50px;
        font-family: $font__family__semibold;
      }
    }



    &.second {
      font-family: $font__family__semibold;
      padding-top: 140px;
      //padding-bottom: 150px;
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
