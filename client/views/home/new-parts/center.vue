<template lang="pug">

#center-landing.wrap-advert

  .advert-title Полный доступ*#[br.mobile] к функционалу#[br] CRM Directbot стоит
  .advert-price
    span 590
    i.ic-rub
    p в месяц
  .advert-ps
    | *позвлоляет подключить до 5 менеджеров#[br.mobile] отдновременно




</template>

<script>
export default {

  name: 'center',

  data () {
    return {

    };
  }
};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';


#center-landing {
  margin: 40px 0;
  background: url(./img/collage_blue.png);
  font-size: 45px;
  padding-top: 155px;
  padding-bottom: 170px;
  font-size: $font__large;
  font-family: $font__family__semibold;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: -50px 0px;
  @media screen and (min-width: 1400px){
    background-position: -10px 0px;
  }
  @media (--overtablet){
    margin-bottom: 0px;
  }
  @media (--tabletandless){
    margin-top: 45px;
    margin-bottom: 0px;
    font-size: calc($font__large + 5px);
    background-position: -970px 0px;
  }
}
</style>
