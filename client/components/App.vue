<template lang="pug">
#app
  router-view
</template>

<script>
import store from 'root/store';
import 'style/fonts/trendever-icons/trendever-icons.font.js';
import 'style/fonts/san-francisco/light/font.pcss';
import 'style/fonts/san-francisco/regular/font.pcss';
import 'style/fonts/san-francisco/semibold/font.pcss';
import 'style/fonts/san-francisco/thin/font.pcss';
import 'style/index.pcss';
export default {
  created(){

    store.dispatch('authUser', { null, null } )

  }
}
</script>

<style lang="postcss">
@import '../style/vars/fonts.pcss';
* {

  box-sizing: border-box;
  margin: 0;
  padding: 0;

}

body {

  font-size: 14px;
  font-family: $font__family;
}


.page {
  text-align: center;
  overflow: hidden;
}

</style>
