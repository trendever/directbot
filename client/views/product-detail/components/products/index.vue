<template>
  <div class="products" v-if="isName">
    <div class="name">{{name}}</div>
    <div class="numbers" v-if="!isNotPrice">
      <span class="price" v-if="price !== null && discountPrice !== null">{{ curency_spaces(price) }}</span>
      <span class="discountPrice" v-if="discountPrice !== null">{{ curency_spaces(discountPrice) }}</span>
      <span class="discountPrice" v-if="discountPrice === null && price !== null">{{ curency_spaces(price) }}</span>
      <i class="ic-currency-rub rub"></i>
    </div>
  </div>
</template>

<style src="./style.pcss" scoped lang="postcss"></style>

<script type="text/babel">
import { curency_spaces } from 'root/filters';

  export default {
    props: {
      name: {
        type: String,
        default: null
      },
      discountPrice: {
        type: Number,
        default: null
      },
      price: {
        type: Number,
        default: null
      },
    },
    methods:{
      curency_spaces

    },
    computed: {
      isName(){

        return this.name !== null;

      },
      isNotPrice(){

        return !!(this.discountPrice === null && this.price === null);

      }
    }
  }
</script>
