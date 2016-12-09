<style src="./style.pcss"></style>
<template lang="pug">
#profile
  header-component(:title='getUserName', :left-btn-show='false').directbot-header

      div.profile-right-menu(slot="content", v-if="isMobile && isSelfPage")

        i.ic-options_menu(@click="showProfileMenu = true")

        menu-sample(:opened="showProfileMenu", v-on:close="showProfileMenu = false")
            .item
              .text.__txt-blue Отмена
            .item
              .text.__txt-red(@click.stop="logout") Выход

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

          .profile_info_about(v-if="location && working_time && user.products_count")
            span.profile_info_about_type Магазин&nbsp #[br(v-if="isMobile")]
              span(v-if="!isMobile") |
            span.profile_info_about_location  {{ user.location}}&nbsp #[br(v-if="isMobile")]
              span(v-if="!isMobile") |
            span.profile_info_about_work-time  {{ user.working_time }} #[br(v-if="isMobile")]
            span.profile_info_about_posts-quantity(v-if="isMobile")  {{ user.products_count }} постов

        .profile_desc(v-on:click="isMoreClass = !isMoreClass" v-bind:class="{ more : isMoreClass, less: !isMoreClass}")

          .profile_desc_t(v-if="getSlogan") {{ getSlogan }}
          .profile_desc_caption(v-if="getUserCaption" v-html="caption_spaces(getUserCaption)")

        .profile_insta-link(v-if="isSelfPage && isMobile")

          .insta-link-text ссылка на эту витрину
          .insta-link(ref="instaLink") {{ getUserName }}.drbt.io
          native-popup(:show-popup="showCopyMessage")
            .title-text.title-font Ссылка скопирована
            .main-text {{copyMessage}}
            .button-text(v-on:click.stop="showCopyMessage = false")
              span OK

        button.turn-on-bot-btn-desk.blue-btn(
          @click="$router.push({name: 'connect-bot'})", v-if="!isMobile") ПОДКЛЮЧИТЬ
        button.find-bloger-btn.blue-btn(v-if="!isMobile") НАЙТИ БЛОГЕРА



      template(v-if="loaded && isSelfPage")

        .profile_inactive
          img(src="./img/empty-directbot-profile.png")
          span.empty Деактивирован
          span мониторю 3 поста #[br] отправил 5 сообщений
        .profile_active(v-if="directbotInactive")
          img(src="./img/active-directbot-profile.png", v-if="isMobile")
          img(src="./img/active-directbot-profile-desk.svg", v-if="!isMobile")
          .text-box
            p.bold Активирован #[br]
            p.light мониторю 3 поста #[br] отправил 5 сообщений
        .profile_no-goods-banner
          i.ic-close
          span После подключения #[br(v-if="isMobile")]
          span.save &nbspоператор #[br(v-if="!isMobile")]
          span  начнет мониторить все #[br(v-if="isMobile")] ваши новые посты #[br(v-if="!isMobile")] и автоматически #[br(v-if="isMobile")] отвечать на вопросы покупателей


      button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom.turn-on-bot-btn(@click="$router.push({name: 'connect-bot'})", v-if="isSelfPage && isMobile") ПОДКЛЮЧИТЬ ОПЕРАТОРА

        //-button.bot-active-btn(v-if="false") БОТ АКТИВЕН
          i.ic-close

      a(class='profile-header__menu-link', @click="logout", v-if="isAuth") Выход

  photos(:shopId="userShopId || anotherId", :listName="listId")

  .directbot-navbar(v-if="isMobile && isAuth")
    navbar-component(current='profile')

</template>

<script>
import * as profileService from 'services/profile';
import clipboard from 'clipboard';
import store from 'root/store';
import { mapActions, mapGetters } from 'vuex';
import { caption_spaces } from 'root/filters';

import photos from 'components/photos/index';
import headerComponent from 'components/header';
import RightNavComponent from 'components/right-nav';
import NavbarComponent from 'components/navbar/navbar';
import nativePopup from 'components/popup/native';
import MenuSample from 'components/menu/menu-sample';

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
      showBanner: showBanner,
      copyMessage: '',
      showCopyMessage: false,
      showProfileMenu: false

    }

  },

  beforeRouteEnter({ params: { id }, name }, to, next ){

    let instagram_username;

    let user = profileService.getProfile().user;
    let token = profileService.getProfile().token;

    if(user && token) {

      if(name === 'profile') {

        instagram_username = user.instagram_username;

      }

      if(!user.supplier_of && name === 'profile') {

        instagram_username = null
      }

    }

    if(!token) {

      if(name === 'profile'){

        next(vm=>{

          vm.$router.push({name: 'auth'})

        })

        return;

      }

    }

    if (id) instagram_username = id

    store.dispatch('openProfile', instagram_username ).then(()=>{
      next();
    })

  },
  mounted(){


    if(this.isSelfPage && this.isMobile) {

      this.$nextTick(()=>{

        let self = this;

        self.copy =  new clipboard('.profile_insta-link', {

            text(trigger){

              return self.$refs.instaLink.textContent;

            }
          })

        self.copy.on('success',()=>{
          self.copyMessage = `Ссылка ${self.getUserName}.tndvr.com скопирована для вставки.`;
          self.showCopyMessage = true;

        })

        self.copy.on('error', () =>{
          self.copyMessage = 'К сожалению скопировать ссылку не удалось.<br><br> Сделайте это вручную'
          self.showCopyMessage = true;
          self.copy.destroy();
          self.copy = false;
        });

      })

    }

  },

  beforeDestroy(){
    if (this.copy) this.copy.destroy();
  },

  methods: {
    logout(){
      this.$store.dispatch('logOut')
      this.$router.push({name: 'home'})

    },
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
    listId() {

      if(this.getPhotoConfig) return this.getPhotoConfig.listId;



    },
    isSelfPage(){

      return this.$route.name === 'profile';

    },

    ...mapGetters([
      'user',
      'isAuth',
      'getAuthUser',
      'userShopId',
      'getUserName',
      'getPhotoConfig',
      'getUserPhoto',
      'getSlogan',
      'getUserCaption'

    ])

  },

  components: {
    nativePopup,
    photos,
    headerComponent,
    RightNavComponent,
    NavbarComponent,
    MenuSample
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
