<style src="./style.pcss"></style>
<template lang="pug">
#profile

  header-component(:title='getUserName', :left-btn-show='false').directbot-header

      div.profile-right-menu(slot="content", v-if="isMobile && isSelfPage")

        i.ic-options_menu(@click.stop="showProfileMenu = true")

      div.profile-days(slot="content" v-if="isSelfPage && monetizationDays !== null")
        span {{ monetizationDays }}
        span.day д

  menu-sample(:opened="showProfileMenu", v-on:close="showProfileMenu = false")
    .item
      .text(@click.stop="buyService") Поддержка
    .item
      .text.__txt-blue Отмена
    .item
      .text.__txt-red(@click.stop="logout") Выход

  .directbot-right-nav
    right-nav-component(current="profile" v-on:open-profile-menu="showProfileMenu = true")

  .section.top.bottom.db-bottom
    .section__content(v-cloak)

      .profile

        .profile_info

          .profile_info_img
            img(:src="getUserPhoto")


          .profile_info_about(v-if="user.location && user.working_time && user.products_count")
            span.profile_info_about_type
              | Магазин
            span.profile_info_about_location
              | {{ user.location}}
            span.profile_info_about_work-time
              |  {{ user.working_time }}
            span.profile_info_about_posts-quantity
              |  {{ user.products_count }} постов


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
          @click="$router.push({name: 'connect-bot'})", v-if="!isMobile && isAuth") ПОДКЛЮЧИТЬ
        button.find-bloger-btn.blue-btn(v-if="!isMobile && isAuth") НАЙТИ БЛОГЕРА



      template(v-if="loaded && isSelfPage")

        .profile_inactive(v-if="!botActivity")
          img(src="./img/empty-directbot-profile.png")
          span.empty Деактивирован
          span мониторю {{ postsCount  }}  постов #[br] общаюсь в {{ chatsCount }} чатах
        .profile_active(v-if="botActivity")
          img(src="./img/active-directbot-profile.png", v-if="isMobile")
          img(src="./img/active-directbot-profile-desk.svg", v-if="!isMobile")
          .text-box
            p.bold Активирован #[br]
            p.light(v-if="!postsCount") нет активных постов, ожидаю..
            p.light(v-if="postsCount") мониторю {{  postsCount }} поста #[br] общаюсь в {{ chatsCount }} чатах
        .profile_no-goods-banner(v-if="!botActivity && getStats.indexOf('profile-banner') === -1 && !hideGrey")
          i.ic-close(@click="$store.dispatch('closeStat', 'profile-banner')")
          span После подключения #[br(v-if="isMobile")]
          span.save &nbspоператор #[br(v-if="!isMobile")]
          span(v-if="isMobile").save начнет мониторить #[br(v-if="isMobile")]
          span(v-if="!isMobile") начнет мониторить
          span &nbspвсе ваши посты #[br(v-if="!isMobile")] и автоматически #[br(v-if="isMobile")] отвечать на вопросы покупателей


      connect-button(v-if="isSelfPage && isMobile && !botActivity")

        //-button.bot-active-btn(v-if="false") БОТ АКТИВЕН
          i.ic-close

  photos(:shopId="supplierProfileID || userShopId || anotherId", :listName="listId")

  .directbot-navbar(v-if="isMobile && isAuth")
    navbar-component(current='profile')

</template>

<script>
import listen from 'event-listener';
import * as userService from 'services/user';
import * as productsService from 'services/products';
import settings from 'root/settings';
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
import ConnectButton from 'components/connect-button';

