<style src='./styles/chat-header.pcss'></style>
<template lang="pug">
#chat-header
  header-component(v-if="disableNotifier", :notify-count='0')
  header-component(v-else, :notify-count='getGlobalNotifyCount')

    .chat-header(slot='center-content')
      .chat-header_arrow(@click='leftBtnAction')
        i.chat-header_arrow_ic.ic-arrow-left

      .chat-header_notify-count(v-if='getGlobalNotifyCount')
        span {{ getGlobalNotifyCount }}

      .chat-header_cnt(v-show='getShopName')
        .chat-header_cnt_t(@click="$router.push({name: 'user', params: {id: getShopName}})") {{ getShopName }}
        .chat-header_cnt_info
          span.chat-header_cnt_info-text
          | {{ getLeadId }},
          span  {{ getStatus }}

      .chat-header_photo
        img(
        :src='userImage'
        v-on:error='onUserImageError',
        @click="$router.push({name: 'user', params: {id: getShopName}})")

</template>

<script type='text/babel'>
  import { mapGetters } from 'vuex';
  import { urlThumbnail } from 'root/utils'

  import HeaderComponent from 'components/header'

  export default {
    data(){
      return {
        userImage: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      }
    },
    methods: {
       onUserImageError(){
        console.warn(`Load user photo has failed. Chat id: ${this.getId}`);
         //this.userImage = require('base/img/logo.png');
      },
      leftBtnAction(){
        if (this.isFake){
          if (this.$route.name === window.before.name && window.before.prev){
            this.$router.push({ name: window.before.prev.name, params: window.before.prev.params})
            return;
          }
          this.$router.push({ name: window.before.name, params: window.before.params})
        }else{
          this.$router.push({name: "chat_list"})
        }
      }
    },

    props:{
      disableNotifier: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      ...mapGetters([
        'getId',
        'getLeadId',
        'getStatusName',
        'getShopName',
        'getPhoto',
        'isFake',
        'getGlobalNotifyCount'
      ]),
      getStatus(){
        if ( this.getStatusName !== null ) {
          return this.getStatusName.toLowerCase();
        }
      }
    },
    components: {
      HeaderComponent,
    },
    watch:{
      getPhoto(val){
        this.userImage = val;
      }
    }
  }
</script>
