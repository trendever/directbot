<style src='./styles/chat.pcss'></style>
<template lang="pug">
#chat(:class="{'directbot-bg': !isTrendever,'trendever-bg': isTrendever}")
  //-.loader-center(v-if="showLoader"): app-loader

  chat-header(:prev-page="prevPage")
  .section.top.bottom(ref="section")
    .chat.section__content
      transition(:name="isMobile ? 'fade-menu' : ''")
        .chat-shadow.directbot-color(v-if="isMobile && getShowMenu || isMobile && getShowStatusMenu")
      .chat_messages(id="chatmessages", ref="messages")
        div(v-for='(msg, index) in messagesList', :key='index')
          div
            chat-msg-status(
              v-if='msg.parts[0].mime_type === "json/status"',
              :msg='msg',
              v-on:goToBottom="goToBottom")
            chat-msg-product-old(
              v-if='msg.parts[0].mime_type === "text/json"',
              :msg='msg',
              v-on:goToBottom="goToBottom")
            chat-msg-product(
              v-if='msg.parts[0].mime_type === "text/plain" && hasData(msg)',
              :msg='msg',
              v-on:goToBottom="goToBottom")
            chat-msg(
              v-if='msg.parts[0].mime_type === "text/plain" && !hasData(msg) || msg.parts[0].mime_type === "auto/answer"',
              :msg='msg',
              v-on:goToBottom="goToBottom")
            chat-msg-info(
              v-if='msg.parts[0].mime_type === "text/html"',
              :msg='msg',
              v-on:goToBottom="goToBottom")
            chat-msg-img(
              v-if='isImage(msg.parts[0].mime_type)',
              :msg='msg',
              v-on:goToBottom="goToBottom")
            chat-msg-payment(
              v-if='msg.parts[0].mime_type === "json/payment" || msg.parts[0].mime_type === "json/cancel_order"',
              :msg='msg',
              v-on:goToBottom="goToBottom")
          chat-msg-order(
              v-if='msg.parts[0].mime_type === "json/order"',
              :msg='msg',
              v-on:goToBottom="goToBottom")

  chat-bar(v-on:addPadding="addPadding")
  scroll-top(:to-up="false")
</template>

<script>
import settings from 'root/settings';

import listen from 'event-listener';
import { mapGetters, mapActions } from 'vuex';

//services
import * as messages from 'services/message';
import * as leads from 'services/leads';
import store from 'root/store'


//components
//import appLoader from 'base/loader/loader';
import scrollTop from 'components/scroll-top';
import ChatMsgOrder from './chat-msg-order.vue';
import ChatMsgPayment from './chat-msg-payment.vue';
import ChatMsgProduct from './chat-msg-product.vue';
import ChatMsgProductOld from './chat-msg-product-old.vue';
import ChatMsgStatus from './chat-msg-status.vue';
import ChatMsg from './chat-msg.vue';
import ChatMsgImg from './chat-msg-img.vue';
import ChatMsgInfo from './chat-msg-info.vue';
import ChatBar from './chat-bar.vue';
import ChatHeader from './chat-header.vue';
//import popupImg from 'base/popup-img/index.vue';

