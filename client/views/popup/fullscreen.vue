<template lang="pug">

#fullscreen-popup(:class="{'full': full, 'ios-browser': isIos }", ref="screen")
  span.close(v-on:click="close"): i.ic-close
  component(v-bind:is="$route.params.id")

</template>


<script>
import connectHelp from './parts/connectbot-help';
import useConditions from './parts/use-conditions';
import agreement from './parts/agreement';
import privacy from './parts/privacy';

export default {
  data(){
    return {
      full: false
    }
  },
  methods:{
    close(){

      let id = this.$route.params.id

      if(id === 'conditions'||id=="privacy"){
        this.$router.push({name: 'auth'})
        return
      }
      if(this.$route.params.id === 'connect'){
        this.$router.push({name: 'connect-bot'})
        return
      }
      if(this.$route.path.indexOf("agreement") != -1) {
        this.$router.push({name:'monetization'})
        return
      }
      this.$router.push({ name: 'home'})
    }
  },

  mounted(){
    this.full = this.$refs.screen.offsetHeight < window.innerHeight ? true : false;

  },
  components: {
    'connect': connectHelp,
    'conditions': useConditions,
    'agreement': agreement,
    'privacy': privacy,
  }
}

</script>


<style lang="postcss">

@import 'style/vars/vars.pcss';

.link-bottom {
  cursor: pointer;
}


#fullscreen-popup {

  position: relative;
  background: $color__brand-dark;
  color: $color__white;

  &.ios-browser {
    li {

    }
  }

  &.full {
    height: 100%;
  }
  span.close {
    top: 0;
    right: 0;
    display: block;
    position: fixed;
    padding: 30px;
    cursor: pointer;
    z-index: 5000;
    i.ic-close{

      color: $color__white;
      font-size: 24px;
      cursor: pointer;
      @media (--tabletandless){
        font-size: 34px;
      }
    }
    
  }

  .title {

    padding: 10px * 40px *;
    text-align: center;
    font-family: $font__family__semibold;
    font-size: 32px;

    @media (--tabletandless) {
      font-size: 40px;
    }

    .title-head {

      margin: 30px 0;

    }

    .title-body{

        font-family: $font__family__light;
        @media (--tabletandless ) {
          font-size: 4.6vw;
        }

        @media screen and (min-width: 751px) {
          margin-bottom: 24px;
          font-size: 24px;
        }

        &.one {

          margin-bottom: 20px;

        }
    }
  }

  .content {

    width: 95%;
    margin: 0 auto;
    font-size: 24px;

    ul {
      list-style: initial;
      padding-left: 30px;
      margin-left: auto;
      margin-right: auto;
      margin-top: -24px;

      @media( --tabletandless) {
        padding-left: 7%;
      }
      @media screen and (min-width: 751px) {
        margin-top: -44px;
        padding-left: 50px;
        width: 720px;
      }

      li {

        font-family: $font__family__light;
        line-height: 25px;
        margin-top: 10px;


        @media (--tabletandless) {
          line-height: 40px;
          margin-top: 30px;
          font-size: 4.6vw;
          margin-left: 10px;
        }

        a {
          color: white;
        }

      }
    }
  }
}


</style>


