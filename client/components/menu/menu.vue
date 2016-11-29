<style src='./menu.pcss'></style>
<template lang="pug">
.menu-cnt(:class="{'desktop-style': !isMobile,'cancel-items': getShowCancelMenu && !isMobile,'main-items': getShowMenu && !isMobile && !getShowCancelMenu}")
  .menu.section__content
    slot(name='items')
      .menu_i
        .menu_i_t.__txt-red Отмена

</template>

<script>
  import { mapGetters } from 'vuex';

  export default{
    computed: {
      ...mapGetters([
        'getShowCancelMenu',
        'getShowMenu',
        'getShowStatusMenu'
      ])
    },
    data(){
      return {
        isMobile: window.browser.mobile
      }
    }
  }
</script>
