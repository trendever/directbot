<template lang="pug">

#dress-blogger

  top-blogger
  how-win
  bottom-blogger

</template>

<script>

import topBlogger from './top-blogger';
import howWin from './how-win';
import bottomBlogger from './bottom-blogger';

export default {
  components: {
    topBlogger,
    howWin,
    bottomBlogger
  },
  data () {
    return {

    };
  }
};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';
#dress-blogger {

  size: 100%;
  background: black;
  color: white;
  text-align: center;


  .shops-btn,
  .go-btn,
  .place-btn {
    border: 1px solid white;
    color: white;
  }


}
</style>
