<template lang="pug">
.photos
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

      } )

    },

    scrollTo(value){
      window.scrollTo(0,value);
    }
  },

  watch: {

    '$route'(){

      this.scrollTo(0);

    }

  },

  beforeDestroy(){

    //this.windowListener.remove();

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
