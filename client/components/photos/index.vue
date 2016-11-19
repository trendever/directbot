<template lang="pug">
div.photos
  ul.photos-flex
    template(v-for="photo in photos")
      single(:product="photo.data")
</template>

<script>

import single from './single.vue';
import * as products from 'services/products.js';

export default {
  data(){
    return {
      photos: [],
      scroll: 0
    }
  },
  mounted(){
    products.find({limit:50}).then(data=>{

      this.photos = data;

    })
  },
  components:{
    single
  }
}
</script>

<style type="pcss">
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
  justify-content: space-around;
 }

 .flex-item {
  //background: tomato;
  width: 50%;
  hegith: 400px;
  color: white;
  font-weight: bold;
  font-size: 3em;
  text-align: center;

  img {
    max-width: 200px;
  }
}


</style>
