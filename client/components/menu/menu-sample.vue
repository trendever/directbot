<template lang="pug">
#menu-sample(v-if="opened", @click="$emit('close')")
  .content
    slot
      template(v-if="false")
        .item
          .text Выход

</template>

<script>

  export default{
    props: {
      opened: {
        default: false
      }
    }
  }
</script>
<style lang="postcss">

@import 'style/vars/vars.pcss';

#menu-sample {

  &::after, &::before {
    transform: rotate(180deg);
  }

  &::before {
    content: '';
    position: absolute -13px 23px * *;
    size: 0;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-top: 13px solid $color__gray-light;

  }

  &::after {
    content: '';
    position: absolute -12px 23px * *;
    z-index: 9999;
    size: 0;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-top: 13px solid #F0F0F0;

  }


  box-sizing: border-box;
  border-radius: 5px;
  background: #ececec;
  position: absolute 60px 10px * * ;
  z-index: 150;
  height: auto;
  width: 210px;


  @media (--overtablet) {
    box-shadow: 1px 1px 5px #595959;
    z-index: 300;
    &.prof-menu {
      width: 242px;
    }
    &.product-menu {
      width: 275px;
    }
  }

  @media (--tabletandless) {
    margin-top: -1px;
    border-radius: 0px;
    position: fixed 0 0 * 0;
    z-index: 550;
    size: 100%;
    width: 100%;
    height: 100%;
    background: $color__brand-opacity;
  }

  .content {

    @media (--overtablet) {

      :first-child{
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
      }

      :last-child {
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
      }

    }


    .item {

      @media (--overtablet) {
        background: #F0F0F0;
        &:hover {

          cursor: pointer;
          .text {
            background: #F0F0F0;
            color: $color__brand;
          }
        }
      }

      font-family: $font__family__regular;
      text-align: left;
      font-size: 24px;
      line-height: 45px;
      height: 45px;

      @media (--mobile) {
        background: #dedede;
        padding-top: 1px;
        text-align: center;
        font-size: 36px;
        line-height: 97px;
        height: 97px;
      }

      .text {

        color: #595959;
        background: white;

        @media screen and (--overtablet){

          padding-left: 30px;

        }

        &.__txt-blue {
            color: $color__brand;
        }

        &.__txt-red {
            color: $color__red;
        }

        &.__txt-black {
            color: black;
        }
      }
    }
  }
}




</style>


