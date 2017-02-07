<style src='../chat/styles/chat.pcss'></style>
<template lang="pug">
#chat
  chat-header(:disable-notifier='true')
  .section.top.bottom(ref="section")
    .chat.section__content
      .chat_messages(id="chatmessages", ref="messages")
        div(v-for='(msg, index) in getFakeMessages', :key='index')
          div
            chat-msg(
              :type="getMessageType(msg.parts[0].mime_type)",
              :msg='msg')
  chat-bar(v-on:addPadding="addPadding")
  scroll-top(:to-up="false")
</template>

<script>

import scrollTop from 'components/scroll-top';
import ChatBar from '../chat/chat-bar.vue';
import ChatHeader from '../chat/chat-header.vue';
import ChatMsg from './chat-msg.vue';
import {getTransactionsLog} from 'services/monetization';
import { mapActions,mapGetters } from 'vuex';
import settings from 'root/settings.js';
import * as messages from 'services/message';

export default {
  components: {
    ChatHeader,
    ChatBar,
    ChatMsg,
    scrollTop,
  },
  data(){
    console.log(this.$route.params.result)

    return {
      fullScroll: 0,
      noGoBottom: false,
      coinsLog: []
    }
  },
  beforeDestroy() {
    messages.offMsg( this.onMessage );
  },
  mounted(){
    this.onMessage = this.onMessage.bind( this );
    messages.onMsg( this.onMessage );
    this.runFakeChat();
  },
  computed:{

    ...mapGetters([
      'getAllLeads',
      'getMessages',
      'userID'
    ]),

    getFakeMessages(){
      let messages = [];
      messages.push(...this.getMessages);

      //Merge сообщений монетизации в чат

      if(this.coinsLog) {

        this.coinsLog.forEach((elem)=>{
          let time = elem.created_at;
          let coinsPartsObject = {content: "monetization text",mime_type:"text/coins"}
          let coinsMessageObject = {created_at: time,parts: [coinsPartsObject],user:{user_id: this.userID}};
          messages.push(coinsMessageObject)
          messages.sort((x,y)=>{
            if (x.user && y.user){
              if (x.user.user_id != this.userID && y.user.user_id != this.userID){
                return 0;
              }else{
                return x.created_at > y.created_at;
              }
            }
            return 0;
          });
        });
      }
      console.log("!MESSAGES!")
      console.log(messages);
      return messages;
    }
  },
  methods:{
    runFakeChat(){
      this.loadLeads().then((leads)=>{
        let productId = settings.monetizationProductID
        let found_lead = this.getAllLeads.customer.find(elem=>elem.products[0].id === productId);
        let lead_id = 0;
        //Если есть купленный сервисный товар (по монетизации)
        if (found_lead){
          lead_id = found_lead.id;

        }else{
          //Если его нет - покупаем новый
          this.createLead(productId).then(lead=> {
            if ( lead !== undefined && lead !== null ) {
            //Здесь нужно присвоинть новый полученный лид переменной lead_id
              lead_id = lead.id;
            }
          })
        }

        return lead_id

      }).then((lead_id)=>{
        this.run(lead_id);
        if (lead_id){
          getTransactionsLog().then((data)=>{
            this.coinsLog = data.transactions;
          })
        }else{
          console.log("NO LEAD WITH SERVICE PRODUCT")
        }
      });
    },
    getMessageType(mime_type){
      switch (mime_type){
        case "text/plain": return "text";break;
        case "text/coins": return "coins";break;
        default: return "notext";break;
      }
    },
    ...mapActions([
      'setConversation',
      'loadLeads',
      'createLead'
    ]),
    run(lead_id){
      return this.setConversation( lead_id ).then(
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
        )
    },
    addPadding(val){
      this.$refs.section.style.paddingBottom = val + 'px';
      window.scrollTo(0, document.body.scrollHeight);
    },
    onMessage(){

      Promise.resolve().then(()=>{

        this.$nextTick( this.goToBottom );

      })
    },

    goToBottom(){

      if(this.noGoBottom) return;

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
  }
}
</script>
