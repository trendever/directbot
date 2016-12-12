<style src='./styles/chat-msg.pcss'></style>
<template lang="pug">
.chat-row(:class='getSide')

  span(class='bubble_info bubble_info_time') {{ datetime }}

  .bubble_info.bubble_info_status(v-if='isOwnMessage')
    i(:class='{"ic-check": isLoaded && !isRead, "ic-check-double": isRead, "ic-clock": !isLoaded}')

  .chat-msg.bubble(:class='{"chat-msg-closest":isClosest, "chat-msg-not-closest":!isClosest && !isAfterServiceMessage }')

    template(v-if="TEXT_PLAIN")

      .chat-msg_t(
          v-if='!isOwnMessage && !isClosest',
          :class='{"chat-msg_t-customer-color":isCustomer}',
          v-on:click="goInstagramProfile"
          v-html="getUsername"
        )

      .chat-msg-wrap
        p.chat-msg_txt(v-html="getMessage")


    product-message(v-if="TEXT_JSON || TEXT_PLAIN && hasData")

    img-message

    info-message(v-if="TEXT_HTML")



  order-message(v-if="JSON_ORDER")

  status-message(v-if="JSON_STATUS")

  payment-message(v-if="JSON_PAYMENT || JSON_CANCEL_ORDER")





</template>

<script type='text/babel'>
  import types from './mime-types';
  import { navigateTolink } from 'root/utils';
  import * as service from 'services/chat';
  import * as leads from 'services/leads';
  import { formatTime, formatDatetime, escapeHtml, wrapLink } from '../chat/utils';
  import { mapGetters } from 'vuex';

  import imgMessage from './messages/img';
  import infoMessage from './messages/info';
  import orderMessage from './messages/order';
  import paymentMessage from './messages/payment';
  import productMessage from './messages/product';
  import statusMessage from './messages/status';

  export default{
    components: {
      infoMessage,
      orderMessage,
      paymentMessage,
      productMessage,
      statusMessage,
      imgMessage
    },
    data(){

      return Object.assign(

      {


      },

      types)

    },
    props: {
      type: {
        type: String,
        required: true
      },
      msg: {
        type: Object,
        required: true
      }
    },
    methods:{
      goInstagramProfile(){
        navigateTolink(`http://instagram.com/${this.getUserNameLink}`, true);
      },
      setMessageType(){
        for (let key in types) {
          if( types[key] === this.type ) this[key] = true;
        }
        let save;
        for (let key in types) {
          if( typeof this[key] === 'boolean' ) save = key;
        }
        for (let key in types) {
          this[key] = false;
        }
        if(save) this[save] = true;
        else console.warn['not used mime_type']
      },
    },
    created(){

      this.setMessageType()

    },
    computed: {
      ...mapGetters([
        //chat
        'getShopName',
        'getCurrentMember',
        'getLastMessageId',
        //user
        'user'

      ]),

      hasData(){
        if (this.msg.parts[1] && this.msg.parts[1].mime_type === 'text/data'){
          return true;
        }
        return false;
      },
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
        //сервисные сообщения
        if(this.msg.user.name === 'trendever'){
          return '<b>trendever</b>';
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
      isClosest(){
        return this.msg.closestMessage;
      },
      isOwnMessage() {
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
        return this.isOwnMessage ? '__right' : '__left';
      },
    },

  }
</script>
