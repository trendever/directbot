<template lang="pug">
.photos.columns
  template(v-if="noResults")
    .reset-search(@click="$store.dispatch('clearSearch')")
      span Сбросить поиск
  template(v-for="photo, index in listProducts")
    single(
      :product="photo.data",
      :key="photo.id",
      :class-name="'p-item-' + index",
      :class-data="index%2",
      ref="single")

  #infinitie
  scroll-top

</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import JQuery from 'jquery';
import listen from 'event-listener';
import single from './single.vue';
import scrollTop from 'components/scroll-top';

import * as products from 'services/products.js';

export default {

  props:{
    tags: {
      default: false
    },
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
      load: false
    }
  },

  created(){

    window.eventHub.$on('updatePhotos', id => {
      if(id){
        this.simpleScroll({})
        return;
      }
      console.log('new products');
      this.simpleScroll( { updateInstagram: true } )
    });

    this.simpleScroll({})

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
    noResults(){
      if(this.listProducts){
        return !this.listProducts.length;
      }
    },
    offset(){

      if(this.listProducts){

        return this.listProducts.length || 0;

      }

    },
    ...mapGetters([

      'listId',
      'listProducts',
      'listScroll',


      //tags
      'selectedTagsId',
      //find
      'searchValue'

    ])

  },

  methods:{

    ...mapActions([

      'increaseListLength',
      'openList',
      'closeList',
      'setScrollToList'

    ]),
    searchChange(){

      if(!this.selectedTagsId) return;

      products
        .find({tags: this.selectedTagsId || null, query: this.searchValue || null})
        .then(data=>{
          this.$store.state.products.lists[this.listName].products = data;
      })

    },
    checkVisible(elm) {
      if (elm === null) return false;
      let rect = elm.getBoundingClientRect();
      let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    },

    simpleScroll( { updateInstagram = false } ){
      //to have 0 scroll when first load

      if(!this.$store.state.products.lists.hasOwnProperty(this.listName)) {

        this.firstOpened = true;

      }

      this.openList( {
        listId: this.listName,
        shop_id: this.shopId,
        updateInstagram
      } ).then(()=>{

        if(this.listProducts) {
          if(this.listProducts.length) window.eventHub.$emit('hide-grey');
        }

        let elem = document.getElementById("infinitie")

        this.windowListener = listen( window , 'scroll', () => {

          if (this.checkVisible(elem)){
            if (this.load) return;
            this.load = true;
            this.increaseListLength( {
              query: this.searchValue || null,
              tags: this.tags ? this.selectedTagsId : null,
              shop_id: null || this.shopId,
              offset: this.offset + 30
            }).then((data)=>{
              setTimeout(()=> { this.load = false },100);
            })

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

  watch:{
    selectedTagsId(val){
      this.searchChange();
    },
    searchValue(val){
      this.searchChange();
    }
  },

  components:{

    single,
    scrollTop

  },
}
</script>
