<template lang="pug">

.video-slider
  .item
    .__play(@click="goMovie")
     i.ic-play
    .__description(@click="goMovie") (смотреть видео)
  .item
   img(src="views/list/img/slide_2.svg").image
   .__play(@click="goMovie")
    i.ic-play
  .item
   img(src="views/list/img/slide_3.svg").image
   .__play(@click="goMovie")
    i.ic-play


</template>

<script>
export default {

  name: 'slider',
  methods:{
    goMovie(){
      this.$router.push({name: 'video-trendever'})
    }
  },
  data () {
    return {

    };
  }
};
</script>

<style lang="postcss">
</style>
