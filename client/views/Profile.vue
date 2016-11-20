<template lang="pug">
#profile
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


<style lang="postcss">
.chat-list {

    &.page {

      position: relative;
      height: 6000px

    }

    .home {

      position: fixed;
      top: 50%;

    }

    .chatone {

      position: fixed;
      top: 40%;

    }

}

</style>
