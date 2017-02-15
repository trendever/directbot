<style src='../chat/styles/chat.pcss'></style>
<template lang="pug">
#chat
  chat-header(:disable-notifier='true', :fake-chat="true")
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
import * as messages from 'services/message';
import config from 'root/../config.js';

export default {
  components: {
    ChatHeader,
    ChatBar,
    ChatMsg,
    scrollTop,
  },
  data(){
    console.log("CONF")
    console.log(config)

    return {
      fullScroll: 0,
      noGoBottom: false,
      coinsLog: [],
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

    fakeMe1ssages(){

    },

    getFakeMessages(){
      let messages = [];
      messages.push(...this.getMessages);

      //Merge сообщений монетизации в чат

      if(this.coinsLog) {

        this.coinsLog.forEach((elem)=>{
          let time = elem.created_at;
          console.log("COINS:")
          console.log(elem)
          let coinsPartsObject = {content: elem.data.amount + " refilled",mime_type:"text/coins"}
          let coinsMessageObject = {created_at: time,parts: [coinsPartsObject],user:{user_id: config.service_user_id}};
          messages.push(coinsMessageObject)

        });
        return this.sortMessages(messages)
      }else{
        return messages;
      }

    }
  },
  methods:{
    sortMessages(messages){
      return messages.sort((a,b)=> a.created_at - b.created_at)
    },
    runFakeChat(){
      this.loadLeads().then((leads)=>{
        let productId = config.monetization_help_id
        let found_lead = this.getAllLeads.customer.find(elem=>elem.products[0].id === productId);

        //Если есть купленный сервисный товар (по монетизации)
        if (found_lead){
          return found_lead.id;
        }else{
          //Если его нет - покупаем новый
          return this.createLead(productId).then(lead=> {
            if ( lead !== undefined && lead !== null ) {
              return lead.id;
            }else{
              return 0;
            }
          })
        }

      }).then((lead_id)=>{
        if (lead_id){
          this.run(lead_id);
          getTransactionsLog().then((data)=>{
            this.coinsLog = data.transactions;
          })
        }else{
          console.log("NO LEAD WITH SERVICE PRODUCT")
          console.log(lead_id)
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
