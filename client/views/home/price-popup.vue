<template lang="pug">
#price-popup

  .price-title Сколько стоит Directbot?


  .wrap-block

    .price-content

      .price-text
        | Доступ в панель Directbot стоит#[br]
        | 1990 руб. В месяц. Оттуда вы и ваша#[br]
        | команда можете сами отвечать клиентам#[br]
        | в Instagram. Пробуйте бесплатно!#[br]

      .price-image


      .price-caption

        | Либо попробуйте услуги#[br]
        | нашего оператора, который сам#[br]
        | обслуживает ваших клиентов.#[br]
        | Тарифы доступны после регистрации#[br]

  .price-button ПОПРОБОВАТЬ БЕСПЛАТНО


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

#price-popup {
  padding-top: 48px;
  color: white;
  background: $color__dark-blue;
  height: 100%;
  font-size: $font__normal;


  @media ( --mobile ) {

    font-size: $font__medium;
  }
  .wrap-block {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .price-title {
    padding: 24px 0 24px 0;
    font-size: $font__large;
    text-align: center;
  }

  .price-content {

    text-align: left;
    @media (--mobile) {
      text-align: center;
      width: 100%;
    }

    width: 50%;

    .price-text, .price-caption {
      padding: 24px 0;
    }

  }

  .price-button {
    cursor: pointer;
    margin: 0 auto;
    text-align: center;
    color: black;
    font-size: $font__normal;
    background: $color-orange;
    position: relative;
    height: 75px;
    width: 420px;
    margin-top: 24px;
    line-height: 75px;
    border-radius: 5px;


    @media (--mobile) {
      font-size: $font__medium;
      position: absolute * 0 0 0;
      height: 100px;
      width: 100%;
      line-height: 100px;
    }
  }
}
</style>
