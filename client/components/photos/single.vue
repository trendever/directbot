<style src="./style.pcss"></style>
<template lang="pug">
div.single-photo.photo__container(v-if='!error', @click="goToProduct")
  .photo__img-space
    img.photo__img(
        :src='thumb',
        v-on:load='showImage',
        v-on:error='loadError',
        v-bind:style='{ opacity: imageOpacity }',
        :class='{"animate": animate}'
      )
  .photo__description
    .photo__row.photo__title {{ title}}
    .photo__row
     .photo__summ(v-if="discountPrice")
      | {{ curency_spaces(discountPrice) }}
      i.ic-currency-rub
     .photo__shopTitle(:class="{'shot-text': userPage}") {{suppliername}}
</template>

<script type='text/babel'>

  import pluralize from 'pluralize-ru';
  import { urlThumbnail } from 'root/utils';
  import { curency_spaces } from 'root/filters';
  export default {

    data(){
      return {
        imageOpacity: 1,
        error: false,
      };
    },
    props: {
      product: {
        required: true,
      },
      animate: {
        default: true
      }

    },

    methods: {
      curency_spaces,
      goToProduct(){

        if(this.$route.name === 'list') {
          this.$router.push( {name: 'user', params: { id: this.product.shop.name }} )
          return;
        }

        this.$router.push( {name: 'product_detail', params: { id: this.product.id }} )

      },

      showImage(){
        this.imageOpacity = 1;
      },

      loadError(){
        this.error = true;
      }

    },

    computed: {
      thumb() {

        if (this.product && this.product.instagram_images) {
          if (window.browser.mobile){
            return this.product.instagram_images.find((img) => img.name === "S_square").url
          }else{
            return this.product.instagram_images.find((img) => img.name === "M_square").url
          }

        }

        if (this.product && this.product.images) {
          if (window.browser.mobile){
            return this.product.images.find((img) => img.name === "S_square").url
          }else{
            return this.product.images.find((img) => img.name === "M_square").url
          }
        }
      },
      classForColumn() {
        switch(this.count){
          case 2: return 'photo__container-two';
            break;
          case 3: return 'photo__container-three';
            break;
          default: return 'photo__container-three';
        }
      },
      discountPrice() {
        const items = this.product.items;
        if (items.length === 0) {
          return
        }
        if (items[0].discount_price) {
          return items[0].discount_price;
        } else if (items[0].price) {
          return items[0].price
        }
      },
      title() {
        const items = this.product.items;
        if (items.length === 0) {
          return this.product.title;
        } else if (items.length > 1) {
          return `${items[0].name} (+${pluralize(items.length-1, '', '%d товар', '%d товара', '%d товаров')})`
        }
        return items[0].name
      },
      userPage(){
        return this.$route.name === 'profile' || this.$route.name === 'user';
      },
      suppliername(){

        if(this.userPage){
          return this.product.caption ? this.product.caption : '';
        }
        if(this.product.shop){
          return this.product.shop.name;
        }
        return this.product.supplier.instagram_username;
      }
    }
  }
</script>

