<style src='../chat/styles/chat.pcss'></style>
<template lang="pug">
#chat
  chat-header(:disable-notifier='true')
  .section.top.bottom(ref="section")
    .chat.section__content
      .chat_messages(id="chatmessages", ref="messages")
        div(v-for='(msg, index) in getMessages', :key='index')
          div
            chat-msg(
              :type="getMessageType(msg.parts[0].mime_type)",
              :msg='msg')
  chat-bar(v-on:addPadding="addPadding")
  scroll-top(:to-up="false")
</template>

<script type='text/babel'>

import scrollTop from 'components/scroll-top';
import ChatBar from '../chat/chat-bar.vue';
import ChatHeader from '../chat/chat-header.vue';
import ChatMsg from './chat-msg.vue';
import {getTransactionsLog} from 'services/monetization';
import { mapActions,mapGetters } from 'vuex';
import {settings} from 'root/settings.js';
import * as messages from 'services/message';4

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
      test: 123123
    }
  },
  beforeDestroy() {
    messages.offMsg( this.onMessage );
  },
  mounted(){
    console.log("TEST!")
    console.log(this.test)
    this.onMessage = this.onMessage.bind( this );
    messages.onMsg( this.onMessage );
    this.runFakeChat();
  },
  computed:{
      ...mapGetters([
        'getAllLeads',
        'getMessages',
      ])
  },
  methods:{
    runFakeChat(){
      this.loadLeads().then((leads)=>{
        let found_lead = this.getAllLeads.customer.find(elem=>elem.products[0].id === settings.monetizationProductID);
        let lead_id = 0;
        //Если есть купленный сервисный товар (по монетизации)
        if (found_lead){
          lead_id = found_lead.id;
          this.run(lead_id);
        }else{
          //Если его нет - покупаем новый

          //Здесь нужно присвоинть новый полученный лид переменной lead_id
        }
        return lead_id
      }).then((lead_id)=>{
        if (lead_id){
          getTransactionsLog().then((data)=>{
            console.log("COINS LOG");
            console.log(data.transactions);
          })
        }else{
          console.log("NO LEAD WITH SERVICE PRODUCT")
        }
      });
    },
    getMessageType(mime_type){
      switch (mime_type){
        case "text/plain": return "text";break;
        default: return "notext";break;
      }
    },
    ...mapActions([
      'setConversation',
      'loadLeads'
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
