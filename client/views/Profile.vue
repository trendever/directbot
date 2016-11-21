<template lang="pug">
#profile
  h1#test PROFILE
  photos(:shop-id="+$route.params.id || null")
</template>

<script>
import photos from '../components/photos/index';
export default {
  mounted(){

    this.$emit('setList',true);

  },
  components: {
    photos
  },
}
</script>

<style src='./css/profile.pcss'></style>