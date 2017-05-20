<template lang="pug">

.wrap-advert.center-landing

  .advert-title Полный доступ#[br.mobile] к функционалу#[br.desktop] CRM Directbot стоит от
  .advert-price
    .c-element
      span 590
      i.ic-rub
    p в месяц
  //-.advert-ps
    | *позвлоляет подключить до 5 менеджеров#[br.mobile] отдновременно

  slot(name="bottom")


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


.center-landing {
  margin: 40px 0;
  background: url(./img/collage_blue.png);
  font-size: 45px;
  padding-top: 155px;
  padding-bottom: 170px;
  font-size: $font__large;
  font-family: $font__family__semibold;
  background-size: cover;
  background-repeat: no-repeat;
/*   @media screen and (min-width: 1400px){
    background-position: -10px 0px;
  } */

  @media screen and (min-width: 1720px){
    padding-bottom: 240px;
  }
  @media (--overtablet){
    //background-position: -50px 0px;
    background-position: 50% 50%;
    margin-bottom: 0px;
    max-height: 650px;
  }
  @media (--tabletandless){
    margin-top: 45px;
    margin-bottom: 0px;
    font-size: calc($font__large + 5px);
    background-position: -970px 0px;
    .advert-price .c-element {
      display: block;
    }
  }

}
</style>
