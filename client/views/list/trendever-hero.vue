<template lang="pug">
#trendever-hero(:style="{ height: (isMobile ? heroHeight : 366) + 'px'}")

  .screen-one
    .wrap-together

      .title-area.no-desk
        .brand-logo: img(src="./img/Trendever_logo.svg")


      .wrap-mini-slider
        mini-slider
      h1.first Шопинг в Instagram#[br.mobile] стал проще
        .social-icons

          //- a: i.ic-social_facebook
          //- a: i.ic-social_facebook_color
          //- a: i.ic-social_vkontakte
          //- a: i.ic-social_vkontakte_color
          //- a: i.ic-social_instagram_linear
          //- a: i.ic-social_instagram_mainpg

          //-a(href="https://www.fb.com/trendevercom", target="_blank"): img.svg(src="./img/social_facebook.svg")
          //-a: i.ic-social_facebook

          a(href="https://www.fb.com/trendevercom", target="_blank")
            .facebook
            img.svg(src="./img/social_facebook_color.svg")

          //-a(href="https://www.fb.com/trendevercom", target="_blank"): img.svg(src="./img/social_vkontakte.svg")
          //-a: i.ic-social_vkontakte

          a(href="https://www.vk.com/trendever", target="_blank")
            .vkontakte
              //-img.svg(src="./img/social_vkontakte_color.svg")

          //-a(href="https://www.fb.com/trendevercom", target="_blank"): img.svg(src="./img/social_instagram_linear.svg")
          //-a: i.ic-social_instagram_linear

          a(href="https://www.instagram.com/trendevercom", target="_blank")
            .instagram
            //-img.svg(src="./img/social_instagram_mainpg.svg")

          //-a(href="https://www.fb.com/trendevercom", target="_blank"): img.svg(src="./img/fb_color.svg")
          //-a(href="https://www.vk.com/trendever", target="_blank"): img.svg(src="./img/vk_color.svg")
          //-a(href="https://www.vk.com/trendever"): img.svg(src="./img/insta_c.svg")

    .auth-btn(@click="$router.push({name: 'auth'})"): span ВХОД И РЕГИСТРАЦИЯ
    .how-btn(@click="scrollFirst"): span КАК ЭТО РАБОТАЕТ?


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

  .screen-getapp.no-mob(v-if="false")
    h2 Приложение для шопинга в instagram
    .wrap-input
      input(placeholder="Номер телефона")
      span.app-btn ПОЛУЧИТЬ ССЫЛКУ

  .screen-slider(v-if="false")
    slider




</template>

<script>
import miniSlider from './mini-slider';
import slider from 'components/video/slider';
import listen from 'event-listener';
import  JQuery from 'jquery';

export default {
  data () {
    return {
      heroHeight:0
    };
  },
  mounted(){

    this.$nextTick(()=>{
      this.heroHeight = window.innerHeight * 2;

      // jQuery('img.svg').each( () => {
      //   let $img = jQuery(this);
      //   let imgID = $img.attr('id');
      //   let imgClass = $img.attr('class');
      //   let imgURL = $img.attr('src');

      //   jQuery.get(imgURL, (data) => {
      //     // Get the SVG tag, ignore the rest
      //     let $svg = jQuery(data).find('svg');

      //     // Add replaced image's ID to the new SVG
      //     if(typeof imgID !== 'undefined') {
      //         $svg = $svg.attr('id', imgID);
      //     }
      //     // Add replaced image's classes to the new SVG
      //     if(typeof imgClass !== 'undefined') {
      //         $svg = $svg.attr('class', imgClass+' replaced-svg');
      //     }

      //     // Remove any invalid XML tags as per http://validator.w3.org
      //     $svg = $svg.removeAttr('xmlns:a');

      //     // Check if the viewport is set, else we gonna set it if we can.
      //     if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
      //         $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      //     }
      //     alert($svg)
      //     // Replace image with new SVG
      //     $img.replaceWith($svg);

      //   }, 'xml');
      // });
    })
  },
  components:{slider, miniSlider},
  methods:{
    goVideo(){this.$router.push({name: "video-trendever"})},
    scrollFirst() {
      JQuery(document.body).animate({scrollTop: window.innerHeight},450);
    },
    scrollSecond() {
      JQuery(document.body).animate({scrollTop: 2 * window.innerHeight},450);
    },
  },

};
</script>

<style lang="postcss">

@import 'style/vars/vars.pcss';


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
      .social-icons {

        padding-left: 0px;
        position: absolute * * 0 0;

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



/*         i.ic-social_facebook{
          color: initial;
          &:hover a.facebok {
            display: inline-block;
          }
        };

        i.ic-social_vkontakte{
          color:initial;
          &:hover a.vkontakte img {
            display: inline-block;
          }
        };
        i.ic-social_instagram_linear {
          color:initial;
          &::hover a.instagram{
            display: inline-block;
          }
        };
        i.ic-social_instagram_mainpg{
          color:initial;
          &::hover a.instagram {
            display: inline-block;
          }
        }; */

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

  .screen-getapp {
    max-width: 500px;
    margin: 0 auto;
    padding-bottom: 20px;

    &.no-mob {
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
      background-size: 190%;
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
