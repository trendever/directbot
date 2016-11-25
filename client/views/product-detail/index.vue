<template lang="pug">

//-header-component(
  :title='title',
  :center-text-link="centerTextLink",
  :page="page",
  :avatar-url='avatarUrl',
  :show-desktop-arrow="false")
  right-nav-component(slot="content", current="")
.section.main.top.little-padding
  .section__content
    post-component
</template>

<script type="text/babel">

import { mapGetters, mapActions } from 'vuex';
import store from 'root/store';

//import RightNavComponent from 'base/right-nav';
//import HeaderComponent from 'components/header/header.vue';
import PostComponent from './components/root/index.vue';
import listener from 'event-listener';

export default {
  created() {

    if(this.isAuth){

      /*this.checkIsUserProduct()

      .then(()=>{

        this.$broadcast('isAuthProduct');

      })*/

    }

  },

  methods: {
    ...mapActions([

      'openProduct',
      'closeProduct',
      'setScrollByProduct',
      'checkIsUserProduct'

    ])
  },

  computed: {

    ...mapGetters([

      'getOpenedProduct',
      'getScrollTopOfProduct',
      'isAuth'

    ]),

    title(){

      if ( this.getOpenedProduct ) {

        return this.supplierName

      }

    },

    page(){

      return "product";

    },

    supplier(){

      if ( this.getOpenedProduct ) {

        if ( this.getOpenedProduct.supplier ) {

          return this.getOpenedProduct.supplier

        }

      }

      return null

    },

    supplierName(){

      if ( this.getOpenedProduct ) {

        if ( this.getOpenedProduct.supplier ) {

          if ( this.getOpenedProduct.supplier.instagram_username ) {

            return this.getOpenedProduct.supplier.instagram_username

          }

        }

      }

      return null;

    },

    avatarUrl(){

      if ( this.supplier !== null ) {

        return this.supplier.avatar_url || this.supplier.instagram_avatar_url

      }

      return null;

    },

    centerTextLink(){

      if ( this.supplierName !== null ) {

        return { name: "user", params: { id: this.supplierName } };

      }

      return null;

    }

  },

  watch: {

    $router(){


    }

  },

  beforeRouteEnter( { params: { id } } , to, next )  {

    store.dispatch('openProduct', +id ).then(()=>{

      next();

    });

  },

  canReuse( { to: { params: { id } } } ){
    this.openProduct( +id ).then( () => {
      this.$els.scrollCnt.scrollTop = this.getScrollTopOfProduct;
      this.$broadcast( 'update' )
    } );
    return true;
  },


  beforeDestroy(){
    this.scrollListener.remove();
    this.closeProduct();
    this.$store.state.products.authUserProduct = false;
  },

  components: {

   // RightNavComponent,
   // HeaderComponent,
    PostComponent

  },
}
</script>
