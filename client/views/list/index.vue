<template lang="pug">

#list

  header-component(:leftBtnShow="false")

    .serch-text(slot="center-content")
      .s-icon(@click='search()')
        i.ic-search.__mirror
      .s-input
        input(
          @click="$event.target.focus()",
          @keyup="search",
          ref="search",
          :value="searchValue")

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
  methods: {
    search() {
      this.$store.dispatch('setSearchValue', this.$refs.search.value);
    },
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
  .serch-text {

      input {
        border-top: none;
        border-left: none;
        border-right: none;
        color: white;
        border-bottom: 1px solid white;
        font-size: $font__normal;
        background: $color__blue;
        font-family: $font__family__light;
        @media (--mobile) {
          font-size: $font__medium;
        }

        &:focus {
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid white;
          outline: none;
        }

      }

      > div {
        display: inline-block;
      }

      .s-icon {
        color: white;
        padding: 15px;
        font-size: $font__normal;
        @media (--mobile){
          font-size: $font__medium;
          padding: 20px;
        }
      }
  }
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
