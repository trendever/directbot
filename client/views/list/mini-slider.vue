<template lang="pug">
#mini-slide
  .slider
    .wrap(:style="{marginLeft: currentMargin + 'px'}")
      .item(ref="item").bg-image
        i.ic-play.white
      .item
        i.ic-play.opacity
        img(src="./img/slide_2.svg")
      .item
        i.ic-play.opacity
        img(src="./img/slide_3.svg")


</template>

<script>
export default {

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
  padding-top: 100px;
  height: calc($img_height + 140px);
  width: calc($img_width + 100px);
  background: transparent;
  background-image:url(./img/mob.png);
  background-repeat: no-repeat;
  background-size: calc($img_width + 69px);
  background-position: 16px 20px;
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
      background-image: url('./img/blue_slide.jpg');
      background-size: 150%;
    }
  }

}



</style>
