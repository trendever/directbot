<template lang="pug">
#price-popup

  .price-title Сколько стоит Directbot?


  .wrap-block

    .price-image(v-if="!isMobile")
        img(src="./img/pop-up_chat-list001.png")

    .price-content

      .price-text
        | Доступ в панель Directbot стоит#[br.mobile]
        | 1990 руб. в месяц.#[br.desktop] Оттуда вы и ваша#[br.mobile]
        | команда можете сами отвечать#[br.desktop] клиентам#[br.mobile]
        | в Instagram. Пробуйте бесплатно!#[br.mobile]

      .price-image(v-if="isMobile")
        img(src="./img/pop-up_chat-list001.png")

      .price-caption

        | Либо попробуйте услуги#[br.mobile]
        | нашего оператора,#[br.desktop] который сам#[br.mobile]
        | обслуживает ваших клиентов.#[br]
        | Тарифы доступны после регистрации#[br.mobile]

  .price-button(@click.stop="$router.push({name: 'auth'})") ПОПРОБОВАТЬ БЕСПЛАТНО


</template>

<script>
export default {
  data(){
    return {

    }
  }
};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';

#price-popup {

  padding-top: 48px;
  color: white;
  font-family: $font__family__light;
  background: $color__dark-blue;
  height: 100%;
  font-size: $font__normal;

  @media ( --mobile ) {
    height: 100%;
    font-size: $font__medium;
  }



  .wrap-block {
    @media screen and (min-width: 751px){
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      > div {
        margin: 0 20px;
      }

      margin-top: 20px;
      margin-bottom: 100px;
    }
  }

  .price-image {
    text-align: center;
    img {
      max-width: 400px;
      width: 100%;
      @media (--mobile){
        max-width: 500px;
      }
    }
  }


  .price-title {
    padding: 24px 0 24px 0;
    font-size: $font__title;
    text-align: center;

    @media (--mobile){
      font-family: $font__family__semibold;
    }
  }

  .price-content {
    text-align: left;
    font-size: $font__normal;
    @media  screen and (min-width: 751px){
      padding-top: 100px;
    }

    @media (--mobile) {
      font-size: $font__medium;
      text-align: center;
      width: 100%;
    }

    .price-text, .price-caption {
      padding: 24px 0;
    }

  }

  .price-button {
    font-family: $font__family__light;
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
      position: fixed * 0 0 0;
      height: 100px;
      width: 100%;
      line-height: 100px;
    }
  }
}
</style>
