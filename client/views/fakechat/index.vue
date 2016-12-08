<style src='../chat/styles/chat.pcss'></style>
<template lang="pug">
#chat
  chat-header(:disable-notifier='true')
  .section.top.bottom(ref="section")
    .chat.section__content

  chat-bar(v-on:addPadding="addPadding")
  scroll-top(:to-up="false")
</template>

<script type='text/babel'>

import scrollTop from 'components/scroll-top';
import ChatBar from '../chat/chat-bar.vue';
import ChatHeader from '../chat/chat-header.vue';
import {getTransactionsLog} from 'services/monetization';
import { mapActions,mapGetters } from 'vuex';
import {settings} from 'root/settings.js';

export default {
  components: {
    ChatHeader,
    ChatBar,
    scrollTop,
  },
  data(){
    console.log("PARAMS")
    console.log(this.$route.params.result)

    console.log()
    getTransactionsLog().then((data)=>{
      console.log("COINS LOG");
      console.log(data.transactions);
    })
    return {
      fullScroll: 0,
      noGoBottom: false
    }
  },
  mounted(){
    console.log("LEADS")
    console.log(this.getAllLeads)
    let found_lead = this.getAllLeads.customer.find(elem=>elem.products[0].id === settings.monetizationProductID);
    if (found_lead){
      let lead_id = found_lead.id;
      let chat_id = found_lead.chat.id;
      this.run(lead_id);
      console.log("FOUND")
      console.log(found_lead)
    }else{
      console.log("NOT FOUND")
    }
    //this.getAllLeads.customer.find(elem=>elem.)
  },
  computed:{
      ...mapGetters([
        'getAllLeads',
      ])
  },
  methods:{
    ...mapActions([
      'setConversation'
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
