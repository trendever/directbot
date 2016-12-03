<template lang="pug">
.photos
  ul.photos-flex(:style="{ paddingTop: space + 'px'}")
    template(v-for="photo, index in listProducts")
      single(:product="photo.data", :key="photo.id", :class-name="'p-item-' + index")

  scroll-top

</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import listen from 'event-listener';
import single from './single.vue';
import scrollTop from 'components/scroll-top';

import * as products from 'services/products.js';

export default {

  props:{
    shopId: {
      default:null
    },
    listName: {
      default: 'home',
    },
    infinite: {
      default: false
    }
  },

  data(){
    return {
      firstOpened: false,
      oldScroll: 0,
      windowListener: {},
      space: 0,
      off: false,
      offset: 0
    }
  },

  created(){

    this.simpleScroll()

  },

  mounted(){

    this.$nextTick(()=>{

      if(this.firstOpened) {

        this.scrollTo(0);
        return;

      }

      this.scrollTo(this.listScroll);

    });

  },

  computed: {

    ...mapGetters([

      'listId',
      'listProducts',
      'listScroll'

    ])

  },

  methods:{

    ...mapActions([

      'increaseListLength',
      'openList',
      'closeList',
      'setScrollToList'

    ]),

    simpleScroll(){
      //to have 0 scroll when first load

      if(!this.$store.state.products.lists.hasOwnProperty(this.listName)) {

        this.firstOpened = true;

      }

      this.openList( {

        listId: this.listName,

        shop_id: this.shopId

      } ).then( () => {

        this.$nextTick(()=>{

          this.windowListener = listen( window , 'scroll', () => {

            let direction = window.scrollY - this.oldScroll < 0 ? false : true;

            this.oldScroll = window.scrollY;

            this.setScrollToList(window.scrollY);

            if(this.off || !direction) return;

            if(window.scrollY > document.body.scrollHeight/2) {

              this.off = true;

              this.offset += 20;

              this.increaseListLength( {

                shop_id: this.shopId,

                offset: this.offset

              }).then(()=>{

                this.scrollTo(this.listScroll);

                this.off = false;

              })

            }

          })

        })

      })

    },

    scrollTo(value){

      window.scrollTo(0,value);

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

  watch: {

    '$route'(){

      this.scrollTo(0);

    }

  },

  beforeDestroy(){

    this.windowListener.remove();

    //this.closeList();

  },

  components:{

    single,
    scrollTop

  },
}
</script>

<style type="pcss">

@import 'style/vars/vars.pcss';

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
  justify-content: center;

  @media(min-width: 1050px){

    max-width: 1000px;
    margin: 0 auto;
  }

 }


 li.flex-item {

  @media(--mobile) {

    width: 48%;
    height: 48%;
    margin: * 2px * 2px;

  }

  @media(min-width: 751px){

    width: 32%;
    heigth: 32%;
    margin: * 5px * 5px;

  }

  img {
    width: 100%;
  }
}


</style>