export default {


  data(){

  let showBanner = (window.localStorage.getItem('isMainBannerShow') === null) ? true : false;

    return {
      hideGrey: false,
      loaded: true,
      anotherId: 1, //пустая лента без единого товара
      isMoreClass: false,
      showBanner: showBanner,
      copyMessage: '',
      showCopyMessage: false,
      showProfileMenu: false,
      timeID: null,
      bodyListner: '',
      supplierProfileID: 0

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

    let replace = instagram_username ? instagram_username.replace(new RegExp("-", 'g'),"_") : null;

    function goConnect(vm){
      if(store.getters.monetizationStatus === null && to.name !== 'connect-bot'){ 
        vm.$router.push({ name: 'connect-bot'})
      }
    }


    store
      .dispatch('openProfile', replace  )
      .then(()=>{

        next(goConnect);

      })

      .catch( () => {

        next(goConnect);

      });


  },

  watch:{

    '$route'(to, from) {

      if(from.name === 'user') {

        let user = profileService.getProfile().user

        let id = user.instagram_name ? user.instagram_name : user.id;

        store.dispatch('openProfile', id );

        this.userShopId = id;

        window.eventHub.$emit('updatePhotos', id)

        this.listId = 'profile';

      }

    }

  },

  created(){
    if(this.monetizationTestOver) {
      //this.$router.replace({name: 'connect-bot'});
    }

    this.bodyListner = listen(document.body, 'click',()=>{
      this.showProfileMenu = false
    })
  },

  mounted(){
    window.eventHub.$on('hide-grey',() => { this.hideGrey = true });

    this.clipboardLogic();
    this.updateProductsLogic();

  },

  beforeDestroy(){
    this.bodyListner.remove();
    if (this.copy) this.copy.destroy();
    clearInterval(this.timeID);
  },

  methods: {

    //filter
    caption_spaces,

    buyService(){
      this.$store.dispatch('createLead', settings.supportID )
          .then(
            ( lead ) => {
              if ( lead !== undefined && lead !== null ) {
                this.$router.push( { name: 'chat', params: { id: lead.id } } )
              }
            }
          )

    },

    updateProductsLogic(){

      function update(vm){
        productsService.lastProduct({ shop_id: vm.supplierProfileID })
          .then(data=>{
            let product = vm.listProducts.some( item=> { return +item.id === data.id } )
            if ( !product ) eventHub.$emit('updatePhotos');
          })
      }



      if(this.isSelfPage) {
        this.timeID = setInterval(()=>{
          if(!this.supplierProfileID) {
            userService.get({}).then( user=> {
              if(user.supplier_of) {
                this.supplierProfileID = user.supplier_of[0];
                update(this);
              }
            })
          } else {
            update(this);
          }
        }, 15 * 1000)
      }

    },

    clipboardLogic(){
      if(this.isSelfPage && this.isMobile) {
          let self = this;
          this.$nextTick(()=>{
            this.copy =  new clipboard('.profile_insta-link', {
                text(trigger){
                  return self.$refs.instaLink.textContent;
                }
              })
            this.copy.on('success',()=>{
              this.copyMessage = `Ссылка ${this.getUserName}.tndvr.com скопирована для вставки.`;
              this.showCopyMessage = true;
            })
            this.copy.on('error', () =>{
              this.copyMessage = 'К сожалению скопировать ссылку не удалось.<br><br> Сделайте это вручную'
              this.showCopyMessage = true;
              this.copy.destroy();
              this.copy = false;
            });
          })
      }
    },
    logout(){
      this.$store.dispatch('logOut')
      this.$router.push({name: 'home'})

    },

    openOptions(){
      return;
    },

    hideBanner(){
      window.localStorage.setItem('isMainBannerShow',false);
      this.showBanner = false;
    }

  },

  computed: {

    postsCount(){

      if(this.user && this.listProducts) {

        let count = this.user.products_count;
        let length = this.listProducts.length;
        return count > length ? count : length;
      }
      return 0;



    },

    chatsCount() {

      return this.getAllLeads.seller.length;

    },

    listId() {

      if(this.getPhotoConfig) return this.getPhotoConfig.listId;

    },
    isSelfPage(){

      return this.$route.name === 'profile';

    },

    ...mapGetters([
      'getStats',
      //leads
      'getAllLeads',
      //user
      'user',
      'isAuth',
      'getAuthUser',
      'userShopId',
      'getUserName',
      'getPhotoConfig',
      'getUserPhoto',
      'getSlogan',
      'getUserCaption',

      //monetization
      'monetizationDays',
      'botActivity',
      'monetizationTestOver',
      //products
      'listProducts'

    ])

  },

  components: {
    ConnectButton,
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
