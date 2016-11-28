<style src='./navbar.pcss'></style>
<template lang="jade">

.navbar-cnt(v-if='isAuth && isMobile')
  .navbar.section__content

    .navbar_i(:class='{"__active": current=="chat"}', v-link='{name: "chat_list"}')
      .navbar_i_wrap
        i.ic-cloud.navbar_i_wrap_ic.__chat_ic
        .navbar_i_wrap_t Чаты
        //- .navbar_i_wrap_notify(v-show='getGlobalNotifyCount')
        //-   span

    .navbar_i(:class='{"__active": current=="profile"}', v-link='{name: "profile"}')
      .navbar_i_wrap
        i.ic-profile.navbar_i_wrap_ic
        .navbar_i_wrap_t Профиль

</template>

<script>
  // import { isAuth,isFake } from 'vuex/getters/user.js';
  // import { getGlobalNotifyCount } from 'vuex/getters/lead.js';

  export default{
    data() {
      return {};
    },
    props: {
      // current: {
      //   type: String,
      //   default: null,
      // },
    },
    vuex: {
      // getters: {
      //   isAuth,
      //   isFake,
      //   getGlobalNotifyCount,
      // },
    },
    computed:{
      isMobile(){
        return window.browser.mobile;
      }
    },
    methods:{
    }
  };
</script>
