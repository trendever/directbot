<style src='./navbar.pcss'></style>
<template lang="pug">

.navbar-cnt(v-if='isAuth && isMobile && !isFake')
  .navbar.section__content
    .navbar_i(:class='{"__active": current=="feed"}', @click='$router.push({name: "home"}), scrollTop')
      .navbar_i_wrap
        i.ic-gallery_menu_active.navbar_i_wrap_ic(v-if="current ==='feed'")
        i.ic-gallery_menu_inactive.navbar_i_wrap_ic(v-if="current !=='feed'")
        .navbar_i_wrap_t Лента

    .navbar_i(:class='{"__active": current=="chat"}', @click='$router.push({name: "chat_list"}), scrollTop')
      .navbar_i_wrap
        i.ic-cloud.navbar_i_wrap_ic.__chat_ic
        .navbar_i_wrap_t Чаты
        .navbar_i_wrap_notify(v-show='getGlobalNotifyCount')
          span {{ getGlobalNotifyCount }}

    .navbar_i(:class='{"__active": current=="profile"}', @click='$router.push({name: "profile"}), scrollTop')
      .navbar_i_wrap
        i.ic-profile.navbar_i_wrap_ic
        .navbar_i_wrap_t Профиль

</template>

<script>

  import { mapGetters } from 'vuex';

  export default{
    props: {
      current: {
        type: String,
        default: null,
      },
    },
    computed:{
      ...mapGetters([
        'isAuth',
        'isFake',
        'getGlobalNotifyCount',
      ])
    },
    methods:{
      scrollTop(){
        window.scrollTo(0,1);
      }
    }
  };
</script>
