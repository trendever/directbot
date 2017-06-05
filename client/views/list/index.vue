<template lang="pug">

#list(ref="list")
  trendever-hero(v-if="!$store.getters.isAuth && isTrendever")

  brand-menu.list-menu(v-if="!$store.getters.isAuth && isTrendever")
    template(slot="desktop-view")
      //-img(src="../img/directbot-logo-txt.svg" onclick="window.open('https://www.trendever.com')")
      .land__top-btn(@click="$router.push({name: 'auth'})") ВХОД
      .land__top-btn(onclick="window.open('https://www.directbot.io')") МАГАЗИНАМ
      .land__top-btn(onclick="window.open('https://www.trendever.com/dressblogger')") БЛОГЕРАМ

    template(slot="mobile-view" v-if="!isAuth && showHero")
      i.ic-menu_bullets(@click="showMenu=true")
      menu-sample.blue(:opened="showMenu", v-on:close="showMenu = false")
        .item(@click="$router.push({name: 'auth'})")
          .text Вход
        .item(onclick="window.open('https://www.directbot.io')")
          .text Магазинам
        .item(@click="$router.push({name: 'dress-blogger'})")
          .text Блогерам
        .item
          .text.__txt-blue Отмена



  .header-mobile(v-if="isMobile")
    i.ic-logo_trendever_txt(v-if="isTrendever")
    i.ic-logo_directbot_txt(v-else)

  header-component(:leftBtnShow="false",
    :class="{'no-hero-auth': showHero && isAuth && isMobile }",
    v-if="isAuth")
    right-nav(:current="'home'" slot="content")
    search-text(slot="center-content")

  search-text(v-if="!isAuth")

  .tags-wrap(:class="{'no-margin': !isAuth }")
    tags-component(:tags="tags")

  .wrap-photos
    photos-component(:tags="true", :list-name="'list'", ref="photos")

  .directbot-navbar(v-if="isMobile && isAuth")
    navbar-component(current='home')

  template(v-if="isTrendever && isAuth")
    .grey-banner.has-chats(v-if="getBannerInfo.indexOf('list-banner') === -1")
      i.ic-close(@click="$store.dispatch('closeStat', 'list-banner')")
      | Лента товаров&nbsp
      | формируется#[br.mobile] из шопинг-желаний&nbsp
      | покупателей#[br]
      | и трендскаутов. Места в топе не продаются,#[br]
      | сортировка строго хронологическая



</template>

<script>
import rightNav from 'components/right-nav';
import navbarComponent from 'components/navbar/navbar';
import trendeverHero from './trendever-hero';
import photosComponent from 'components/photos';
import tagsComponent from 'components/tags';
import headerComponent from 'components/header';
import menuSample from 'components/menu/menu-sample';
import brandMenu from 'components/menu/brand-menu';
import searchText from './search-text';
import { mapGetters } from 'vuex';
import listen from 'event-listener';
export default {
  components: {
    navbarComponent,
    trendeverHero,
    photosComponent,
    tagsComponent,
    headerComponent,
    menuSample,
    brandMenu,
    rightNav,
    searchText

  },
  mounted(){
    this.$nextTick(()=>{
      let scroll = localStorage.getItem('home.scroll')
      document.body.scrollTop = scroll;
    })
  },
  data(){
    return {showHero: true, showMenu: false,changeListen:{}}
  },
  created(){

    this.$store.dispatch('loadTags');

    this.changeListen = listen(window, 'scroll',()=>{
      if(this.isAuth){
        if(document.body.scrollTop >= 89 && this.isMobile){
          this.showHero = false;
        } else {
          this.showHero = true;
        }
      }
    })

  },
  beforeDestroy(){
    this.changeListen.remove();
  },
  watch:{
    showHero(){
      //window.scrollTo(0,0)
    }
  },
  computed: {
    ...mapGetters([
      'tags',
      'isAuth',
      'getBannerInfo'
    ])
  },
};

</script>

<style lang="postcss" >
@import 'style/vars/vars.pcss';

#list {
  .list-menu {
    position: absolute 0 0 * 0;
  }

  .header.no-hero-auth {
    position: absolute !important;
    top: calc(89px + 1px);
    left:0;
    right:0;
  }



  .header-mobile {
    height: 89px;
    position: relative;
    color: $color__brand;
    text-align: center;
    line-height: 89px;
    background: $color__header__bg;
    font-size: 60px;
    padding-top: 17px;
    border-bottom: 1px solid $color__header__border;

    .standalone & {
      z-index: 999;
      padding-top: 55px;
      height: calc($standalone__fake__height + 89px)
    }


  }

  .tags-wrap {
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    position: relative;
    background: white;
    max-width: 1050px;
    margin: 50px auto 0 auto;
    transition: all .3s ease;
    @media (--tabletandless) {
      margin-top: calc(89px + 1px);
    }

    &.no-margin {
      margin: 0px auto 0 auto;
    }
  }

  .wrap-photos {
    clear: both;
  }

}
</style>
