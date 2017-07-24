<style src='../chat/styles/chat.pcss'></style>
<template lang="pug">
#chat
  chat-header(:disable-notifier='true', :fake-chat="true")
  .section.top.bottom(ref="section")
    .chat.section__content
      .chat_messages(id="chatmessages", ref="messages")
        div(v-for='(msg, index) in getChatMessages', :key='index')
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
import * as monetization from 'services/monetization';
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
    return {
      fullScroll: 0,
      noGoBottom: false,
      action: "",
      fakeMessage: false
    }
  },
  beforeDestroy() {
    messages.offMsg( this.onMessage );
  },
  mounted(){

    switch (this.$route.params.result){
      case "true": this.action = "subscibe"; break;
      case "false": this.action = "error"; break;
      default: break;
    }

    this.onMessage = this.onMessage.bind( this );
    messages.onMsg( this.onMessage );
    this.runFakeChat();
  },
  computed:{

    ...mapGetters([
      'getAllLeads',
      'getMessages',
      'userID',
      'authUserShopId',
      'getShowStatusMenu',
      'getShowMenu'
    ]),

    getChatMessages(){
      let messages = [];
      this.getMessages.forEach((elem)=>{
        //skip auto messages (they got 2 parts)
        if (elem.parts.length < 2) {
          messages.push(elem)
        } 
      })

      if (this.fakeMessage){
        messages.push(this.fakeMessage)
      }

      return messages
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
        this.run(lead_id);
      });
    },
    getMessageType(mime_type){
      switch (mime_type){
        case "text/plain": return "text";break;
        case "text/coins": return "coins";break;
        default: return mime_type;
      }
    },
    ...mapActions([
      'setConversation',
      'loadLeads',
      'createLead'
    ]),
    sendSuccesMonetizationMessage(){

    },
    processMonetization(lead_id){
      let pendingMonetization = monetization.getPendingMonetization()
      if (pendingMonetization){
        //Если у текущего юзера нету магазина, то нам нечего ловить - шлём сообщение в поддержку по этому поводу
        if (!this.authUserShopId){
          window.eventHub.$emit("monetization-message",{data: "Ошибка с подключенным магазином - мы уже работаем над решением этой проблемы!"})
          monetization.unsetPendingMonetization();
          return
        }

        let plan_id = pendingMonetization.plan_id
        let offer_id = pendingMonetization.offer.id
        let summ_to_process = pendingMonetization.offer.price
        let plan_name = pendingMonetization.plan_name

        monetization.balance().then((balance) => {
          if (balance > summ_to_process){
            //подписываемся на всё, а тазем говорим что всё окей и очищаем монетизацию
            monetization.subscribe(plan_id,offer_id,this.authUserShopId).then(()=> {
              window.eventHub.$emit("monetization-message",{data: "Выбранный тариф активирован (" + plan_name + ")"})
              monetization.unsetPendingMonetization();
              return
            });
          }else{
            var statusParts = {
                content: "Операция обрабатывается, пожалуйста подождите",
                mime_type: "directbot/monetization"
            }
            var statusMessageObject = {
              parts: [statusParts],
              user:{user_id: config.service_user_id}
            };

            this.fakeMessage = statusMessageObject

            let i = setInterval(()=>{
              this.fakeMessage.parts.content += "."

              monetization.balance().then((balance) => {
                if (balance > summ_to_process){
                  clearInterval(i)
                  this.fakeMessage = false;
                  window.eventHub.$emit("monetization-message",{data: "Выбранный тариф активирован (" + plan_name + ")"})
                  monetization.unsetPendingMonetization();
                }
              });
            },500)
          }
        });
      }
    },
    run(lead_id){
      this.processMonetization(lead_id);
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
