<style src='./styles/chat-header.pcss'></style>
<style lang="postcss">
  #chat-header {
    .inline-span {
      display: inline-block;
    }
  }
</style>
<template lang="pug">
#chat-header

  header-component(
    :notify-count="unreadCount",
    :back-function="leftBtnAction")

    .chat-header(slot='flex-item')

      <!-- Default chat header -->
      template(v-if="!isServiceShop && !findBlogger")

        .chat-header_photo
          img(
          :src='userImage'
          v-on:error='onUserImageError',
          @click="$router.push({name: 'user', params: {id: getShopName}})")

        .chat-header_cnt(v-show='getShopName' v-if="!isServiceShop")
          .chat-header_cnt_t(@click="$router.push({name: 'user', params: {id: getShopName}})") {{ getShopName }}
          .chat-header_cnt_info
            span.chat-header_cnt_info-text
            | {{ getLeadId }},
            span  {{ getStatus }}


      <!-- Chat header for service chat -->
      template(v-if="isServiceShop && !findBlogger")

        .chat-header_photo
          img(:src='userImage' v-on:error='onUserImageError' v-if="!fakeChat")

        .chat-header_cnt.support
          .chat-header_cnt_t {{ $route.name=='fake_chat' ? 'Кошелёк': 'Поддержка'}}


      template(v-if="findBlogger")
        .chat-header_cnt.support.blogger
          .chat-header_cnt_t Поиск блогера 

    phone-component.no-mob(slot="action-elements", :phone="'tel:+79854107012'")
    phone-component.no-desk(slot="center-content", :phone="'tel:+79854107012'")

</template>

<script >
  import { mapGetters } from 'vuex';
  import { urlThumbnail } from 'root/utils'

  import HeaderComponent from 'components/header'
  import phoneComponent from 'components/phone/phone-btn';
  import { getLeadByConversationId } from 'root/store/getters/lead.js'
  import config from 'root/../config.js';

  export default {
    data(){
      return {
        findBlogger: false
      }
    },
    created(){
      if(this.$route.query.type=='blogger'){
        this.findBlogger=true
      }
    },
    methods: {
       onUserImageError(){
        console.warn(`Load user photo has failed. Chat id: ${this.getId}`);
         //this.userImage = require('base/img/logo.png');
      },
      leftBtnAction(){

        if(this.$route.query){

          if(this.$route.query.product){
            this.$router.push({name: 'product_detail', params: {id: this.$route.query.product } });
            return;
          }

          if(this.$route.query.last === 'monetization'){
            this.$router.push({name: 'monetization'});
            return;
          }

          if(this.$route.query.last === 'profile'){
            this.$router.push({name: 'profile'});
            return;
          }

          if(this.$route.query.action === 'support'){
            this.$router.push({name: 'profile'});
            return;
          }
        }

        if(this.prevPage){
          if(this.prevPage.params){
            if(this.prevPage.params.id === 'connect'){
              this.$router.push({name: 'connect-bot'});
              return;
            }
          }
        }

        if(!this.$store.getters.getId){
          this.$router.push({name: "chat_list"})
          return;
        }

        // let products = getLeadByConversationId(this.$store.state.leads, this.$store.getters.getId).products;


        // if(products) {

        //   let check = id => products.some( item => item.id == id )

        //   if(check(config.monetization_help_id)) {
        //     this.$router.push({name: "monetization"})
        //     return;
        //   }

        // }


        if (this.isFake && this.fakeAction === 'chat-info'){
          this.$router.push({name: "home"})
          return;
        }

        if (this.isFake && this.fakeAction === 'chat-product'){
          this.$router.push({name: "product_detail", params: { id: this.$route.query.product }})
          return;

        }

        this.$router.push({name: "chat_list"})


      }

    },

    beforeDestroy(){
      if(window.infoQuestions){
        this.$store.dispatch('logOut')
        this.$router.push({name: 'home'})
      }
    },

    props:{
      fakeChat: {
        type: Boolean,
        default: false
      },
      disableNotifier: {
        type: Boolean,
        default: false
      },
      prevPage: {}
    },

    computed: {
      userImage(){
        return this.getPhoto || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      },
      unreadCount(){
        return this.isFake ? 0 : this.getGlobalNotifyCount;
      },
      ...mapGetters([
        'user',
        'fakeAction',
        'getId',
        'getLeadId',
        'getStatusName',
        'getShopName',
        'getShopSupplierId',
        'isServiceShop',
        'getIsServiceProductTitle',
        'getPhoto',
        'isFake',
        'getGlobalNotifyCount'
      ]),
      getStatus(){
        if ( this.getStatusName !== null ) {
          return this.getStatusName.toLowerCase();
        }
      },
      getServiceChatName(){
        return this.getIsServiceProductTitle
      }
    },
    components: {
      HeaderComponent,
      phoneComponent
    }
  }
</script>
