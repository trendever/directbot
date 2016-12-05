<style src="./style.pcss"></style>
<template lang="pug">
#profile
  header-component(:title='getUserName', :left-btn-show='true').directbot-header
      div.profile-right-menu(slot="content", v-if="isMobile && isSelfPage")
        i.ic-options_menu(@click="openOptions")
      div.profile-days(slot="content" v-if="isSelfPage")
        span 3
        span.day д

  .directbot-right-nav
    right-nav-component(current="profile")

  .section.top.bottom.db-bottom
    .section__content(v-cloak)

      .profile

        .profile_info

          .profile_info_img(@click="$router.push({name: 'list'})")
            img(:src="getUserPhoto")

          .profile_info_about(v-if="false")
            span.profile_info_about_type Магазин
            span.profile_info_about_location  Красноярск
            span.profile_info_about_work-time  10.00-21.00
            span.profile_info_about_posts-quantity  951 постов

        .profile_desc(v-on:click="isMoreClass = !isMoreClass" v-bind:class="{ more : isMoreClass, less: !isMoreClass}")

          .profile_desc_t(v-if="getSlogan") {{ getSlogan }}
          .profile_desc_caption(v-if="getUserCaption") {{ caption_spaces(getUserCaption) }}

        .profile_insta-link(v-if="$route.name === 'profile' && shopId !== 1 && isMobile")
          .insta-link-text ссылка на эту витрину
          .insta-link(:ref="instaLink") {{ getUserName }}.drbt.io

        //-button.turn-on-bot-btn-desk.blue-btn(
          v-link="{ name: 'turn-on-bot' }", v-if="!isMobile") ПОДКЛЮЧИТЬ БОТА
        button.find-bloger-btn.blue-btn(v-if="!isMobile") НАЙТИ БЛОГЕРА



      template(v-if="loaded")

        .profile_inactive(v-if="directbotActive && isSelfPage")
          img(src="./img/empty-directbot-profile.png")
          span.empty Деактивирован
          span мониторю 3 поста #[br] отправил 5 сообщений
        .profile_active(v-if="directbotInactive && isSelfPage")
          img(src="./img/active-directbot-profile.png", v-if="isMobile")
          img(src="./img/active-directbot-profile-desk.svg", v-if="!isMobile")
          .text-box
            p.bold Активирован #[br]
            p.light мониторю 3 поста #[br] отправил 5 сообщений

        .profile_no-goods-banner(v-if="isSelfPage && !userShopId")
          i.ic-close(v-on:click="hideBanner", v-show="showBanner = false")
          span После подключения
          span.save &nbspоператор #[br(v-if="!isMobile")]
          span  начнет мониторить все  ваши новые посты #[br(v-if="!isMobile")] и автоматически  отвечать на вопросы покупателей

        //-router-link(:to="{ name: 'turn-on-bot' }")
          button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom.turn-on-bot-btn(
          v-if="getAuthUser.supplier_of === null && isMobile") ПОДКЛЮЧИТЬ БОТА

        //-button.bot-active-btn(v-if="false") БОТ АКТИВЕН
          i.ic-close

        a(class='profile-header__menu-link', @click="logout", v-if="isAuth") Выход

  photos(:shopId="userShopId || anotherId", :listName="getPhotoConfig.listId")

  .directbot-navbar(v-if="isMobile")
    navbar-component(:current='profile')

</template>

<script>

import store from 'root/store';
import { mapActions, mapGetters } from 'vuex';
import { caption_spaces } from 'root/filters';

import photos from 'components/photos/index';
import headerComponent from 'components/header';
import RightNavComponent from 'components/right-nav';
import NavbarComponent from 'components/navbar/navbar';

export default {


  data(){

  let showBanner = (window.localStorage.getItem('isMainBannerShow') === null) ? true : false;

    return {

      direcbotActive: true,
      directbotInactive: false,
      loaded: true,
      getAuthUser: {},
      anotherId: 1, //пустая лента без единого товара
      isMoreClass: false,
      showBanner: showBanner

    }

  },

  beforeRouteEnter({ params: { id }, name }, to, next ){

    store.dispatch('openProfile', id).then(()=>{

      next();

    })

  },

  methods: {

    caption_spaces,

    openOptions(){
      return;
    },

    hideBanner(){
      window.localStorage.setItem('isMainBannerShow',false);
      this.showBanner = false;
    }

  },

  computed: {

    isSelfPage(){

      return this.$route.name === 'profile';

    },

    ...mapGetters([

      'userShopId',
      'getUserName',
      'getPhotoConfig',
      'getUserPhoto',
      'getSlogan',
      'getUserCaption'

    ])

  },

  components: {

    photos,
    headerComponent,
    RightNavComponent,
    NavbarComponent
  }
}
</script>


<style lang="postcss">

@import 'style/vars/vars.pcss';

#profile {

  .btn-bot-connect {

    @mixin button__sample

  }

}


</style>
