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
import { mapGetters } from 'vuex';

export default {
  components: {
    ChatHeader,
    ChatBar,
    scrollTop,
  },
  data(){
    console.log("PARAMS")
    console.log(this.$route.params.result)

    console.log("LEADS");
    console.log(this.getAllLeads);

    console.log()
    getTransactionsLog().then((data)=>{
      console.log("COINS LOG");
      console.log(data.transactions);
    })
    return {}
  },
  computed:{
      ...mapGetters([
        'getAllLeads',
      ])
  },
  methods:{
    addPadding(val){
      this.$refs.section.style.paddingBottom = val + 'px';
      window.scrollTo(0, document.body.scrollHeight);
    }
  }
}
</script>
