<template lang="pug">
li.single-photo.flex-item(:class="className")
  router-link(:to="{name: 'profile', params: { id: product.shop.name } }")
    img(:src="thumb")
    | {{ product.shop.name }}


</template>

<script>
export default {

  computed:{

    thumb(){

      let img = this.product.images.find(item=>{

        return item.name === 'S_square';
      })

      return img.url;

    }

  },
	props: ['product', 'class-name']
}
</script>
