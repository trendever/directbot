<style src='./header.pcss'></style>
<template lang="pug">
#header
  slot
  .section.header.section__content
    .header__content.u-fixed
      .wrapper
        .header__arrow

          i.header__arrow__ic.ic-arrow-left

        .header__notify-count
          span

        .header__use-days
          .days-count
            span д


        .header__center
          .header__left-logo
           a
            img(src="../img/logo-main.svg")
          .header__text
          .header__text.active
            img.center-avatar
          slot

        slot

        .header-right
          img
</template>

<script>
export default {
  data () {
    return {

    };
  }
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
