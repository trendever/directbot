<style src="./style.pcss"></style>
<template lang="pug">
.scroll-top( @click='up()',
  v-show="is_visible",
  :class='{"__fly": !$store.getters.isAuth, "directbot-color": directbot }' )
  i.ic-arrow-up-thin(:class='{"arrow__down": !toUp}')
</template>

<script type="text/babel">
  import settings from 'root/settings';
  import listen from 'event-listener';
  import JQuery from 'jquery';

  export default {
    props:{
      toUp:{
        type: Boolean,
        default: true
      }
    },
    data(){
      return {
        is_visible: false,
        directbot: true
      }
    },
    mounted() {
      this.toggleBtnOnScroll()
      this.scrollEvent = listen( window, 'scroll', this.toggleBtnOnScroll.bind( this ) )
    },
    beforeDestroy() {
      if ( this.scrollEvent ) {
        this.scrollEvent.remove();
      }
    },
    methods: {
      toggleBtnOnScroll(){

        let minScrollTop = this.$route.name === 'home' && !this.$store.getters.isAuth  ?

        (document.body.offsetHeight * 2) : (document.body.offsetHeight * 1.5)

        let bodyScroll = document.body.scrollTop

        if ( this.toUp ) {

          if(bodyScroll - minScrollTop + 40 >= 0){
            window.eventHub.$emit('hide-connect-btn', true);
          }

          this.is_visible = bodyScroll - minScrollTop >= 0;

        } else {

          this.is_visible = (document.body.scrollHeight - bodyScroll) > minScrollTop;

        }

      },
      up() {

        if(this.toUp){
          JQuery(document.body).animate({scrollTop: 0},450);
          window.scrollTo(0,0);

        } else {

          JQuery(document.body).animate({scrollTop: document.body.scrollHeight},450);
          //window.scrollTo(0,document.body.scrollHeight);

        }

      }
    }
  }
</script>
