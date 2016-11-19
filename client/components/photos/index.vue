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
  background: tomato;
  width: 50%;
  hegith: 400px;
  color: white;
  font-weight: bold;
  font-size: 3em;
  text-align: center;
}


</style>




<template lang="pug">
div.photos
	ul.photos-flex
		template(v-for="photo in photos")
			single(:product="photo")
</template>

<script>
import single from './single.vue';
import * as products from 'services/products.js';

export default {
	data(){
		return {
			photos: [1,2,3,4,5,6,7,8,9,10,11,12,123,124,124,12,4,123,,123,123,12,3,123,12,31,45,12,51,2,34,12,4,124,12,4,124,12,4,123,3,3,12,3,12,3,12,3,123,12,5,12,5,12,3,13,2,3,123,,123,1231,23,123,1,23]
		}
	},
	components:{
		single
	}
}
</script>