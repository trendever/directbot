<template lang="pug">

#dress-blogger(:class="{wait: wait}")
  span(v-if="wait") Скоро запуск!
  template(v-if="!wait")
    top-blogger
    how-win
    bottom-blogger
    .bottom-space
      .area-title Расскажите про фонд #ОденьБлогера
      .area-icons
        a: img(src="./images/soc_ig.png")
        a(href="http://www.facebook.com/sharer.php?u=https://www.trendever.com/dressblogger" target="_blank")
          img(src="./images/soc_fb.png")
        a(href="http://vk.com/share.php?url=https://www.trendever.com/dressblogger", target="_blank")
          img(src="./images/soc_vk.png")
        a(href="https://telegram.me/share/url?url=https://www.trendever.com/dressblogger>" target="_blank")
          img(src="./images/soc_telegram.png")
        a(href="whatsapp://send?text=https://www.trendever.com/dressblogger",
          data-text="https://www.trendever.com/dressblogger"
          data-action="share/whatsapp/share")
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
      wait: false
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

  &.wait {
    height: 100%;
    span {
      width: 100%;
      position: relative;
      top: calc( 50% - 50px);
      font-size: calc( $font__medium + 25px);
      font-family: $font__family__semibold;
    }
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
      @media (--tabletandless){
        img {
          width: 86px;

        }
      }
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
