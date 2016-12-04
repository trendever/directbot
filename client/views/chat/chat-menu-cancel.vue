<style src='./styles/chat-bar.pcss'></style>
<template lang="pug">
menu-component
  div.menu-items(slot='items')
    .menu_i(v-for="reason in cancelReasons" @click='setStatus("CANCEL", "lead.state.changed", reason.id)')
      .menu_i_t {{ reason.name }}
    .menu_i(@click.stop='setShowCancelMenu(false), setShowStatusMenu(true)')
      .menu_i_t.__txt-green Назад
</template>

<script>
import { mapActions } from 'vuex';
import MenuComponent from 'components/menu/menu.vue';
import * as leadService from 'services/leads';

export default{
  data(){
    return {
      cancelReasons: []
    }
  },
  components: {
    MenuComponent
  },
  methods: {
    ...mapActions([
      //chat
      'setStatus',
      'setShowStatusMenu',
      'setShowCancelMenu',
    ])
  },
  mounted(){
    leadService.getCancelReasons().then(data=>{

      let reasons = data.reasons.filter(item=>{
        return item.id !== 1 && item.id !== 2;
      });

      this.cancelReasons = reasons;

    })
  }
}
</script>
