<template lang="pug">

#list(ref="list")
  trendever-hero(v-if="!$store.getters.isAuth && showHero")

  brand-menu.list-menu
    template(slot="desktop-view")
      //-img(src="../img/directbot-logo-txt.svg" onclick="window.open('https://www.trendever.com')")
      .land__top-btn(@click="$router.push({name: 'auth'})") ВХОД
      .land__top-btn(onclick="window.open('https://www.directbot.io')") ПОКУПАТЕЛЯМ
      .land__top-btn(onclick="window.open('https://www.trendever.com/dressblogger')") БЛОГЕРАМ

    template(slot="mobile-view")
      i.ic-menu_bullets(@click="showMenu=true")
      menu-sample.blue(:opened="showMenu", v-on:close="showMenu = false")
        .item(@click="$router.push({name: 'auth'})")
          .text Вход
        .item(onclick="window.open('https://www.directbot.io')")
          .text Покупателям
        .item(@click="$router.push({name: 'dress-blogger'})")
          .text Блогерам
        .item
          .text.__txt-blue Отмена

  header-component(:leftBtnShow="false",
   :className="{class: 'rel', cond: !isAuth && showHero && !isMobile}",
   v-if="$store.getters.isAuth || isMobile && !showHero")

    .search-text(slot="center-content")

      .search-input

        input(
          @click="$event.target.focus()",
          @keyup="search",
          ref="search",
          placeholder="..поиск",
          :value="searchValue")

        .s-icon(@click='search(), $refs.search.focus()')
          i.ic-search.__mirror



        .tags-count(v-if="selectedTagsId.length", @click="clear")
          span {{ selectedTagsId.length }}

        i.ic-close(v-if="selectedTagsId.length || searchValue", @click="clear")


  .tags-wrap(:class="{'no-margin': !isAuth && !isMobile}")
    tags-component(:tags="tags")

  .wrap-photos
    photos-component(:tags="true", :list-name="'list'")

</template>

<script>
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
    trendeverHero,
    photosComponent,
    tagsComponent,
    headerComponent,
    menuSample,
    brandMenu

  },
  data(){
    return {showHero: true, showMenu: false}
  },
  created(){

    this.$store.dispatch('loadTags');

    listen(window, 'scroll',()=>{
      if(this.showHero && !this.isAuth){
        if(document.body.scrollTop >= 2 * window.innerHeight && this.isMobile){
          this.showHero = false;
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
  watch:{
    showHero(){
      window.scrollTo(0,0)
    }
  },
  computed: {
    ...mapGetters([
      'selectedTagsId',
      'tags',
      'searchValue',
      'isAuth'
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
  .header.rel {
    position: absolute 378px 0 * 0;
    @media (--tabletandless) {
      display: none;
    }
  }
  .search-text {

    max-width: 1050px;
    height: 100%;
    text-align: right;
    flex-grow: 1;

    @media (--mobile) {
      flex-grow: 1;
    }

    .search-input {

      @media (--overmobile) {
        margin-top: 8px;
        position: relative;
        width: 250px;
        float: right;

      }

      @media (--mobile) {
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


        @media (--overmobile) {
          //transform: translateX(-45px);
          font-family: $font__family__light;
          float: left;
          width: 200px;
          &::placeholder {
            color: white;
            opacity: .5;
          }
        }

        @media (--mobile) {
          transform: translateX(-17px);
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
          border-bottom: 1px solid white;
          outline: none;
        }

      }

      .tags-count {
        display: none;
        @media (--mobile) {
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

        @media (--overmobile) {
          display: none;
        }
        @media (--mobile) {
          position: absolute  0 0 * *;
          padding: 28px;
          font-size: $font__medium;
          color: $color__gray-dark;
        }
      }

    }

    .s-icon {

      display: inline-block;
      color: white;
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
    @media (--mobile) {
      margin-top: 89px;
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
