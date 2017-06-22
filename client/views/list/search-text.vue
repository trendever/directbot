<template lang="pug">
.search-text(slot="center-content")

  .search-input

    input(
      @click="$event.target.focus()",
      @keyup="search",
      ref="search",
      placeholder="Поиск",
      :value="searchValue")

    .s-icon(@click='search(), $refs.search.focus()')
      i.ic-search.__mirror



    .tags-count(v-if="selectedTagsId.length", @click="clear")
      span {{ selectedTagsId.length }}

    i.ic-close(v-if="selectedTagsId.length || searchValue", @click="clear")

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'selectedTagsId',
      'searchValue',
    ])
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

  data () {
    return {

    };
  }
};
</script>

<style lang="postcss">

@import 'style/vars/vars.pcss';

.search-text {

  position: relative;
  max-width: 1050px;
  height: 100%;
  text-align: right;
  flex-grow: 1;

  @media (--tabletandless) {
    flex-grow: 1;
  }

  @media (--tabletandless) {
    //background: white;
    height: calc(1px + 100%);
  }

  .search-input {

    @media (--overtablet) {
      margin-top: 8px;
      position: relative;
      width: 250px;
      float: right;

    }

    @media screen and (min-width: 751px) and (max-width: 1400px) {
      margin-right: 160px;
    }

    @media (--tabletandless) {
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
      background: $color__brand;
      font-family: $font__family__semibold;
      height: inherit;


      @media (--overtablet) {
        //transform: translateX(-45px);
        font-family: $font__family__light;
        color: $color__brand;
        border-bottom: 1px solid  $color__brand;
        float: left;
        width: 200px;
        background: $color__header__bg;
        &::placeholder {
          color: $color__brand;
          opacity: .5;
        }
      }

      @media (--tabletandless) {

        border: none;
        transform: translate(-17px);
        color: $color__gray-dark;
        font-size: $font__large;
        font-family: $font__family__light;
        width: 70%;
        display: block;
        margin-left: 120px;
        background: white;
        height: 92px;
        padding-top: 3px;

      }


      &:focus {
        border-top: none;
        border-left: none;
        border-right: none;
        outline: none;
      }

    }

    .tags-count {
      display: none;
      @media (--tabletandless) {
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

      @media (--overtablet) {
        display: none;
      }
      @media (--tabletandless) {
        position: absolute  0 0 * *;
        padding: 24px;
        font-size: $font__medium;
        color: $color__gray-dark;
      }
    }

  }

  .s-icon {

    display: inline-block;
    cursor: pointer;
    font-size: $font__normal;
    //position: absolute 0 0 * *;
    @media (--overmobile){
      float: left;
      padding-left: 5px;
    }
    @media (--mobile){
      padding-right: 20px;
      color: $color__brand;
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
</style>
