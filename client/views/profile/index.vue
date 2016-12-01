<style src="./style.pcss"></style>
<template lang="pug">
#profile
  header-component(:title='getUserName', :left-btn-show='true').directbot-header
      div.profile-right-menu(slot="content", v-if="isMobile && isSelfPage")
        i.ic-options_menu(@click="buyTg")
      div.profile-days(slot="content" v-if="isSelfPage")
        span 3
        span.day д

  .directbot-right-nav
    //-right-nav-component(current="profile")

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

        .profile_desc.less(
          v-on:click="this.isMoreClass = !this.isMoreClass",
          v-bind:class="{ more : isMoreClass, less: !isMoreClass}")

          .profile_desc_t(v-if="getSlogan") {{ getSlogan }}
          .profile_desc_caption(v-if="getUserCaption") {{ getUserCaption | captionSpaces }}

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
          span После подключения
          span.save Directbot
          span  начнет мониторить все  ваши новые посты  и автоматически  отвечать на вопросы покупателей

        //-router-link(:to="{ name: 'turn-on-bot' }")
          button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom.turn-on-bot-btn(
          v-if="getAuthUser.supplier_of === null && isMobile") ПОДКЛЮЧИТЬ БОТА

        //-button.bot-active-btn(v-if="false") БОТ АКТИВЕН
          i.ic-close

        a(class='profile-header__menu-link', @click="logout", v-if="isAuth") Выход

  photos(:shopId="userShopId || anotherId", :listName="getPhotoConfig.listId")
  .directbot-navbar(v-if="isMobile")
    //-navbar-component(:current='listId')

</template>

<script>
import store from 'root/store';
import photos from 'components/photos/index';
import headerComponent from 'components/header';

import { mapActions, mapGetters } from 'vuex';

export default {


  data(){

    return {
      direcbotActive: true,
      directbotInactive: false,
      loaded: true,
      getAuthUser: {},
      anotherId: 1, //пустая лента без единого товара
      listId: '',
    }

  },

  beforeRouteEnter({ params: { id }, name }, to, next ){

    store.dispatch('openProfile', id).then(()=>{

      next();

    })

  },

  computed: {

    isSelfPage(){

      return this.$route.name === 'profile';

    },

    ...mapGetters([

      'userShopId',
      'getUserName',
      'getPhotoConfig',
      'getUserPhoto'

    ])

  },

  components: {

    photos,
    headerComponent
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
