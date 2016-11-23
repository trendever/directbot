<style src="./style.pcss"></style>
<template lang="pug">
#profile
  header-component(:title='getUserName', :left-btn-show='true').directbot-header
      div.profile-right-menu(slot="content", v-if="isMobile && $route.name === 'profile'")
        i.ic-options_menu(@click="buyTg")
      div.profile-days(slot="content")
        span 3
        span.day д
  .directbot-right-nav
    //-right-nav-component(current="profile")

  .section.top.bottom.db-bottom
    .section__content(v-cloak)
      .profile
        .profile_info

          .profile_info_img()
            img(:src="getUserPhoto")
          .profile_info_about(v-if="false")
            span.profile_info_about_type Магазин #[br(v-if="isMobile")]
            span.profile_info_about_location  Красноярск #[br(v-if="isMobile")]
            span.profile_info_about_work-time  10.00-21.00 #[br(v-if="isMobile")]
            span.profile_info_about_posts-quantity  951 постов

        .profile_desc.less(
          v-on:click="this.isMoreClass = !this.isMoreClass",
          v-bind:class="{ more : isMoreClass, less: !isMoreClass}")

          .profile_desc_t(v-if="getSlogan") {{getSlogan}}
          .profile_desc_caption(v-if="getUserCaption") {{getUserCaption | captionSpaces}}

        .profile_insta-link(v-if="$route.name === 'profile' && shopId !== 1 && isMobile")
          .insta-link-text ссылка на эту витрину
          .insta-link(:ref="instaLink") {{ getUserName }}.drbt.io

        button.turn-on-bot-btn-desk.blue-btn(
        v-link="{ name: 'turn-on-bot' }", v-if="!isMobile") ПОДКЛЮЧИТЬ БОТА
        button.find-bloger-btn.blue-btn(v-if="!isMobile") НАЙТИ БЛОГЕРА

      template(v-if="loaded")
        .profile_inactive(v-if="false")
          img(src="./img/empty-directbot-profile.png")
          span.empty Деактивирован
          span #[br(v-if="isMobile")]мониторю 3 поста #[br] отправил 5 сообщений
        .profile_active
          img(src="./img/active-directbot-profile.png", v-if="isMobile")
          img(src="./img/active-directbot-profile-desk.svg", v-if="!isMobile")
          .text-box
            p.bold Активирован #[br]
            p.light мониторю 3 поста #[br] отправил 5 сообщений
        .profile_no-goods-banner(v-if="false")
          span После подключения #[br(v-if="isMobile")]
          span.save Directbot #[br(v-if="!isMobile")]
          span  начнет мониторить все #[br(v-if="isMobile")] ваши новые посты #[br(v-if="!isMobile")] и автоматически #[br(v-if="isMobile")] отвечать на вопросы покупателей

        button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom.turn-on-bot-btn(
        v-link="{ name: 'turn-on-bot' }", v-if="getAuthUser.supplier_of === null && isMobile") ПОДКЛЮЧИТЬ БОТА

        //-button.bot-active-btn(v-if="false") БОТ АКТИВЕН
          i.ic-close

        a(class='profile-header__menu-link', @click="logout", v-if="isAuth") Выход

  photos-component

  .directbot-navbar(v-if="isMobile")
    //-navbar-component(:current='listId')

</template>

<script>
import photos from 'components/photos/index';
import headerComponent from 'components/header';

import { mapActions, mapGetters } from 'vuex';

export default {

  data(){
    return {
      loaded: true,
      getAuthUser: {},
    }
  },
  computed: {
    ...mapGetters([
      'userShopId'
    ])
  },
  methods:{
    ...mapActions([
      'openProfile'
    ])

  },
  components: {
    photos,
    headerComponent
  },
}
</script>


<style lang="postcss">

@import '../../components/vars/vars.pcss';

#profile {

  .btn-bot-connect {

    @mixin button__sample

  }

}


</style>
