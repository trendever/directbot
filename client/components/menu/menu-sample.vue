<template lang="pug">
#menu-sample(v-if="opened", @click="$emit('close')")
  .content
    slot
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

  @media (--mobile) {

    position: fixed 0 0 * 0;
    z-index: 120;
    size: 100%;
    width: 100%;
    height: 100%;
    background: rgba(94, 139, 206,.6);

  }

  .content {

    .item {

      font-family: $font__family__regular;
      text-align: center;
      background: white;

      @media (--mobile) {
        font-size: 36px;
        line-height: 97px;
        height: 97px;
      }

      .text {

        color: #595959;

        &.__txt-blue {
            color: $color__blue;
        }
        &.__txt-red {
            color: $color__red;
        }

      }
    }
  }
}




</style>


