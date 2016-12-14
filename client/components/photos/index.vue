<template lang="pug">
.photos
  template(v-for="photo, index in listProducts")
    single(:product="photo.data", :key="photo.id", :class-name="'p-item-' + index", :class-data="index%2")
  div#infinitie
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

    eventHub.$on('updatePhotos',()=>{

    });

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

    checkVisible(elm) {
      let rect = elm.getBoundingClientRect();
      let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    },

    simpleScroll(){
      //to have 0 scroll when first load

      if(!this.$store.state.products.lists.hasOwnProperty(this.listName)) {

        this.firstOpened = true;

      }

      this.openList( {
        listId: this.listName,
        shop_id: this.shopId
      } ).then(()=>{
        let elem = document.getElementById("infinitie")
        this.windowListener = listen( window , 'scroll', () => {
          if (this.checkVisible(elem)){
            this.offset += 20;
            this.increaseListLength( {
              shop_id: this.shopId,
              offset: this.offset
            });
          }
        });
      });
    },

    scrollTo(value){
      window.scrollTo(0,value);
    }
  },

  beforeDestroy(){

    if(this.windowListener.remove){
      this.windowListener.remove()
    }

    //this.closeList();
  },

  components:{

    single,
    scrollTop

  },
}
</script>