export default {

  beforeRouteEnter(to, from, next){

    if(to.name== 'out-chat'){
      authService
        .fakeRegister()
        .then(({token,user})=>{
          store.dispatch('authUser', { user, token })
            // .then( () => {
            //   openChat(this)
            // })
      });
    }

    next(vm=>vm.prevPage = from);

  },
  props: {
    directbot: {
      default: false,
      type: Boolean
    }
  },

  components: {
    //popupImg,
    ChatHeader,
    ChatBar,
    ChatMsg,
    ChatMsgOrder,
    ChatMsgPayment,
    ChatMsgProduct,
    ChatMsgProductOld,
    ChatMsgStatus,
    ChatMsgImg,
    ChatMsgInfo,
    scrollTop,
    //appLoader,
  },

  data(){
    return {
      needLoadMessage: true,
      lead_id: null,
      showLoader: true,
      timerId: '',
      fullScroll: 0,
      prevPage: '',
      aboutAnswers: []
    }
  },

  watch: {
    isDoneLead( done ){
      if ( done ) {
        return this.run();
      }
    }
  },


  created(){
    //open chat
    this.lead_id =  +this.$route.params.id;
    if ( this.isDoneLead ) {


      if ( this.isAuth ) {
        return this.run().then(()=>{
          this.clearNotify(this.lead_id);
          this.$nextTick( () => {
                  this.goToBottom();
                } );


        })
      } else {
        return Promise.resolve()
      }
    }

  },

  mounted(){

    if ( this.isAuth ) {

      this.onMessage      = this.onMessage.bind( this );

      messages.onMsg( this.onMessage );

    } else {

      this.$router.push( { name: 'auth' } );

    }

  },

  beforeDestroy() {

    if(this.timerId) {
      clearInterval(this.timerId);
    }

    if ( this.isAuth ) {
      this.scrollListener.remove();
      this.closeConversation();
      messages.offMsg( this.onMessage );
    }

  },
  computed: {

    messagesList() {

      const end   = this.getMessages.length;
      const start = end - this.getLengthList - 1; // -1 потому что есть первое сообщение с датой.

      let messages = this.getMessages.slice( (start <= 0) ? 0 : start, end );


      if(this.isServiceShop) {
        messages.splice(1,1);
      }

      const filtredMap = new Map();
      let filtredMessages = []
      let id = '';

      for(var i = 0; i < messages.length; i++) {
        if(id != messages[i].id) {
          filtredMap.set( messages[i].id, messages[i])
          id = messages[i].id;
        }
      };

      for(let message of filtredMap.values()) {
        filtredMessages.push(message);
      }
      console.log(filtredMap)
      return filtredMessages;

    },

    ...mapGetters([
      'fakeAction',
      'isFake',
      'imgPopUpUrl',
      'imgWidth',
      'imgHeight',
      'isAuth',
      'getUseDays',
      'isServiceShop',
      'isDoneLead',
      'getMessages',
      'conversationNotifyCount',
      'getId',
      'getCurrentMember',
      'getChatLengthList',
      'getShowMenu',
      'getShowStatusMenu'
    ])

  },
  methods: {
    ...mapActions([

      'setConversationAction',
      'setConversation',
      'loadMessage',
      'clearNotify',
      'closeConversation',
      'openPopUp'

    ]),

    addPadding(val){

      if(this.isMobile) {
        if (val <= 100) return;
      }

      this.$refs.section.style.paddingBottom = val + 'px';
      window.scrollTo(0, document.body.scrollHeight);

    },
    closePopUp(){

      this.openPopUp();

    },

    run(){

      return this

        .setConversation( this.lead_id )

        .then(()=>{
          if(this.fakeAction === 'chat-info' && this.isFake) return true;
          return messages
            .find(this.getId, null, 70, false)
            .then((data)=>{
              return data.find(message=>{
                return message.user.user_id === this.getCurrentMember.user_id
              })
            });

        }).then(flagMessage=>{
          if(!flagMessage && this.getCurrentMember.role === 1){
            if(!this.isFake) this.setConversationAction('approve');
          }

        }).then(
          () => {
                  this.$nextTick( () => {

                    setTimeout(()=>{

                      this.goToBottom();

                    },30)

                  } );
          },
          ( error ) => {
            console.error( `[ CONVERSATION_SET ERROR ]: `, error );
            //this.$router.push( { name: 'home' } );
          }
        ).then(()=>{
          //redirect if no chat room
          if(this.$store.state.conversation.id === null){
            this.$router.push( { name: '404'});
          }

        }).then(()=>{
          //лоадер
          this.showLoader = false;
          this.scrollListener = listen( window, 'scroll', this.scrollHandler.bind( this ) );
        })
    },

    runLoadingMessage(){

      return new Promise((resolve, reject) => {

        const add = ( scrollHeight ) => {

           if ( document.body.offsetHeight >= scrollHeight ) {

              this
                .loadMessage()
                .then( ( messages ) => {

                  if ( messages === null ) {

                    resolve();

                  } else {

                    this.$nextTick( () => {

                      add( document.body.scrollHeight )

                    } );

                  }

                });

           } else {

            resolve();

           }

        };

        this.$nextTick( () => {

          add( document.body.scrollHeight )

        } );

      });

    },

    onMessage(data){

      let map = data.response_map;

      if(map && map.messages[0] && map.messages[0].parts[0]){

        let content = +map.messages[0].parts[0].content;

        if(this.isFake && this.aboutAnswers.length){

          if(typeof content === 'number'){

            if(content > 0 && content <= this.aboutAnswers.length){

              window.eventHub.$emit('get-answer', this.aboutAnswers[ content - 1 ])

            }

          }

        }

      }


      Promise.resolve().then(()=>{

        this.$nextTick( this.goToBottom );

      })
    },

    isImage( mime ){
      return mime.indexOf( 'image' ) !== -1;
    },

    hasData(msg){
      if (msg.parts[1] && msg.parts[1].mime_type === 'text/data'){

        try {
          //фишка с автоответами для чата спросить
          //лучше добавить if c проверкой на этот чат
          let content = JSON.parse(msg.parts[1].content)
          if(content.type === "auto"){
            this.aboutAnswers = content.data;
            return false;
          }
        } catch (e) {
          console.warn('content is not a JSON')
        }
        return true;
      }
      return false;
    },

    scrollHandler(){

      const SHAfter = document.body.scrollHeight;

      if ( this.needLoadMessage ) {
        if ( document.body.scrollTop < 1500 ) {
          this.needLoadMessage =  false;

          this.loadMessage().then( ( messages ) => {
            this.$nextTick( () => {

              if ( messages !== null ) {

                const SHDelta                 = document.body.scrollHeight - SHAfter;
                const percentTopOfHeight      = (document.body.scrollTop + SHDelta) / document.body.scrollHeight;
                document.body.scrollTop = percentTopOfHeight * document.body.scrollHeight;
                this.needLoadMessage = true;

              }

            } );
          } )

        }
      }

    },
    goToBottom(){

      let height = document.body.scrollHeight;

      if(this.fullScroll !==  height) {

        document.body.scrollTop = height;

        this.fullScroll = height;

        this.$nextTick(()=>{

          setTimeout(()=>{

            this.goToBottom();

          }, 100 );

        })
      }
    }
  },
}

</script>
