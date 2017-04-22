<style lang="postcss">
@import 'style/vars/vars.pcss';
.flex-tags {
  display: flex;
  flex-wrap: wrap;

  .tag-name {
    flex-grow: 1;
    font-size: calc($font__normal - 3px);
    padding: 8px 13px;
    border: 1px solid $color__brand;
    color: $color__brand;
    text-align: center;
    cursor: pointer;
    margin: 1px;
    border-radius: 4px;
    line-height: 100%;


    @media (--overtablet) {
      &:hover {
        color: white;
        background: $color__brand;
      }
    }

    @media (--tabletandless){
      font-size: calc($font__large - 8px);
      font-family: $font__family__thin;
      padding: 19px 15px;
    }

    span {
      text-transform: uppercase;
      display: inline-block;
    }



    &.selected {
      color: white;
      background: $color__brand;
    }

    i {
      display: inline-block;
      font-size: 15px;
      transform: translateY(3px);
      padding-left: 7px;
      @media (--tabletandless){
        display: none;
        font-size: 30px;
        padding-left: 5px;
        transform: translateY(4px);
      }
    }
  }
}

</style>

<template>
  <div id="tags">
    <div class="flex-tags">
      <template v-for="tag in filtredTags">
        <div class="tag-name"
          @click.stop="addTag(tag)"
          :class="{'selected': tag.active}">
          <span>{{tag.name}}</span>
          <i class="ic-close close"
            v-if="tag.active"
            @click.stop="delTag(tag)"></i>
        </div>
      </template >
    </div>
  </div>
</template>

<script type="text/babel">

  import store from 'root/store'

  export default {
    props: {
      tags: {
        type: Array,
        default: []
      },
      searchString: {
        type: String,
        default: ''
      },
      delTag: {
        type: Function,
        default: (tag) => {
          store.dispatch('removeTag', {tag})
        }
      },
      addTag: {
        type: Function,
        default: (tag) => {
          store.dispatch('selectTag', {tag})
        }
      }
    },

    computed: {
      filtredTags(){
        return this.tags;
      },
    }
  }
</script>
