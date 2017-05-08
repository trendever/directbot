<template lang="pug">
#product-detail
  header-component(
    :title='title',
    :center-text-link="centerTextLink",
    :page="page",
    :avatar-url='avatarUrl',
    :show-desktop-arrow="false",
    :back-function="back",
    :left-btn-show="true",
    :back-link="{name: 'user', params: { id: getOpenedProduct.supplier.instagram_username }}")

    .directbot-right-nav(slot="content")
      right-nav-component

    product-menu(slot="center-content").product-header

  .section.main.product
    .section__content
      post-component


</template>

<script type="text/babel">

import { mapGetters, mapActions } from 'vuex';
import store from 'root/store';

import RightNavComponent from 'components/right-nav';
import HeaderComponent from 'components/header/index.vue';
import PostComponent from './components/root/index.vue';
import productMenu from 'components/productmenu';



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
    back(){
      window.history.back();
    },
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

    '$route'(){

        store
          .dispatch('openProduct', +this.$route.params.id )
          .then(()=>{
            window.scrollTo(0,0);
          })


    }

  },

  beforeRouteEnter( { params: { id } } , to, next )  {

    store.dispatch('openProduct', +id ).then(()=>{

      next();

    });

  },

  beforeDestroy(){
    this.closeProduct();
    this.$store.state.products.authUserProduct = false;
  },

  components: {

    RightNavComponent,
    HeaderComponent,
    PostComponent,
    productMenu

  },
}
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';
.section__content {
    box-sizing: border-box;
    max-width: 1050px;
    margin: 0 auto;
    position: relative;
}

#product-detail {

  @media (--overtablet){
    .header__arrow {
      display: none;
    }

    #tags {
      //max-width: 413px;
      margin-left: 22px;
    }
  }

  @media (--tabletandless) {
    #tags{margin: 10px 0px;}
  }

}

</style>
