<style src='./styles/chat-bar.pcss'></style>
<template lang="pug">
menu-component
  div.status-items(slot='items')
    .menu_i.__bg-green(@click='setStatus("COMPLETE", "lead.state.changed")')
      .menu_i_t.__txt-white Выполнен
    .menu_i.__bg-blue(@click='setStatus("DELIVERY", "lead.state.changed")')
      .menu_i_t.__txt-white На доставке
    .menu_i.__bg-orange(@click='setStatus("SUBMIT", "lead.state.changed")')
      .menu_i_t.__txt-white Подтвержден
    .menu_i.__bg-red(@click.stop='setShowCancelMenu(true)')
      .menu_i_t.__txt-white Отменен
    .menu_i(@click.stop='setShowMenu(true)')
      .menu_i_t.__txt-green Назад
</template>

<script>
  import { mapActions } from 'vuex';

  import MenuComponent from 'components/menu/menu.vue';
  import * as leads from 'services/leads';

  export default{
    methods: {
      ...mapActions([
        //chat
        'setShowMenu',
        'setStatus',
        'setShowStatusMenu',
        'setShowCancelMenu'

      ])
    },
    components: {
      MenuComponent
    },
  }
</script>
