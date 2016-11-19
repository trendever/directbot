<template lang="pug">
div.photos
  ul.photos-flex(:style="{ paddingTop: padding + 'px'}")
    template(v-for="photo, index in photos")
      single(:product="photo.data", :class-name="'p-item-' + index")
</template>

<script>
import listen from 'event-listener';
import single from './single.vue';
import * as products from 'services/products.js';

export default {
  data(){
    return {
      photos: [],
      scroll: 0,
      windowListener: {},
      padding: 0,
      off: false

    }
  },
  mounted(){

    products.find({limit:50, offset: this.offset}).then(data=>{

      this.photos = data;

    })

    this.windowListener = listen(window, 'scroll',()=>{

      console.log(this.off)

      if(this.off) return;

      let { scrollTop, scrollHeight } = document.body;

      if( scrollTop >  scrollHeight / 2 ) {

        this.off = true;

        products.find({limit:2, offset: this.photos.length + this.count}).then(data=>{

          this.photos = data;

        }).then(()=>{

          setTimeout(()=>{
            this.off = false;
          },200)

        })

    }


    })
  },
  beforeDestroy(){
    this.windowListener.remove();
  },
  components:{
    single
  }
}
</script>

<style type="pcss">
.photos-flex{
  padding: 0;
  margin: 0;
  list-style: none;

  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -webkit-flex-flow: row wrap;
  justify-content: space-around;
 }

 .flex-item {
  //background: tomato;
  width: 50%;
  hegith: 400px;
  color: white;
  font-weight: bold;
  font-size: 3em;
  text-align: center;

  img {
    max-width: 200px;
  }
}


</style>
