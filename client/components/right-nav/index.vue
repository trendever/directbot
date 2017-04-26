<template lang="pug">
.right-nav(v-if="isAuth && !isMobile && !isFake")

  .right-nav_i(:class='{"__active": current=="profile"}',
    @click="$router.push({name: 'profile'})",
    v-if="$route.name !== 'profile'")
    i.ic-user_menu

  .right-nav_i.menu__btn(v-if="$route.name === 'profile'",
    @click.stop="$emit('open-profile-menu')")
    i.ic-options_menu

  .right-nav_i(:class='{"__active": current=="chat"}',
    @click="$router.push({name: 'chat_list'})")
    i.ic-chats_active
    .notify-cout(v-if="getGlobalNotifyCount")
      span {{ getGlobalNotifyCount }}

  .right-nav_i(:class='{"__active": current=="home"}',
    @click="$router.push({name: 'home'})",
    v-if="isTrendever")
    i.ic-gallery_menu

</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed:{
    ...mapGetters([
      'isAuth',
      'getGlobalNotifyCount',
      'isFake'
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

  position: fixed;
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
    padding-top: 10px;
    cursor:pointer;

    &:hover {
      //background: $color__brand-light;
      background:$color__gray-light;
    }

    &.menu__btn {
      &:hover {
        background: initial;
      }
    }

    &.__active {
      //background: $color__brand-light;
      background:$color__gray-light;
    }
    i.ic-user_menu{
      width: 50px;
      height: 60px;
    }
    i.ic-user_menu,
    i.ic-gallery_menu,
    i.ic-chats_menu,
    i.ic-options_menu,
    i.ic-chats_active  {
      font-size: 32px;
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
