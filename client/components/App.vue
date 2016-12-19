<template lang="pug">
#app.directbot
  router-view(v-if="authDone && monetizationDone")
  listener(v-if="authDone")
  monetization(v-if="authDone", v-on:checkbot="monetizationDone = true")
</template>

<script>

import 'style/fonts/trendever-icons/trendever-icons.font.js';
import 'style/index.pcss';


import store from 'root/store';
import Listener from './Listener.vue';
import Monetization from './Monetization.vue';

export default {
  data(){
    return {
      authDone: false,
      monetizationDone: false
    }
  },
  components: {
    Listener,
    Monetization
  },

  beforeCreate(){

    store
      .dispatch('authUser', { null, null } )
      .then( () => {
        this.authDone = true;
      })
  }
}

</script>

<style lang="postcss">

@import 'style/vars/fonts.pcss';

* {

  box-sizing: border-box;
  margin: 0;
  padding: 0;

}

body, html {
  height: auto;
  font-size: 14px;
  font-family: $font__family;

  @media screen and (max-width:1023px) {
    height: 100%;
  }
}

#app{
  height: 100%;
}

</style>
