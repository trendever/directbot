<style src='./header.pcss'></style>
<template lang="pug">
.header
    .header__content
      .wrapper.directbot-color
        .header__arrow(
          @click='leftBtnAction',
          v-if='leftBtnShow',
          :class="{'show-desktop-arrow': showDesktopArrow}")

          i.header__arrow__ic.ic-arrow-left(
          :class='{"_up": is_action_up}')

        .header__notify-count(v-if='notifyCount')
          span {{ notifyCount }}

        .header__use-days(
          v-if='$route.name === "profile" && isMobile && activeMonetization && $store.getters.getUseDays !== -1',
           @click="$router.push( {name: 'home'} )")

          .days-count {{ $store.getters.getUseDays }}
            span д


        .header__center

          .header__left-logo
           router-link(:to="{name: 'home'}")
            //img(src="../img/logo-main.svg")

          .header__text(v-if="centerTextLink === null") {{ title }}
          .header__text.active(v-if="centerTextLink !== null", @click="$router.push(centerTextLink)") {{ title }}
            img.center-avatar(:src="avatarUrl", v-if="page == 'product' && !isMobile")


          slot(name='center-content')



        .header-right(
          v-if="avatarUrl !== null && centerTextLink !== null && isMobile",
          @click="$router.push(centerTextLink)")

          img(:src="avatarUrl")



        slot(name='content')



</template>

<script type='text/babel'>
  import settings from 'root/settings';
  import listen from 'event-listener';


  export default {
    data(){
      return {
        activeMonetization: settings.activateMonetization,
        is_visible: false,
        is_action_up: false,
        scrollEvent: null,
        showOnEl: null,
        isMobile: window.browser.mobile
      }
    },
    props: {
      showDesktopArrow:{
        type: Boolean,
        default: false
      },
      // Title of header
      title: {
        type: String
      },

      // if exists, then btn will work in two mode:
      // 1. Go to prev page
      // 2. Scroll to top (if show_on_elem scrollY is 0 or smaller)
      // Elem Y position must be not ~0px.
      show_on_elem: {
        type: String,
        default: null
      },

      // if header is not main. For example the home page.
      // Header will show if show_on_elem scrollY is 0 or smaller
      is_secondary: {
        type: Boolean,
        default: false
      },

      // If exist, then LeftArrowBtn will redirect to backLink
      // receive reverse url name. Example: home
      backLink: {
        default: false
      },

      forceBackLink: {
        default: false
      },

      // if exists, scroll to position Y this id element
      scrollToElement: {
        type: String,
        default: null
      },

      // Show or Hide back arrow
      leftBtnShow: {
        type: Boolean,
        default: true
      },

      // Show notify badge if exist
      notifyCount: {
        type: Number,
        default: 0
      },
      centerTextLink:{
        type: Object,
        default : null
      },
      avatarUrl:{
        type: String,
        default : null
      },
      page:{
        type: String,
        default : 'home'
      }
    },
    beforeDestroy() {
      if ( this.scrollEvent ) {
        this.scrollEvent.remove();
      }
    },
    mounted() {


      if ( this.show_on_elem ) {
        this.showOnEl = document.getElementById( this.show_on_elem );
      }

      // Run, function for stopped scroll.
      // Because function work only in motion.
      this.toggleHeaderOnScroll();

      this.scrollEvent = listen( window , 'scroll', this.toggleHeaderOnScroll.bind( this ) )
    },
    computed:{
      isNotEmptyHistory(){

        if (window.before && window.before.prev){
          if (this.$route.name == window.before.name){
            return window.before.name != window.before.prev.name
          }
          return true
        }else{
          return false;
        }
      }
    },
    methods: {

      leftBtnAction() {


        if ( this.show_on_elem ) {
          if ( document.body.scrollTop - this.showOnEl.offsetTop >= 0 ) {

            if ( this.scrollToElement ) {
              document.body.scrollTop = document.getElementById( this.scrollToElement ).offsetTop;
            } else {
              document.body.scrollTop = 0;
            }
            return;
          }
        }


        if (!this.backLink) {
          if (this.$route.name === window.before.name && window.before.prev){
            this.$router.push({ name: window.before.prev.name, params: window.before.prev.params})
            return;
          }
          this.$router.push({ name: window.before.name, params: window.before.params})

        } else {

          this.$router.push( this.backLink );

        }


      },

      toggleHeaderOnScroll() {

        if ( this.show_on_elem ) {
          // If show_on_elem not exists, then wait when render it.
          // Be careful, it's may cycling as
          // infinity recursion if element not exists.
          if ( !this.showOnEl ) {
            setTimeout( this.toggleHeaderOnScroll.bind( this ), 50 );
            return;
          }

          // Show header, if show_on_elem scrollY is 0 or smaller
          if ( document.body.scrollTop - this.showOnEl.offsetTop >= 0 ) {
            this.is_visible =  true;

            // Left btn now work as ScrollToTop
            this.is_action_up = true ;
            return;
          }
        }

        // Left btn now work as Go to Prev Page
        this.is_action_up = false ;

        // if header as secondary header
        if ( this.is_secondary ) {
          this.is_visible =  false;
          return;
        }
        this.is_visible =  true;
      },
    },
  }

</script>
