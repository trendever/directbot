<template>
  <div class="desktopLayout"  ref="root">

    <div class="product" ref="product">

      <div class="leftSide" :style="leftSide">
        <picture :img="picture"></picture>
      </div>

      <div class="rightSide" :style="rightSide">

        <div class="userAndProducts">
          <user-info
            :img="avatarUrl"
            :code="code"
            :name="name"
            :last-update="lastUpdate"
          ></user-info>
          <template v-for="product of products">
            <products
              :name="product.name"
              :price="product.price"
              :discount-price="product.discountPrice"
            ></products>
          </template>
        <buttons
          :is-liked="isLiked"
          :product-id="productId"
          :supplier-available="supplierAvailable"
          :like="like"
          :buy="buy"
          :buy-promo-product="buyPromoProduct"
        ></buttons>
        </div>
        <div class="description-wrapper">
          <description :text="caption"></description>
        </div>
        <tags :tags="tags"></tags>
      </div>
    </div>
  </div>
</template>

<style src="./style.pcss" scoped lang="postcss"></style>

<script type="text/babel">
  import userInfo from '../user-info/index';
  import picture from '../picture/index.vue';
  import products from '../products/index.vue';
  import buttons from '../buttons/index.vue';
  import description from '../description/index.vue';
  import listener from 'event-listener';
  import tags from 'components/tags';


  export default {
    props: {
      products: {
        type: Array,
        default: []
      },
      tags: {
        type: Array,
        default: []
      },
      avatarUrl: {
        type: String,
        default: ''
      },
      code: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      lastUpdate: {
        type: String,
        default: ''
      },
      picture: {
        type: String,
        default: ''
      },
      caption: {
        type: String,
        default: ''
      },
      isLiked: {
        type: Boolean,
        default: false
      },
      supplierAvailable: {
        type: Boolean,
        default: false
      },
      productId: {
        type: Number,
        default: 0
      },
      like: {
        type: Function,
        default: () => {

        }
      },
      buy: {
        type: Function,
        default: () => {

        }
      },
      buyPromoProduct: {
        type: Function,
        default: () => {

        }
      },
      goToHome: {
        type: Function,
        default: () => {

        }
      }
    },
    mounted(){

      const resize = () => {

        const { offsetWidth } = this.$refs.root;
        const { clientWidth } = this.$refs.product;

        if ( offsetWidth => 750 ) {

          const widthLeft  = clientWidth * 0.6;
          const widthRight = clientWidth * 0.4;

          this.leftSide.width = `${ widthLeft >= 580 ? 580 : widthLeft }px` ;
          this.rightSide.width = `${ widthLeft >= 580 ? clientWidth - 580 : widthRight }px` ;

        }

      };

      this.layoutResize = listener( window, 'optimizedResize', resize );

      resize();

    },
    beforeDestroy(){
      this.layoutResize.remove();
    },
    data(){
      return {
        leftSide: {
          width: '100px'
        },
        rightSide: {
          width: '100px'
        }
      }
    },
    components: {
      userInfo,
      picture,
      products,
      buttons,
      description,
      tags
    }
  }
</script>
