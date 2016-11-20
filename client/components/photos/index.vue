<template lang="pug">
div.photos
  ul.photos-flex(:style="{ paddingTop: padding + 'px'}")
    template(v-for="photo, index in getPhotos")
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
      off: false,
      offset: 0,
      idStart: 0,
      idEnd: 0

    }
  },
  mounted(){

    let photos = this.$store.state.photos;

    if(photos.padding) {

      this.padding = this.$store.state.photos.padding;

    }

    if( this.$store.state.photos.list.length) {

    } else {

      products.find({limit:50, offset: this.offset}).then(data=>{

        photos.list = data;

        photos.idStart = 0;

        photos.idEnd = data.length;

      })

    }

    this.windowListener = listen(window, 'scroll',()=>{

      localStorage.setItem(`${this.$route.name}.scroll`, window.scrollY);

      let direction = window.scrollY - this.oldScroll < 0 ? false : true;

      this.oldScroll = window.scrollY;

      let { scrollTop, scrollHeight } = document.body;

      if(this.off) return;

      if(direction) {

        let xItem = document.querySelector(`.p-item-${Math.ceil(this.getPhotos.length/3)}`);
        xItem.style.background = 'red';

        if( xItem.getBoundingClientRect().bottom < 0 ) {

          this.off = true;
          this.offset += 20;

          products.find({limit: 20, offset: this.offset }).then(data=>{

            data.forEach(item=>{

              this.$store.state.photos.list.push(item)

            });

            photos.idStart += 10;

            photos.idEnd += 10;

            this.padding += xItem.offsetHeight * 5

            this.off = false;

          })



        }
      } else {

          let xItem = document.querySelector(`.p-item-${Math.ceil(this.getPhotos.length/3)}`);

          xItem.style.background = 'red';

          if( xItem.getBoundingClientRect().top > window.innerHeight ) {

            if(photos.idEnd < 40) {

              return;

            }

            photos.idStart -= 10;

            photos.idEnd -= 10;

            this.padding -= Math.abs(xItem.offsetHeight * 5)

          }
        }
      })
  },
  beforeDestroy(){

    this.$store.state.photos.padding = this.padding;

    this.windowListener.remove();

  },

  computed: {

    getPhotos(){

      let photos = this.$store.state.photos;

      return this.$store.state.photos.list.slice(photos.idStart, photos.idEnd);

    }

  },
  watch:{
    photos(value){


    }

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
