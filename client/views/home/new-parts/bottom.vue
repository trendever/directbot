<template lang="pug">
.wrap-advert.bottom-landing

  .advert-title
    | Менеджер, который#[br.mobile]
    | за вас работает#[br]
    | с покупателями и#[br.mobile]
    | блогерами, стоит от
  .advert-price
    span 3990
    i.ic-rub
    p в месяц


  slot(name="bottom")





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

.bottom-landing {
  padding: 45px 0;
  background: url(./img/blogger_girl_bgr_desk.jpg);
  background-size: cover;
  @media (--overtablet) {
    margin-top: 40px;
  }

  @media (--tabletandless){
    padding: 90px 0;
    background: url(./img/blogger_girl_bgr_mob.jpg);
    height: 697px;

  }

  .advert-title {
    font-size: $font__large;
    @media (--tabletandless){
      font-size: 60px;
    }
    @media (--overtablet){
      font-family: $font__family__light;
    }
  }

}

</style>
