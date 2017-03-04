<style lang="postcss">
@import 'style/vars/vars.pcss';
.flex-tags {
  display: flex;
  flex-wrap: wrap;

  .tag-name {
    flex-grow: 1;
    font-size: $font__normal;
    padding: 5px 10px;
    border: 1px solid $color__blue;
    color: $color__blue;
    text-align: center;
    cursor: pointer;
    margin: 1px;
    border-radius: 4px;
    line-height: 100%;

    @media (--mobile){
      font-size: $font__large;
      padding: 10px 15px;
    }

    span {

      display: inline-block;
      transform: translateY(-4%);
      @media (--mobile){
        transform: translateY(-7%);
      }
    }

    &:hover {
      color: white;
      background: $color__blue;
    }

    &.selected {
      color: white;
      background: $color__blue;
    }

    i {
      display: inline-block;
      font-size: 14px;
      transform: translateY(6px);
      @media (--mobile){
        font-size: 26px;
        transform: translateY(12px);
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
          </span>
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
        //this.tags.filter(tag=> tag.name === this.searchString)
        return this.tags;
      },
    }
  }
</script>
