<style src="./style.pcss"></style>
<template lang="pug" src="./template.pug"></template>

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
