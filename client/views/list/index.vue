<template lang="pug">

#list(ref="list")
  trendever-hero(v-if="!$store.getters.isAuth")

  brand-menu.list-menu
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
    i.ic-logo_trendever_txt
  header-component(:leftBtnShow="false",
   :class="{'no-hero': showHero && !isAuth, 'no-hero-auth': showHero && isAuth && isMobile }",
   v-if="$store.getters.isAuth || isMobile")

    right-nav(:current="'home'" slot="content")

    .search-text(slot="center-content")

      .search-input

        input(
          @click="$event.target.focus()",
          @keyup="search",
          ref="search",
          placeholder="Поиск",
          :value="searchValue")

        .s-icon(@click='search(), $refs.search.focus()')
          i.ic-search.__mirror



        .tags-count(v-if="selectedTagsId.length", @click="clear")
          span {{ selectedTagsId.length }}

        i.ic-close(v-if="selectedTagsId.length || searchValue", @click="clear")


  .tags-wrap(:class="{'no-margin': !isAuth && !isMobile}")
    .fake-top-standalone(v-if="isStandalone")
    tags-component(:tags="tags")

  .wrap-photos
    photos-component(:tags="true", :list-name="'list'", ref="photos")

  .directbot-navbar(v-if="isMobile && isAuth")
    navbar-component(current='home')

  template(v-if="isTrendever && isAuth")
    .grey-banner.has-chats(v-if="getBannerInfo.indexOf('list-banner') === -1")
      i.ic-close(@click="$store.dispatch('closeStat', 'list-banner')")
      | Лента товаров&nbsp
      span формируется#[br.mobile] из шопинг-желаний&nbsp
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
    rightNav

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
  methods: {
    search() {
      this.$store.dispatch('setSearchValue', this.$refs.search.value);
    },
    clear(){
      this.$store
        .dispatch('clearSearch')
        .then(()=>this.$refs.search.focus())
    }
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
      'selectedTagsId',
      'tags',
      'searchValue',
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

  .header.no-hero {
    position: absolute !important;
    top: calc(200% + 89px);
    left:0;
    right:0;
  }

  .header.no-hero-auth {
    position: absolute !important;
    top: 89px;
    left:0;
    right:0;
  }



  .header-mobile {
    height: 89px;
    position: relative;
    color: $color__brand;
    text-align: center;
    line-height: 89px;
    background: #f7f7f7;
    font-size: 60px;
    padding-top: 17px;

    .standalone & {
      z-index: 999;
      padding-top: 50px;
    }


  }

  .search-text {

    max-width: 1050px;
    height: 100%;
    text-align: right;
    flex-grow: 1;

    @media (--tabletandless) {
      flex-grow: 1;
    }

    .search-input {

      @media (--overtablet) {
        margin-top: 8px;
        position: relative;
        width: 250px;
        float: right;

      }

      @media screen and (min-width: 751px) and (max-width: 1400px) {
        margin-right: 160px;
      }

      @media (--tabletandless) {
        height: inherit;
        background: white;
      }

      input {

        display: inline-block;
        border-top: none;
        border-left: none;
        border-right: none;
        color: white;
        border-bottom: 1px solid white;
        font-size: $font__normal;
        background: $color__brand;
        font-family: $font__family__semibold;
        height: inherit;


        @media (--overtablet) {
          //transform: translateX(-45px);
          font-family: $font__family__light;
          color: $color__brand;
          border-bottom: 1px solid  $color__brand;
          float: left;
          width: 200px;
          background: #F7F7F7;
          &::placeholder {
            color: $color__brand;
            opacity: .5;
          }
        }

        @media (--tabletandless) {
          transform: translate(-17px);
          color: $color__gray-dark;
          font-size: $font__large;
          font-family: $font__family__light;
          width: 70%;
          display: block;
          margin-left: 120px;
          background: white;
        }


        &:focus {
          border-top: none;
          border-left: none;
          border-right: none;
          outline: none;
        }

      }

      .tags-count {
        display: none;
        @media (--tabletandless) {
          position: absolute 20px 90px * * ;
          text-align: center;
          size: 50px;
          line-height: 50px;
          color: white;
          background: $color__red__true;
          border-radius: 50%;
          span {
            display: inline-block;
            font-size: $font__medium;

          }

        }
      }

      i.ic-close {
        display: inline-block;
        color: white;

        @media (--overtablet) {
          display: none;
        }
        @media (--tabletandless) {
          position: absolute  0 0 * *;
          padding: 28px;
          font-size: $font__medium;
          color: $color__gray-dark;
        }
      }

    }

    .s-icon {

      display: inline-block;
      cursor: pointer;
      font-size: $font__normal;
      //position: absolute 0 0 * *;
      @media (--overmobile){
        float: left;
        padding-left: 5px;
      }
      @media (--mobile){
        padding-right: 20px;
        color: $color__brand;
        font-size: $font__large;
        position: absolute 0 * * 0 ;
        width: 100px;
      }

      i {
        transform: rotate(90deg);
        padding: 5px;
        @media (--mobile){
          padding: 22px;
        }
      }
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
      margin-top: calc(89px * 1 );
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
