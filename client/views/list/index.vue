<template lang="pug">

#list
  .tags-wrap
    tags(:tags="tags")
  photos

</template>

<script>
import photos from 'components/photos';
import tags from 'components/tags';
import { mapGetters } from 'vuex';
export default {
  components: {
    photos,
    tags
  },
  created(){
    this.$store.dispatch('loadTags');
  },
  computed: {
    ...mapGetters([
      'tags'
    ])
  },
};

</script>

<style lang="postcss" >
.tags-wrap {
  position: fixed 0 0 * 0;
  width: 100%;
  z-index: 140;
  background: white;
  max-width: 1050px;
  margin: 0 auto;
}
</style>
