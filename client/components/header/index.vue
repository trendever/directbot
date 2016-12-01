<style src='./header.pcss'></style>
<template lang="pug">
#header

  .section.header.section__content
    .header__content.u-fixed

      .wrapper


        .header__arrow(v-if="arrowLeft")
          i.header__arrow__ic.ic-arrow-left

        .header__notify-count(v-if="$route.name === 'chat_list'")
          span

        .header__center
          .header__left-logo
           a
            img
          .header__text
          .header__text.active
            img.center-avatar
          slot(name="center-content")


        .header-right
          img


        slot(name="content")


</template>

<script>
export default {
  props: {
    arrowLeft: {
      default: false,
    }
  },
};
</script>

<style lang="postcss">

@import 'style/vars/vars.pcss';

#header {

  position: relative;
  height: 50px;
  background: $color__blue;

}

</style>
