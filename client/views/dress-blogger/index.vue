<template lang="pug">

#dress-blogger

  top-blogger
  how-win
  bottom-blogger
  .bottom-space
    .area-title Расскажите про фонд #ОденьБлогера
    .area-icons
      img(src="./images/soc_ig.png")
      img(src="./images/soc_fb.png")
      img(src="./images/soc_vk.png")
      img(src="./images/soc_telegram.png")
      img(src="./images/soc_whatsapp.png")

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

.brand-section {

  height: 100px;

  img {
    cursor: pointer;
    margin-top: 15px;
    margin-left: 1%;
    display: inline-block;
    float:left;
    max-width: 150px;

    @media (--mobile ){
      margin-left: 37px;
      margin-top: 50px;
      max-width: 250px;
    }
  }

  .land__top-btn {

    display: inline-block;
    float:right;
    margin-top: 15px;
    margin-right: 1%;
    font-size: 16px;
    font-family: $font__family__semibold;
    border: 1px solid white;
    color: white;
    border-radius: 5px;

    @media (--overmobile) {
      width: initial;
      padding:10px 35px;
    }

    @media (--mobile){
      display: none;
    }

    &:hover {
      cursor: pointer;
      background: white;
      color: black;
    }
  }
}


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
  .customers-btn,
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
