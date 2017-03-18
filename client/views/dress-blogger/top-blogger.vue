<template lang="pug">
#top-blogger

  .brand-section
    img(src="./images/Trendever_logo.png" onclick="window.open('https://www.trendever.com')")
    .shops-btn МАГАЗИНАМ

  .body-section
    .title #ОденьБлогера
    .body
      h1 Фонд одевания блогеров
      p Приглашаем Instagram-блогеров#[br] одеваться за наш счет
      .go-btn УЧАСТВОВАТЬ

  .info-section
    | Раз в месяц несколько#[br.mobile] блогеров,#[br.desktop]
    | по решению#[br.mobile] жюри фонда,#[br.desktop]
    | получают#[br.mobile] сертификаты#[br.desktop]
    | от 2 000 до#[br.mobile] 80 000 руб.#[br.desktop]
    | на бесплатный#[br.mobile] шопинг#[br.desktop]
    | в Instagram


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

#top-blogger,
#blogger-request {

  .brand-section {
    height: 100px;

    img {
      cursor: pointer;
      margin-top: 15px;
      margin-left: 1%;
      display: inline-block;
      float:left;
      max-width: 150px;

      @media (--mobile ){
        margin-left: 37px;
        margin-top: 50px;
        max-width: 250px;
      }
    }

    .shops-btn {
      display: inline-block;
      float:right;
      margin-top: 15px;
      margin-right: 1%;
      font-size: 16px;

      @media (--overmobile) {
        width: initial;
        padding:10px 35px;
      }

      @media (--mobile){
        font-family: $font__family__thin;
        margin-right: 40px;
        margin-top: 53px;
        margin-left: 0;
        padding: 14px 0;
        width: 50%;
        font-size: 28px;
        border-radius: 10px;
        height: initial;
        line-height: initial;

      }

    }

  }

  .body-section {
    padding-top: 70px;

    .title {
      font-size: 60px;
      font-family: $font__family__semibold;
      padding-bottom: 20px;

      @media (--mobile){
        margin-top: 170px;
        font-size: 80px;
      }
    }

    .body {


      h1 {
        font-size: $font__medium;
      }
      p {
        font-family: $font__family__thin;
        font-size: $font__normal;
      }

      @media (--mobile) {
        h1 {
          font-size: $font__large;
          font-family: $font__family__semibold;
          margin-top: 50px;
        }
        p {
          margin-bottom: 50px;
          font-size: $font__medium;
        }
      }
    }
  }


  .info-section {
    padding-top: 135px;
    padding-bottom: 145px;
    font-size: $font__large;
    font-family: $font__family__semibold;
    background-image: url(./images/Bgr_clg-red-filter.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: -50px 0px;

    @media (--mobile){
      margin-top: 170px;
      margin-bottom: 30px;
      font-size: calc($font__large + 5px);
      background-position: -830px 0px;

    }

  }

}



</style>
