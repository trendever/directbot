<template lang="pug">
.wrap-advert#bottom-landing

  .advert-title
    | Менеджер который#[br.mobile]
    | за вас работает#[br]
    | с клиентами и#[br.mobile]
    | блогерами, стоит
  .advert-price
    span 3990#[br]
    | рублей в месяц*
  .advert-ps
    | *позвлоляет подключить до 5 менеджеров#[br.mobile] отдновременно



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
  padding: 60px 0;
  height: 400px;
  background: url(./img/blogger_girl_bgr_desk.jpg);
  background-size: cover;

  @media (--tabletandless){
    background: url(./img/blogger_girl_bgr_mob.jpg);
    height: 600px;
  }

}

</style>
