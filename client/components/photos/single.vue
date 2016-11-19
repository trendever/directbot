<template lang="pug">

li.flex-item
 img(:src="thumb")

</template>

<script>
export default {

  mounted(){

    this.$nextTick(()=>{

      window.scrollTo(0,localStorage.getItem(`${this.$route.name}.scroll`));

    });
  },

  computed:{

    thumb(){

      let img = this.product.images.find(item=>{

        return item.name === 'S_square';
      })

      return img.url;

    }

  },
	props: ['product']
}
</script>
