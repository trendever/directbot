<template>

  <popup-container :on-close="onClose">

    <div class="img-container" ref="container">
      <div class="img-keeper" ref="img">

        <img ref="picture"  class="picture" @load="resizeImg"
         :src="url" alt="">

      </div>

      <div class="close-block" @click="onClose"></div>

    </div>

  </popup-container>



</template>

<style src="./style.pcss" scoped lang="postcss"></style>

<script type="text/babel">


  import  hammer from 'hammerjs';
  import listener from 'event-listener'
  import { browser, ratioFit } from 'root/utils'
  import popupContainer from 'components/popup-container';


  const memoize = {};

  export default {

    data(){

      return {
        deltaY: 0,
        deltaX: 0,
        currentScale: 1,
        isScaled: false,
        menuStyle: {
          marginBottom: '-450px'
        },
        showToSave: false
      }

    },
    mounted(){

      this.resize = listener( window, 'optimizedResize', this.resizeImg.bind( this ) );
      this.resizeImg();

      //http://sky2high.net/en/2015/03/hammer-js-css-touch-action-and-ios-safari-context-menu/
      let mc = new hammer.Manager( this.$refs.picture, {
        cssProps: Object.assign({},hammer.defaults.cssProps, { touchCallout: '' }),
        doNotPreventPress: true
      } );

      mc.add([

        new hammer.Pan({direction: hammer.DIRECTION_ALL, threshold: 40}),

        new hammer.Pinch({ enable: true}),

        new hammer.Tap({ taps:2, interval:500, threshold:2, time:300, posThreshold: 50}),
        new hammer.Press({ enable: true, touchAction: 'auto', domEvents: true })

      ])

      mc.on('pinchmove',e=>{
          this.pinchMove(e);
        })

        .on('pinchend',e=>{
          this.pinchEnd(e);
        })

        .on('panmove',e=>{
          this.panMove(e)
        })
        .on('panend', e=>{
          this.panEnd(e)
        })
        .on('tap',e=>{
          this.imgTaps(e)
        })

    },
    beforeDestroy(){

      this.resize.remove();
      this.$store.dispatch('openPopUp');

    },
    props: {
      url: {
        type: String,
        default: 'https://187308.selcdn.ru/dev/upload/thumbnail/dnvwjKZ/big',
      },
      width: {
        type: Number,
        default: 1280
      },
      height: {
        type: Number,
        default: 850
      },
      onClose: {
        type: Function,
        default: () => {
          console.log( 'Вы можете обработать этот эвент закрытия img-container' );
        }
      }
    },
    methods: {
      imgTaps(){
        if(!window.browser.mobile){
          return;
        }
        if(!this.isScaled){
          this.isScaled = true;
          this.currentScale = 2.25;
          this.$refs.picture.style.transform = `translate(${this.deltaX}px,${this.deltaY}px) scale(${this.currentScale})`;

          return;
        }
        this.resetTransform();

      },
      pinchMove(e){

        let scale = getRelativeScale(e.scale, this.currentScale);
        if(scale >= 1){
          event.target.style.transform = `translate(${this.deltaX}px,${this.deltaY}px) scale(${scale})`;
        }

      },
      pinchEnd(e){
        let coors = this.$refs.picture.getBoundingClientRect();

        let scale = getRelativeScale(e.scale, this.currentScale);

       if(Math.abs(coors.top)>= window.innerHeight && scale <= 4 || Math.abs(coors.left)>= window.innerWidth && scale <= 4 ){
          this.resetTransform();
          return;
        }

        if(scale < 1){
          this.resetTransform();
          return;
        }

        this.currentScale = scale;
        this.isScaled = true;
      },
      panMove(event){

        if(this.currentScale <= 1){
          return;
        }

        if(!window.browser.mobile){
          return;
        }
        let DeltaX = this.deltaX + event.deltaX;
        let DeltaY = this.deltaY + event.deltaY;
        event.target.style.transform = `translate(${DeltaX}px,${DeltaY}px) scale(${this.currentScale})`;

      },
      panEnd(event){
        this.deltaX += event.deltaX;
        this.deltaY += event.deltaY;

      },
      resetTransform(){
        this.currentScale = 1;
        this.deltaX = 0;
        this.deltaY = 0;
        this.isScaled = false;

        this.$refs.picture.style.transform = `translate(${this.deltaX}px,${this.deltaY}px) scale(${this.currentScale})`;

      },
      resizeImg(){

        const { clientWidth: contWidth, clientHeight: contHeight } = this.$refs.container;

        const padding = 208;

        const containerWidth  = ( contWidth - padding > this.width ) ? this.width : contWidth - padding;
        const containerHeight = contHeight - padding;

        let imgWidth  = containerWidth;
        let imgHeight = containerHeight;

        if ( contWidth > 750 ) {

          if ( this.height < this.width ) {

            imgHeight = ( this.height * imgWidth ) / this.width;

            if ( imgHeight > containerHeight ) {

              const res = ratioFit( this.width, this.height, imgWidth, containerHeight );

              imgHeight = res.height;
              imgWidth = res.width;

            }

          } else {

            const res = ratioFit( this.width, this.height, imgWidth, imgHeight );

            imgWidth  = res.width;
            imgHeight = res.height;

          }

        } else {

          if ( this.height < this.width ) {

            imgWidth  = contWidth;
            imgHeight = ( this.height * imgWidth ) / this.width;

          } else {

            const res = ratioFit( this.width, this.height, contWidth, imgHeight );

            imgWidth  = res.width;
            imgHeight = res.height;

          }

        }

        if ( imgHeight <= containerHeight ) {

          this.$refs.img.style.width  = `${imgWidth}px`;
          this.$refs.img.style.height = `${imgHeight}px`;

          this.$refs.img.style.marginLeft = `-${imgWidth / 2}px`;
          this.$refs.img.style.marginTop  = `-${imgHeight / 2}px`;

        }

      }

    },
    components: {
      popupContainer
    }
  }

  function getRelativeScale(scale,currentScale) {
    return scale * currentScale;
  }

</script>
