<template lang="pug">

#list

  header-component(:leftBtnShow="false")

    .search-text(slot="center-content")

      .search-input

        input(
          @click="$event.target.focus()",
          @keyup="search",
          ref="search",
          placeholder="..поиск",
          :value="searchValue")

        .s-icon(@click='search(), $refs.search.focus()')
          i.ic-search.__mirror



        .tags-count(v-if="selectedTagsId.length", @click="clear")
          span {{ selectedTagsId.length }}

        i.ic-close(v-if="selectedTagsId.length || searchValue", @click="clear")


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
    clear(){
      this.$store
        .dispatch('clearSearch')
        .then(()=>this.$refs.search.focus())
    }
  },
  computed: {
    ...mapGetters([
      'selectedTagsId',
      'tags',
      'searchValue'
    ])
  },
};

</script>

<style lang="postcss" >
@import 'style/vars/vars.pcss';

#list {

  .search-text {

    max-width: 1050px;
    height: 100%;
    text-align: right;
    flex-grow: 1;

    @media (--mobile) {
      flex-grow: 1;
    }

    .search-input {

      @media (--overmobile) {
        margin-top: 8px;
        position: relative;
        width: 250px;
        float: right;

      }

      @media (--mobile) {
        height: inherit;
        background: white;
      }

      input {

        display: inline-block;
        border-top: none;
        border-left: none;
        border-right: none;
        color: white;
        border-bottom: 1px solid white;
        font-size: $font__normal;
        background: $color__blue;
        font-family: $font__family__semibold;
        height: inherit;


        @media (--overmobile) {
          //transform: translateX(-45px);
          font-family: $font__family__light;
          float: left;
          width: 200px;
          &::placeholder {
            color: white;
            opacity: .5;
          }
        }

        @media (--mobile) {
          transform: translateX(-17px);
          color: $color__gray-dark;
          font-size: $font__large;
          width: 70%;
          display: block;
          margin-left: 120px;
          background: white;
        }


        &:focus {
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid white;
          outline: none;
        }

      }

      .tags-count {
        display: none;
        @media (--mobile) {
          position: absolute 20px 90px * * ;
          text-align: center;
          size: 50px;
          line-height: 50px;
          color: white;
          background: $color__red__true;
          border-radius: 50%;
          span {
            display: inline-block;
            font-size: $font__medium;

          }

        }
      }

      i.ic-close {
        display: inline-block;
        color: white;

        @media (--overmobile) {
          display: none;
        }
        @media (--mobile) {
          position: absolute  0 0 * *;
          padding: 28px;
          font-size: $font__medium;
          color: $color__gray-dark;
        }
      }

    }

    .s-icon {

      display: inline-block;
      color: white;
      cursor: pointer;
      font-size: $font__normal;
      //position: absolute 0 0 * *;
      @media (--overmobile){
        float: left;
        padding-left: 5px;
      }
      @media (--mobile){
        padding-right: 20px;
        color: $color__blue;
        font-size: $font__large;
        position: absolute 0 * * 0 ;
        width: 100px;
      }

      i {
        transform: rotate(90deg);
        padding: 5px;
        @media (--mobile){
          padding: 22px;
        }
      }
    }
  }
  .tags-wrap {
    border-top: 1px solid white;
    border-bottom: 1px solid white;
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
