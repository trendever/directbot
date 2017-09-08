<template lang="pug">

#fullscreen-popup(:class="{'full': full, 'ios-browser': isIos }", ref="screen")
  i.ic-close(v-on:click="close")
  component(v-bind:is="$route.params.id")

</template>


<script>
import connectHelp from './parts/connectbot-help';
import useConditions from './parts/use-conditions';
import agreement from './parts/agreement';

export default {
  data(){
    return {
      full: false
    }
  },
  methods:{
    close(){
      if(this.$route.params.id === 'conditions'){
        this.$router.push({name: 'auth'})
        return
      }
      if(this.$route.params.id === 'connect'){
        this.$router.push({name: 'connect-bot'})
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

  i.ic-close{
    position: fixed;
    color: $color__white;
    font-size: 24px;
    top: 30px;
    right: 30px;
      cursor: pointer;
      @media(--mobile){
        font-size: 34px;
      }
  }

  .title {

    padding: 10px * 40px *;
    text-align: center;
    font-family: $font__family__semibold;
    font-size: 32px;

    @media (--mobile) {
      font-size: 40px;
    }

    .title-head {

      margin: 30px 0;

    }

    .title-body{

        font-family: $font__family__light;
        @media (--mobile ) {
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

      @media( --mobile) {
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


        @media (--mobile) {
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


