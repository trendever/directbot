<template lang="pug">

#brand-menu

  .brand-section
    slot(name="desktop-view")

      //-TEMPLATE
        img(src="../img/directbot-logo-txt.svg" onclick="window.open('https://www.trendever.com')")
        .land__top-btn.hov(@click="$router.go({name: ''})") ВХОД
        .land__top-btn(onclick="window.open('http://www.directbot.io')") МАГАЗИНАМ
        .land__top-btn(onclick="window.open('https://www.trendever.com/dressblogger')") БЛОГЕРАМ
        .land__top-btn(onclick="window.open('https://www.trendever.com/dressblogger')") ПОКУПАТЕЛЯМ

  .menu-section
    slot(name="mobile-view")

      //-TEMPLATE
        i.ic-menu_bullets(@click="showMenu=true")
        menu-sample(:opened="showMenu", v-on:close="showMenu = false")
          .item(@click="$router.go({name: 'signup'})")
            .text Вход
          .item(onclick="window.open('http://www.directbot.io')")
            .text Магазинам
          .item(onclick="window.open('https://www.trendever.com/dressblogger')")
            .text Блогерам
          .item
            .text.__txt-green Отмена

</template>


<script>
import menuSample from './menu-sample';
export default {
  components: {menuSample},
  name: 'brand-menu',

  data () {
    return {

    };
  }
};
</script>

<style lang="postcss">

@import 'style/vars/vars.pcss';

@keyframes scale-move {
  from {
    transform: scale(.2);
  }
  50% {
    transform: scale(.7);
  }
  to {
    font-size: scale(1);
  }
}


#brand-menu {

  .menu-section {
    z-index: 300;
    position: absolute 30px 30px * *;

    i.ic-menu_bullets {
      padding:0px 9px;
      transform: rotate(90deg);
      animation: scale-move .5s;
      @media (min-width: 751px) {
        font-size: $font__large;
      }
      @media (--overtablet){
        display: none;
      }
    }


    @media (--mobile) {

      #menu-sample.blue  {
        background: $color__brand-opacity;
      }
      #menu-sample.green  {
        background: $color__brand-opacity;
      }

      #menu-sample.black {
        background: rgba(0, 0, 0,.6);
      }

    }

    #menu-sample {
      @media (--mobile) {
        border-radius: 0px;
        position: fixed 0 0 * 0;
        z-index: 179;
        size: 100%;
        width: 100%;
        height: 100%;

      }
    }
  }

  .brand-section {

    height: 100px;

    :first-child.land__top-btn {
      border: 1px solid white;
    }
    :last-child.land__top-btn {
      margin-right: -1%;
    }

    :nth-child(3).land__top-btn {
      margin-right: -1%;
    }

    img {
      cursor: pointer;
      margin-top: 15px;
      margin-left: 1%;
      display: inline-block;
      float:left;
      max-width: 150px;

      @media (--mobile ){

        margin-left: 27px;
        margin-top: 30px;
        max-width: 250px;
      }
    }

    .land__top-btn {

      display: inline-block;
      float:right;
      margin-top: 15px;
      margin-right: 1%;
      font-size: 16px;
      font-family: $font__family__semibold;

      color: white;
      border-radius: 5px;

      @media (--overtablet) {
        width: initial;
        padding:10px 35px;
      }

      @media (--tabletandless){
        display: none;
      }

      &:hover {
        cursor: pointer;
        background: white;
        color: black;
      }
    }
  }
}


</style>
