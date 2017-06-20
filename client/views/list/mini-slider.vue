<template lang="pug">
#mini-slide.fullscreen-slider




  .slider(v-if="little")

      .item.bg-image( @click="$router.push({name: 'video-trendever'})", ref="item")
        img(src="./img/Trendever_logo.svg")
        i.ic-play.white
        .watch (смотреть видео)
      .item(@click="$router.push({name: 'video-trendever'})")
        i.ic-play.opacity
        img(src="./img/slide_2.svg")
      .item(@click="$router.push({name: 'video-trendever'})")
        i.ic-play.opacity
        img(src="./img/slide_3.svg")


  .slider(v-else)
    .wrap(:style="{marginLeft: currentMargin + 'px'}")
      .item.bg-image( @click="$router.push({name: 'video-trendever'})", ref="item")
        img(src="./img/Trendever_logo.svg")
        i.ic-play.white
        .watch (смотреть видео)
      .item(@click="$router.push({name: 'video-trendever'})")
        i.ic-play.opacity
        img(src="./hero-imgs/screen-1.jpg")
      .item(@click="$router.push({name: 'video-trendever'})")
        i.ic-play.opacity
        img(src="./hero-imgs/screen-2.jpg")


</template>

<script>
export default {
  props:{
    little:{
      default: false
    }
  },
  mounted(){
    let current=true;
    this.time = setInterval(()=>{
      let width=this.$refs.item.offsetWidth;
      if(current){
        this.currentMargin -= width;
        if(Math.abs(this.currentMargin)>=width*2){
          current=!current
          return;
        }
      } else {
        this.currentMargin += width;
        if(this.currentMargin>=0){
          current=!current
          return;
        }
      }
    },4000)
  },

  data () {
    return {
      currentMargin: 0
    };
  },
  beforeDestroy(){
    clearInterval(this.time)
  }
};
</script>

<style lang="postcss">

@import 'style/vars/vars.pcss';
$img_height: 263px;
$img_width: 282px;



#mini-slide {
  text-align:center;
  padding-top: 100px;
  height: calc($img_height + 140px);
  width: calc($img_width + 100px);
  background: transparent;
  background-image:url(./img/mob.png);
  background-repeat: no-repeat;
  background-size: calc($img_width + 69px);
  background-position: 16px 20px;


  $h: 600px;
  $w: 600px;
  &.fullscreen-slider {
    background: url(./hero-imgs/iPhone6_darkgreen_vector.png) no-repeat;
    background-size: 320px;
    width: 320px;
    height: 650px;
    padding: 0;

    .wrap {
      height: 500px;
    }
    .slider {
      height: 500px;
      transform: translateY(78px);
      .item {
        width: 282px;
      }
    }
  }
}

.slider {

  display: inline-block;
  width: $img_width;
  height: $img_height;
  text-align: left;
  overflow: hidden;

  i.ic-play {
    @mixin absolute-centered;
    display: inline-block;
    font-size: 50px;
    color: white;

    &.opacity {
      color: black;
      opacity: .7;
    }

  }

  .wrap {

    transition: all .4s;
    width: calc($img_width * 3.01);
    height: $img_height;
  }
  .item {
    position: relative;
    width: $img_width;
    height: 100%;
    display: inline-block;
    float: left;
    background-color: white;
    line-height: $img_height;
    text-align: center;
    img {
      width: 100%;
    }

    &.bg-image {
      background: url(./img/Trvr_pattern_green_dark.svg);
      //background-image: url('./img/blue_slide.jpg');
      background-size: 150%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .ic-play {
        position: relative;
        top: initial;
        left: initial;
        transform: none;
        margin: 15px 0;

      }
      img {
        max-width: 220px;
        margin: 0 auto;
        display: inline-block;
      }

      .watch {
        margin-top: -10px;
        line-height: initial;
        color: white;
        height: 50px;
        z-index: 400;
      }
    }
  }

}



</style>
