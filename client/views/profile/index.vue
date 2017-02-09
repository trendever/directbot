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
      supplierProfileID: 0,
      shoplocation: "",
      shopabout: "",
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
      if(store.getters.monetizationStatus === null && to.name !== 'connect-bot' && vm.isSelfPage){
        let connectShown = vm.$store.state.user.connectBanner; 
        if(!connectShown) {
          vm.$store.dispatch('hideConnectBanner');
          vm.$router.push({ name: 'connect-bot'})
        }
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

    if (this.user.location){
      this.setShopData();
    }
    this.$nextTick(()=>{

      let query = this.$route.query;
      if(query){
        if(query.product){
          let state = this.$store.state.products;
          let index = state.lists[state.listId].products.findIndex(i => i.id == query.product);
          this.$store.dispatch('deleteProduct', index);
        }
      }
    })
    
  },

  beforeDestroy(){
    this.bodyListner.remove();
    if (this.copy) this.copy.destroy();
    clearInterval(this.timeID);
  },

  methods: {
    setShopData(){
      
      let splitted = this.user.location.split(" ");

      let calculated = splitted.reduce(function(result,current,index){
          if (current.indexOf(",") >= 0){
              result.location.push(current)
              result.next_i = index + 1;
              return result;
          }

          if (index === result.next_i || index === 0){
              result.location.push(current)
          }else{
              result.info.push(current)
          }

          return result;
      },{ location: [], next_i: -1, info: [] });

      this.shopabout = calculated.info.join(" ");
      this.shoplocation = calculated.location.join(" ")
    },

    //filter
    caption_spaces,

    supportChat(){
      this.$store.dispatch('createLead', settings.supportID )
          .then(
            ( lead ) => {
              if ( lead !== undefined && lead !== null ) {
                this.$router.push( { name: 'chat', params: { id: lead.id }, query: { action: 'support' } } )
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

      window.location = '/';


    },

    openOptions(){
      return;
    },

    hideBanner(){
      window.localStorage.setItem('isMainBannerShow',false);
      this.showBanner = false;
    },

    declOfNum(titles){
        var cases = [2, 0, 1, 1, 1, 2];
        return function(number){
            return  titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
        }
    }

  },

  computed: {
    productsCountTitle(){
      return this.declOfNum(["пост","поста","постов"])(this.user.products_count)
    },    

    longCaption(){
      return this.getUserCaption && this.getUserCaption.length > 300
    },

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
      'getBannerInfo',
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
