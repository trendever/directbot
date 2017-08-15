<style src="./style.pcss"></style>
<template lang="pug" src="./template.pug"></template>

<script>
import listen from 'event-listener';
import * as userService from 'services/user';
import * as productsService from 'services/products';
import * as profileService from 'services/profile';
import clipboard from 'clipboard';
import store from 'root/store';
import { mapActions, mapGetters } from 'vuex';
import { caption_spaces } from 'root/filters';

import config from 'root/../config';

import photos from 'components/photos/index';
import headerComponent from 'components/header';
import RightNavComponent from 'components/right-nav';
import NavbarComponent from 'components/navbar/navbar';
import MenuSample from 'components/menu/menu-sample';
import ConnectButton from 'components/connect-button';
import phoneComponent from 'components/phone/phone-btn';
import { ScrollStorage } from 'root/utils';

export default {


  data(){

  let showBanner = (window.localStorage.getItem('isMainBannerShow') === null) ? true : false;
    return {
      hideNavUser: false,
      hideGrey: false,
      loaded: true,
      //anotherId: 1, //пустая лента без единого товара
      isMoreClass: false,
      showBanner: showBanner,
      showProfileMenu: false,
      timeID: null,
      bodyListner: '',
      supplierProfileID: 0,
      shoplocation: "",
      shopabout: "",
      source: config.trendever ? 'tndvr.com' : 'drbt.io',
      firstOpenAppPage: false
    }

  },

  beforeRouteEnter({ params: { id }, name }, from, next ){

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

    function handler(vm){

      if(vm.isSelfPage && vm.isFake) {
        vm.$router.push({name: 'home'});
        return;
      }

      if(!from.name) {
        vm.firstOpenAppPage = true;
      }

      if(store.getters.monetizationStatus === null && from.name !== 'connect-bot' && vm.isSelfPage){

        if(!config.trendever) {
          let connectShown = vm.$store.state.user.connectBanner;
          if(!connectShown) {
            vm.$store.dispatch('hideConnectBanner');
            //vm.$router.push({ name: 'connect-bot'})
          }
        }
      }
    }


    store
      .dispatch('openProfile', replace  )
      .then(()=>{
        next(handler);
      })
      .catch( () => {
        next(handler);
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
    this.connectDirect.bind(this)
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

      if(this.isSelfPage){
        window.scrollTo(0, +localStorage.getItem(this.$route.name + '.scroll'))
      }

      if(!this.isSelfPage){
        this.scrl = new ScrollStorage();
        window.eventHub.$on('scrollToShop',()=>{
          this.scrl.scrollTo(this.$route.params.id)
        })
        this.scrollSave = listen(window, 'scroll',()=> {
          this.scrl.setValue(this.$route.params.id, document.body.scrollTop)
        })
      }

      if(!this.isSelfPage){
        this.hideNavUser = true;
        setTimeout(()=>{
          this.hideNavUser = false;
        }, 10000)
      }


      if(this.$refs.profileDesk.offsetHeight > 200){
        this.isMoreClass=false
      }

    })
  },

  beforeDestroy(){
    if(this.scrollSave)this.scrollSave.remove();
    this.bodyListner.remove();
    if (this.copy) this.copy.destroy();
    clearInterval(this.timeID);
  },

  methods: {
    connectAssistant(){
      this.openMenuProduct(config.connect_assistant_id)
    },
    ConnectNoimage(){
      if(!this.getUserPhoto && this.isSelfPage)this.$router.push({name: "connect-bot"})
    },
    openConditions(){
      if(!this.isTrendever){
        this.$router.push({name: "popup", params: { id: "conditions"} } )
        return;
      }
      this.$router.push({name: "agreement" } )
    },
    openOptions(){
      this.openMenuProduct(config.options_product_id)
    },
    backArrow(){
      window.history.back();
    },
    daysclick(){
      this.$router.push( { name: 'monetization' });
    },
    monetizationAction(){
      if(this.user.plan_id && this.user.plan_id != 1){
        this.$router.push({name: 'fake_chat', params:{result: true}, query: {last: 'profile'}})
      } else {
        this.$router.push({name: 'monetization'})
      }
    },
    findBloger(){
      //if( !this.botActivity ) return;
      this.$store.dispatch('createLead', config.bloger_product_id)
          .then(
            ( lead ) => {
              if ( lead !== undefined && lead !== null ) {
                this.$router.push( { 
                  name: 'chat', 
                  params: { id: lead.id }, 
                  query: { 
                    action: 'support',
                    type: 'blogger'
                  } 
                } )
              }
            }
          )
    },
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
      this.shoplocation = calculated.location.join(" ").replace("-","")
    },

    //filter
    caption_spaces,

    supportChat(){
      this.$store.dispatch('createLead', config.service_product_id )
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
      let self = this;
      this.$nextTick(()=>{
        this.copy =  new clipboard('.profile_insta-link', {
            text(trigger){
              return self.$refs.instaLink.textContent;
            }
          })
        this.copy.on('success',()=>{

          let text = `Ссылка ${this.getUserNameLinked}.${this.source} скопирована для вставки.`;
          if(this.isIos){
            alert(text)
            return;
          }
          window.eventHub.$emit('popup-clipboard',text)
        })
        this.copy.on('error', () =>{
          let text = 'К сожалению скопировать ссылку не удалось.<br><br> Сделайте это вручную'
          this.copy.destroy();
          this.copy = false;
          window.eventHub.$emit('popup-clipboard',text)
        });
      })
    },
    logout(){
      this.$store.dispatch('logOut')

      window.location = '/';


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
    appWord(){
      return this.isTrendever ? 'профиля' : 'бизнеса'
    },
    hasAnyInfo(){
      return this.shoplocation || this.shopabout || this.user.working_time;
    },
    chatsTitle(){
      return this.declOfNum(["чат","чата","чатов"])(this.chatsCount);
    },
    productsCountTitle(){
      return this.declOfNum(["пост","поста","постов"])(this.user.products_count);
    },
    postsCountTitle(){
      return this.declOfNum(["пост","поста","постов"])(this.postsCount);
    },
    longCaption(){
      return this.getUserCaption && (this.getUserCaption.length > 300);
    },
    shoptel(){
      if (this.user.working_time){
        let splited = this.user.working_time.split("_")
        if (splited.length > 1){
          return "tel:+" + splited[1].replace(" ","")
        }
      }
      return ""
    },

    shoptime(){
      if (this.user.working_time){
        let splited = this.user.working_time.split("_")
        if (splited.length > 1){
          return (splited[0].replace(" ","") == '-') ? "" : splited[0]
        }
        return this.user.working_time
      }
      return ""
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
    getUserNameLinked(){
      return this.getUserName.replace(new RegExp("_", 'g'),"-");
    },
    listId() {

      if(this.getPhotoConfig) return this.getPhotoConfig.listId;

    },
    isSelfPage(){

      return this.$route.name === 'profile';

    },
    mentionerId() {

      if(this.user){
        return this.user.supplier ? this.user.supplier.id : this.user.id;
      }

    },

    ...mapGetters([
      'getBannerInfo',
      //leads
      'getAllLeads',
      //user
      'isFake',
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
    phoneComponent,
    ConnectButton,
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
  .navbar {
    bottom: 0;
  }
  .directbot-navbar.hide-nav {

    .navbar-cnt .navbar {
      bottom: -98px;
      transition: all 0.4s;
    }
  }

}


</style>
