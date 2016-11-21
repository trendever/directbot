<template lang="pug">
#profile
  header-component
  h1 PROFILE
  photos(:shop-id="+$route.params.id || null")
</template>

<script>
import photos from '../components/photos/index';
import headerComponent from 'components/header';
export default {
  mounted(){

    this.$emit('setList',true);

  },
  components: {
    photos,
    headerComponent
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
