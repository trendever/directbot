<template lang="pug">
#app
  router-view(v-if="authDone")
  listener(v-if="authDone")
</template>

<script>

import 'style/fonts/trendever-icons/trendever-icons.font.js';
import 'style/index.pcss';


import store from 'root/store';
import Listener from './Listener.vue';

export default {
  data(){
    return {
      authDone: false,
    }
  },
  components: {
    Listener
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
  height: 100%;
  font-size: 14px;
  font-family: $font__family;

}

#app{
  height: 100%;
}

</style>
