<template lang="pug">
li.single-photo.flex-item(:class="className")
  img(:src="thumb" v-on:click="goToProduct")

</template>

<script>

export default {

  methods:{

    goToProduct(){

      this.$router.push( {name: 'product_detail', params: { id: this.product.id }} )

    }

  },
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
