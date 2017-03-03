<template lang="pug">

#list
  .tags-wrap
    tags(:tags="tags")
  .wrap-photos
    photos(:tags="true", :list-name="'list'")

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
#list {

  .tags-wrap {
    position: relative;
    background: white;
    max-width: 1050px;
    margin: 0 auto;
  }

  .wrap-photos {
    clear: both;
  }

}
</style>
