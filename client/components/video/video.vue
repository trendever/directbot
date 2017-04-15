<style src='./style.pcss'></style>
<template lang="pug">

  .main-video
    i(@click='closeVideo').ic-close
    iframe(v-if='isMobile',
      ref="iframe-video-mobile",
      :style="{ height: width, width: width }",
      src="https://www.youtube.com/embed/IldZHx-naRA?autoplay=0&rel=1&vq=hd720&amp;showinfo=0",
      frameborder="0",
      allowfullscreen)

    iframe(v-if='!isMobile',
      ref="iframe-video",
      :style="{ height: height, width: width }",
      src="https://www.youtube.com/embed/QPSw5RKJw3s?autoplay=0&rel=1&amp;showinfo=0",
      frameborder="0",
      allowfullscreen)

</template>

<script>

  import listen from 'event-listener';

  export default {
    data(){
      return {
        height:'300px',
        width:'300px',
        isMobile: false
      };
    },

    mounted(){
      this.detectDevice();

      this.resize = listen( window, 'optimizedResize', () => {

        this.setSize();

      } ) ;

      this.$nextTick( () => {

        this.setSize();

      } );

    },

    beforeDestroy(){
      this.resize.remove();
    },

    methods: {
      detectDevice() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      },

      setSize(){
        const width = document.body.offsetWidth;
        const height = (720 * width) / 1280;
        this.height =  `${height}px`;
        this.width = `${width}px`;
      },

      closeVideo(){
        window.history.back();
      }
    },

  };

</script>
