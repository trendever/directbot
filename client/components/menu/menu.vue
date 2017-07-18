<style src='./menu.pcss'></style>
<template lang="pug">
transition(:name="isMobile ? 'fade-menu' : ''")
  .menu-cnt(
    :class="{'desktop-style': !isMobile,'cancel-items': getShowCancelMenu && !isMobile,'main-items': getShowMenu && !isMobile && !getShowCancelMenu}",
    @click="$store.dispatch('setShowMenu', false)")
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
<style lang="postcss">
@import 'style/vars/vars.pcss';
.menu-cnt {
  @media (--tabletandless){
    position: fixed 0 0 0 0;
    background: $color__brand-opacity;
    z-index: 400;
  }
}


</style>
