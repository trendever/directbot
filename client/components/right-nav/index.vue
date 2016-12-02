<template lang="pug">
.right-nav(v-if="isAuth && !isMobile")
  router-link.right-nav_i(:class='{"__active": current=="profile"}', :to='{name: "profile"}', v-if="$route.name !== 'profile'")
    i.ic-user_menu
  .right-nav_i.menu__btn(v-if="$route.name === 'profile'", v-on:click.stop="$store.dispatch('setShowMenu', 'true')")
    i.ic-options_menu
  router-link.right-nav_i(:class='{"__active": current=="chat"}', :to='{name: "chat_list"}')
    i.ic-chats_menu
    .notify-cout(v-if="getGlobalNotifyCount")
      span {{ getGlobalNotifyCount }}
  router-link.right-nav_i(:class='{"__active": current=="feed"}', :to='{name: "home"}')
    i.ic-gallery_menu

</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed:{
    ...mapGetters([
      'isAuth',
      'getGlobalNotifyCount'
    ])
  },
  props:{
    current: {
      type: String,
      default: null
    }
  },

};
</script>

<style lang="postcss">

@import 'style/vars/vars.pcss';

.right-nav {

  position: absolute;
  top:0;
  right:18px;
  z-index: 999;

  .right-nav_i {
    position: relative;
    height: 50px;
    width: 50px;
    display: inline-block;
    float: right;
    text-align: center;
    vertical-align:middle;
    padding-top: 8px;
    cursor:pointer;

    &:hover {
      background: $color__light-blue;
    }

    &.menu__btn {
      &:hover {
        background: initial;
      }
    }

    &.__active {
      background: $color__light-blue;
    }
    i.ic-user_menu{
      width: 50px;
      height: 60px;
    }
    i.ic-user_menu, i.ic-gallery_menu, i.ic-chats_menu, i.ic-options_menu  {
      font-size: 32px;
      color: white;
    }

    .notify-cout{
      position: absolute;
      z-index: 1000;
      top: 3px;
      right: 3px;
      display: flex;
      min-width: 23px;
      height: 23px;
      padding: 0 3px;

      border-radius: 15px;
      background: #EF3758;
      font-size: 10px;
      align-items: center;
      justify-content: center;
      span {
        color: white;
      }
    }
  }
}

</style>
