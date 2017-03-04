<template lang="pug">

#list
  header-component(:leftBtnShow="false")
  .tags-wrap
    tags-component(:tags="tags")
  .wrap-photos
    photos-component(:tags="true", :list-name="'list'")

</template>

<script>
import photosComponent from 'components/photos';
import tagsComponent from 'components/tags';
import headerComponent from 'components/header';
import { mapGetters } from 'vuex';
export default {
  components: {
    photosComponent,
    tagsComponent,
    headerComponent
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
@import 'style/vars/vars.pcss';
#list {

  .tags-wrap {

    position: relative;
    background: white;
    max-width: 1050px;
    margin: 50px auto 0 auto;
    @media (--mobile) {
      margin-top: 89px;
    }
  }

  .wrap-photos {
    clear: both;
  }

}
</style>
