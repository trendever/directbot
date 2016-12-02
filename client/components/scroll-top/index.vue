<style src="./style.pcss"></style>
<template lang="pug">
.scroll-top( @click='up()', v-show="is_visible", :class='{"__fly": !$store.getters.isAuth, "directbot-color": directbot }' )
  i.ic-arrow-up-thin(:class='{"arrow__down": !toUp}')
</template>

<script type="text/babel">
  import settings from 'root/settings';
  import listen from 'event-listener';


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

        if ( this.toUp ) {

          this.is_visible = document.body.scrollTop - (document.body.offsetHeight * 2) >= 0;

        } else {

          this.is_visible = (document.body.scrollHeight - document.body.scrollTop) > document.body.offsetHeight * 2;

        }

      },
      up() {

        if(this.toUp){

          window.scrollTo(0,0);

        } else {

          window.scrollTo(0,document.body.scrollHeight);

        }

      }
    }
  }
</script>
