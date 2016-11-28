<template lang="pug">
#app
  router-view
  listener
</template>

<script>

import store from 'root/store';
import 'style/fonts/trendever-icons/trendever-icons.font.js';
import 'style/index.pcss';


//import Listener from './listener';

export default {

  created(){

    store.dispatch('authUser', { null, null } )

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

body {

  font-size: 14px;
  font-family: $font__family;

}

</style>
