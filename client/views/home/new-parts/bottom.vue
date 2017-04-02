<template lang="pug">
.wrap-advert#bottom-landing

  .advert-title
    | Менеджер, который#[br.mobile]
    | за вас работает#[br]
    | с клиентами и#[br.mobile]
    | блогерами, стоит
  .advert-price
    span 3990
    i.ic-rub
    p в месяц





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

#bottom-landing {
  padding: 85px 0;
  height: 400px;
  background: url(./img/blogger_girl_bgr_desk.jpg);
  background-size: cover;

  @media (--tabletandless){
    padding: 90px 0;
    background: url(./img/blogger_girl_bgr_mob.jpg);
    height: 600px;
  }

}

</style>
