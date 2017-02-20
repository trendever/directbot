<template lang="pug">
#price-popup

  .price-title Сколько стоит Directbot?

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
  color: white;
  background: $color__dark-blue;
  height: 100%;
  font-size: $font__normal;


  @media ( --mobile ) {
    font-size: $font__medium;
  }

  .price-title {
    padding: 48px 0 24px 0;
    font-size: $font__large;
    text-align: center;
  }

  .price-content {

    text-align: left;
    @media (--mobile) {
      text-align: center;
    }

  }

  .price-button {
    text-align: center;
    color: black;

    font-size: $font__medium;
    background: $color-orange;
    @media (--mobile) {
      position: absolute * 0 0 0;
      height: 100px;
      width: 100%;
      line-height: 100px;
     }

  }

}
</style>
