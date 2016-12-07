<style src='../chat/styles/chat.pcss'></style>
<template lang="pug">
#chat
  chat-header(:notify-count='conversationNotifyCount')
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

export default {
  components: {
    ChatHeader,
    ChatBar,
    scrollTop,
  },
  data(){
    getTransactionsLog().then((data)=>{
      console.log("COINS LOG");
      console.log(data.transactions);
    })
    return {}
  },
  methods:{
    addPadding(val){
      this.$refs.section.style.paddingBottom = val + 'px';
      window.scrollTo(0, document.body.scrollHeight);
    }
  }
}
</script>
