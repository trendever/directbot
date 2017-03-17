<template lang="pug">

#dress-blogger

  top-blogger
  how-win
  bottom-blogger
  .bottom-space
    .area-title Расскажите про фонд #ОденьБлогера
    .area-icons
      img(src="./images/soc_fb.png")
      img(src="./images/soc_ig.png")
      img(src="./images/soc_vk.png")

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
    background-image: url(./images/Bgr-fix-mob.jpg);
    background-size: 97%;
    background-position: 40px 80px;
  }

  .bottom-space {
    background: black;

    .area-title {
      font-size: $font__normal;
      padding: 15px 0 0 0;

      @media (--mobile) {
        font-size: $font__medium;
        font-family: $font__family__thin;
        padding: 25px 0 0 0;
      }

    }

    .area-icons {
      img {
        display: inline-block;
        padding: 25px 15px;
        cursor: pointer;
      }
    }
  }

  .shops-btn,
  .go-btn,
  .place-btn {
    display: inline-block;
    font-family: $font__family__semibold;
    font-size: $font__normal;
    margin: 25px auto 25px auto;
    border: 1px solid white;
    color: white;
    border-radius: 5px;

    @media (--overmobile) {
      width: initial;
      padding:13px 65px;
    }

    @media (--mobile){
      width: 600px;
      height: 118px;
      font-size: 36px;
      line-height: 118px;
      padding: 0;
    }

    &:hover {
      cursor: pointer;
      background: white;
      color: black;
    }
  }
}
</style>
