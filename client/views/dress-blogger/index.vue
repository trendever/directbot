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
  position: relative;
  background: url(./images/Bgr-fix-desk.jpg);
  background-attachment: fixed;
  color: white;
  text-align: center;

  @media ( --mobile ) {
    background: url(./images/Bgr-fix-mob.jpg);
  }

  .go-btn,
  .place-btn {
    display: inline-block;
    font-family: $font__family__semibold;
    font-size: 20px;
    margin: 25px auto 25px auto;
    border: 1px solid white;
    color: white;
    width: 300px;
    padding: 10px 0px;
    border-radius: 4px;


    &:hover {
      cursor: pointer;
      background: white;
      color: black;
    }
  }


}
</style>
