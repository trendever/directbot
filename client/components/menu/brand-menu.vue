<template lang="pug">
#brand-menu

  .brand-section
    //-img(src="../img/directbot-logo-txt.svg" onclick="window.open('https://www.trendever.com')")
    .land__top-btn(@click="$router.go({name: 'signup'})") ВХОД
    .land__top-btn(@click="") ПОКУПАТЕЛЯМ
    .land__top-btn(@click="window.open('http://www.trendever.com')") БЛОГЕРАМ

  .menu-section.blue
    i.ic-menu_bullets(@click="showMenu=true")
    menu-sample(:opened="showMenu", v-on:close="showMenu = false")
      .item(@click="$router.go({name: 'auth'})")
        .text Вход
      .item(onclick="window.open('https://www.trendever.com')")
        .text Покупателям
      .item(@click="$router.go({name: 'dress-blogger'})")
        .text Блогерам
      .item
        .text.__txt-blue Отмена

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

<style lang="pcss">

#brand-menu {

  .menu-section {

    z-index: 300;
    position: fixed 30px 30px * *;

    i.ic-menu_bullets {
      padding:40px 25px;
      @media (--overmobile){
        display: none;
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
        background: rgba(0, 0, 0,.6);
      }
    }
  }

  .brand-section {

    height: 100px;

    img {
      cursor: pointer;
      margin-top: 15px;
      margin-left: 1%;
      display: inline-block;
      float:left;
      max-width: 150px;

      @media (--mobile ){
        margin-left: 37px;
        margin-top: 50px;
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
      border: 1px solid white;
      color: white;
      border-radius: 5px;

      @media (--overmobile) {
        width: initial;
        padding:10px 35px;
      }

      @media (--mobile){
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
