<template lang="pug">
#app
  router-view
</template>

<script>

import 'components/fonts/trendever-icons/trendever-icons.font.js';
import 'components/style/index.pcss';

export default {
  created(){


  }
}
</script>

<style lang="postcss">
@import 'components/vars/fonts.pcss';
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
