<template>
<div class="mobileLayout">
  <div class="fake-standalone-transparent" v-if="isStandalone"></div>
  <div class="wrapper" v-if="notFromUser">
      <user-info
        :img="avatarUrl"
        :code="code"
        :name="name"
        :last-update="lastUpdate"
      ></user-info>
      </div>
      <div class="picture-wrapper">
        <picture-component :img="picture"></picture-component>
      </div>
      <div class="wrapper">
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
        :auth-seller-product="isAuthUserProduct"
      ></buttons>
    </div>
  <div class="desc-wrapper">
    <description :text="caption"></description>
  </div>
  <tags :tags="tags"></tags>
</div>
</template>

<style src="./style.pcss" scoped lang="postcss"></style>

<script type="text/babel">

  import userInfo from '../user-info/index';
  import pictureComponent from '../picture/index.vue';
  import products from '../products/index.vue';
  import buttons from '../buttons/index.vue';
  import description from '../description/index.vue';
  import tags from 'components/tags';
  import { mapGetters, mapActions } from 'vuex';
  import * as userService from 'services/user';

  export default {

    data(){
      return {

        isSelfProduct: false,

      }

    },
    computed:{

      ...mapGetters([

        'isAuthUserProduct',
        'getOpenedProduct',
        'authUserId',
        'isFake'

      ]),

      notFromUser(){

        if (window.entryPoint == "user"){

          return false;

        }

        return true

      }
    },
    components: {
      userInfo,
      pictureComponent,
      products,
      buttons,
      description,
      tags
    },
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
  }
</script>
