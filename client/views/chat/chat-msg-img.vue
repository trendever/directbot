<style src='./styles/chat-msg-img.pcss'></style>
<template lang="pug">

.chat-row(:class='getSide')
  span(class='bubble_info bubble_info_time') {{ datetime }}
  .bubble_info.bubble_info_status(v-if='isOwnMessage')
    i(:class='{"ic-check": isLoaded && !isRead, "ic-check-double": isRead, "ic-clock": !isLoaded}')
  .chat-msg.bubble.bubble-img(
    :class='{"chat-msg-closest":isClosest, "chat-msg-not-closest":!isClosest && !isAfterServiceMessage}')
    router-link.chat-msg_t(
        :to='{name: "user", params: {id: getUserNameLink}}',
        v-if='!isOwnMessage && !isClosest',
        :class='{"chat-msg_t-customer-color":isCustomer}',
        v-html="getUsername"
    )

    img(
        @click="open",
        :src='getImg',
        class='chat-msg-img',
        v-bind:class='{"chat-msg-img-opacity":!isLoaded }',
        v-bind:style="imgStyle"
      )

</template>

<script type='text/babel'>

  import { mapGetters, mapActions } from 'vuex';

  import * as service from 'services/chat';
  import * as leads from 'services/leads';

  import { formatTime } from './utils';
  import { ratioFit } from 'root/utils';


  export default{
    props: {
      msg: {
        type: Object,
        required: true
      }
    },
    data(){
      return {
        showLargeImg: false,
        imgStyle:{
          width: `600px`,
          height: `600px`
        }
      }
    },

    methods:{
      ...mapActions([
        'openPopUp'
      ]),

      open(){

        let msgParts = this.msg.parts[ 0 ];

        if ( msgParts.mime_type === 'image/json') {

          let { width, height } = JSON.parse( msgParts.content );

          this.openPopUp( this.getImg, width, height );

          this.$router.push({name: 'chat_zoom', query: { chatid: this.$route.params.id}})
        }

        if (msgParts.mime_type  === 'image/base64')  {

          let {width, height} = msgParts.content;

          this.openPopUp( this.getImg, width, height );

          this.$router.push({name: 'chat_zoom', query: { chatid: this.$route.params.id}})


        }
      }

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
      isLoaded(){

        if( 'loaded' in this.msg){

          return this.msg.loaded;

        }

        return true;

      },
      isAfterServiceMessage(){

        return !!this.msg.afterServiceMessage;

      },

      getImg(){

        const cnt = this.msg.parts[ 0 ].content;

        if ( this.msg.parts[ 0 ].mime_type === 'image/json' ) {

          let img = JSON.parse( cnt );

          //const {width, height} = ratioFit(img.width, img.height, 570, img.height);

/*          this.$set('imgStyle.width', `${width}px`);
          this.$set('imgStyle.height', `${height}px`);*/

          if (img.thumbs.big) {

            return img.thumbs.big;

          }

          return img.link;

        }

        if ( typeof cnt === 'string' ) {

          return `data:${this.msg.parts[ 0 ].mime_type};base64,${cnt}`;

        }

        if ( cnt.thumbs && cnt.thumbs.big ) {

          return cnt.thumbs.big

        }

        if ( 'link' in cnt ) {

/*          this.$set('imgStyle.width', `${cnt.width}px`);
          this.$set('imgStyle.height', `${cnt.height}px`);*/

          return cnt.link;

        }

      },
      datetime() {
        return formatTime(this.msg.created_at);
      },
      getUserNameLink() {
        if (this.isCustomer) {
          return this.msg.user.name;
        }
        return this.getShopName;
      },
      getUsername() {
        if (this.isCustomer) {
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
      isClosest(){
        return this.msg.closestMessage;
      },
      isCustomer(){
        return this.msg.user.role === leads.USER_ROLES.CUSTOMER.key;
      },
      isOwnMessage() {
        if ( this.getCurrentMember !== null ) {
          return this.getCurrentMember.user_id === this.msg.user.user_id;
        }
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
