<template lang="pug">

#center-landing.wrap-advert

  .advert-title Полный доступ#[br.mobile] к функционалу#[br] CRM Directbot стоит
  .advert-price
    span 590#[br]
    | рублей в месяц*
  .advert-ps *позволяет подключить до 5 менеджеров#[br.mobile] одновременно




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


.wrap-advert {
  text-align: center;
  color: white;
  font-family: $font__family__semibold;

  .advert-title {

    font-size: $font__large;
    @media (--tabletandless){
      font-size: 60px;
    }
    @media (--overtablet){
      font-family: $font__family__light;
    }
  }
  .advert-price {
    font-size: $font__normal;
    span {
      font-size: 90px;
    }
  }
  .advert-ps {
    padding-top: 10px;
    font-size: $font__normal;
    font-family: $font__family__light;
    @media (--overtablet){
      font-size: calc($font__normal - 4px);
    }
  }

}

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
  @media (--mobile){
    margin-top: 170px;
    margin-bottom: 30px;
    font-size: calc($font__large + 5px);
    background-position: -970px 0px;
  }
}
</style>
