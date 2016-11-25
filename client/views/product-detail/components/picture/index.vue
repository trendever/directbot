<template>
  <div class="picture" :style='{ opacity: opacityImg }' ref="pic">
    <img :width="width" :height="height" :src="srcImg">
  </div>
</template>

<style src="./style.pcss" scoped lang="postcss"></style>

<script type="text/babel">
  export default {
    data(){
      return {
        srcImg: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        opacityImg: 0
      }
    },
    mounted(){

      this.loadImg( this.img );

    },
    methods: {

      loadImg( url ){

        this.opacityImg = 0;
        this.srcImg = url;

        // Load and set full image.
        let img = new Image();

        img.load( url, null, null, () => {

          this.srcImg = url;

          this.opacityImg = 1;

          //
          this.$store.state.user.showRootLoader = false;

        } );
      }
    },
    props: {
      img: {
        type: String,
        default: null
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    watch: {
      img( newImg ){
        this.loadImg( newImg );
      }
    }
  }
</script>
