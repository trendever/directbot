<style src='./styles/chat-msg.pcss'></style>
<template lang="pug">

.chat-row(:class='getSide')
  span(class='bubble_info bubble_info_time') {{ datetime }}
  .bubble_info.bubble_info_status(v-if='isOwnMessage')
    i(:class='{"ic-check": isLoaded && !isRead, "ic-check-double": isRead, "ic-clock": !isLoaded}')
  .chat-msg.bubble(:class='{"chat-msg-closest":isClosest, "chat-msg-not-closest":!isClosest && !isAfterServiceMessage }')
    a.chat-msg_t(
        v-if='!isOwnMessage && !isClosest',
        :class='{"chat-msg_t-customer-color":isCustomer}',
        v-on:click='action',
        v-html="getUsername"
      )

    .chat-msg-wrap
      p.chat-msg_txt(v-html="getMessage")




</template>

<script >
  import { navigateTolink } from 'root/utils';
  import * as service from 'services/chat';
  import * as leads from 'services/leads';
  import { formatTime, formatDatetime, escapeHtml, wrapLink } from './utils';
  import { mapGetters } from 'vuex';

  export default{
    props: {
      msg: {
        type: Object,
        required: true
      }
    },
    methods:{
      action(){
        if(this.getUsername === '<b>operator</b>'){
          window.eventHub.$emit('popup-operator-info', 'ok');
          return;
        }
        if(this.isServiceShop) return;
        this.$router.push({name: "user", params: {id: this.getUserNameLink}})
      },
      goInstagramProfile(){
        navigateTolink(`http://instagram.com/${this.getUserNameLink}`, true);
      }
    },
    mounted(){

      this.$nextTick(()=>{

        this.$emit('goToBottom');

      })

    },
    computed: {
      ...mapGetters([
        //chat
        'getShopName',
        'getCurrentMember',
        'getLastMessageId',
        'isServiceShop',
        //user
        'user'

      ]),
      isLoaded(){
        if( 'loaded' in this.msg){
          return this.msg.loaded;
        }
        return true;
      },
      isAfterServiceMessage(){
        return !!this.msg.afterServiceMessage;
      },
      getMessage() {
       return wrapLink(escapeHtml(this.msg.parts[0].content).replace(/\n/g, '<br />')).replace(/₽/g, '&nbsp;<i class="ic-currency-rub"></i> ');
      },
      datetime() {
        return formatTime(this.msg.created_at);
      },
      getUserNameLink() {
        //серисные сообшения
        if(this.msg.user.name === 'trendever'){
          return 'trendevercom';
        }
        if (this.isCustomer) {
          return this.msg.user.name;
        }
        return this.getShopName;
      },
      getUsername() {
        if(this.isAutoMessage) {
          return '<b>operator</b>';
        }
        //сервисные сообщения
        // if(this.msg.user.name === 'directbotio'){
        //   return '<b class="_blue">directbotio</b>';
        // }
        if(this.msg.user.name === 'trendever' || this.msg.user.name === 'trendevercom'){
          return '<b>operator</b>';
        }
        if (this.isCustomer) {
          if (this.msg.user.name.indexOf("customer_") >= 0){
            return `<b>${this.msg.user.name.replace("customer_","client")}</b>`
          }
          return `<b>${this.msg.user.name}</b>`
        }
        if (this.msg.user.role === leads.USER_ROLES.SUPPLIER.key) {
          return `<b>${this.getShopName}</b>`
        }
        if ( this.getCurrentMember !== null ) {
          if(this.getCurrentMember.role === leads.USER_ROLES.CUSTOMER.key){
            return `<b>${this.getShopName}</b>`
          }
        }
        return `<b>${this.getShopName}</b> (${this.msg.user.name})`
      },
      isCustomer(){
        return this.msg.user.role === leads.USER_ROLES.CUSTOMER.key;
      },
      isAutoMessage(){
        return this.msg.parts[0].mime_type === 'auto/answer';
      },
      isClosest(){
        if(this.isAutoMessage) {
          return false;
        }
        return this.msg.closestMessage;
        //return false;
      },
      isOwnMessage() {
        if(this.isAutoMessage) {
          return false;
        }

        if ( this.getCurrentMember !== null ) {
          return this.getCurrentMember.user_id === this.msg.user.user_id;
        }
        return false;
      },
      isSending() {
        return false;
      },
      isSent() {
        return !this.isRead
      },
      isRead() {
        return this.getLastMessageId >= this.msg.id
      },
      getSide() {
        if(this.isAutoMessage){
          return '__left'
        }
        return this.isOwnMessage ? '__right' : '__left';
      },
    },

  }
</script>
