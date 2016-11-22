<template lang="pug">
#app
  router-view
</template>

<script>
import listen from 'event-listener';
import * as product from 'services/products';

export default {
  created(){


  }
}
</script>

<style lang="postcss">

* {

  box-sizing: border-box;
  margin: 0;
  padding: 0;

}

body {

  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont,
               'avenir next', avenir,
               helvetica, 'helvetica neue',
               Ubuntu,
               'segoe ui', arial,
               sans-serif;
}


.page {
  text-align: center;
  overflow: hidden;
}

</style>
