<template lang="pug">
div.photos
  ul.photos-flex(:style="{ paddingTop: padding + 'px'}")
    template(v-for="photo, index in listPhotos")
      single(:product="photo.data", :class-name="'p-item-' + index")
</template>

<script>

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import listen from 'event-listener';
import single from './single.vue';
import * as products from 'services/products.js';

export default {
  props:{
    shopId: {
      default:null
    },
    infinite: {
      default: false
    }
  },
  data(){
    return {
      windowListener: {},
      padding: 0,
      Off: false,
      offset: 0,
      list: ''
    }
  },
  mounted(){


    this.simpleScroll().then(()=>{

      console.log(this.listPhotos);

    })

    if(this.infinite) {

      this.infiniteScroll();

    }

  },

  methods:{

    ...mapActions([

      'openList',
      'closeList',
      'setScroll'

    ]),

    simpleScroll(){

      return this.openList({

        id: this.$route.params.id ? +this.$route.params.id : 'home',
        shop_id: this.$route.params.id ? +this.$route.params.id : null

      })

    },

    infiniteScroll(){

/*    let photos = this.$store.state.photos.lists[this.list];

      if(photos.padding) {

        this.padding = photos.padding;

      }

      if(localStorage.getItem('scrollCnt')){

        let { idStart, idEnd } = localStorage.getItem('scrollCnt');



      }

      if( photos.list.length) {

      }

      if( !photos.list.length ) {

        products.find({limit:50, offset: this.offset, shop_id: this.shopId }).then(data=>{

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

            products.find({limit: 20, offset: this.offset, shop_id: this.shopId  }).then(data=>{

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
      })*/
    }
  },

  beforeDestroy(){

    //let { idStart, idEnd } = this.$store.state.photos.lists[this.list];

    //localStorage.setItem(`${ this.$route.name }.scrollCnt`, { idStart, idEnd, padding: this.padding })

    this.windowListener.remove();

  },

  computed: {

    ...mapGetters([
      'listName',
      'listPhotos',
      'listScroll'
    ])

  },
  components:{

    single

  },
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
