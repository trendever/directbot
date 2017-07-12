<template lang="pug">
#popup-why(:style="style")
  .close-right: i.ic-close(@click="$router.push({name: 'home'})")
  .title Почему мы это делаем?


  .text

    .area.one
      p
        |  Россия ‒ вторая самая активная страна в#[br]
        |  Instagram (после США). За 2 года Instagram#[br]
        |  вырос в 2 раза до 600 млн активных#[br]
        |  пользователей в месяц. Причем#[br.mobile] аудитория в 19#[br.desktop]
        |  раз активнее, чем#[br.mobile] в Facebook/VK.

      p
        |  Поэтому мы фокусируемся только на#[br.mobile] Instagram#[br.desktop]
        |  и обеспечиваем комплексное#[br.mobile] продвижение и#[br.desktop]
        |  обслуживание магазинов#[br.mobile] в Instagram.


      .success

        p.no-bottom 90% успеха в Instagram определяется#[br] тремя факторами:

        ol.with-parentheses
          li продукт
          li контент
          li сервис

        p Directbot покрывает пункты 2 и 3.

    .area.two
      .more-info

        h1 Подробнее по пунктам:

        p
          |  2) Directbot найдет нужных вам блогеров#[br.mobile] по#[br.desktop]
          |  множеству параметров. Договориться,#[br.mobile] чтобы#[br.desktop]
          |  они сделали фото/видео-контент с#[br.mobile] вашим#[br.desktop]
          |  товаром или услугой + реклама.#[br.mobile] Обычно оплата#[br.desktop]
          |  по бартеру.


        p
          |  3) Directbot обеспечивает обслуживание#[br.mobile] ваших#[br.desktop]
          |  клиентов внутри Instagram, то есть#[br.mobile] там где#[br.desktop]
          |  клиенты задают вопрос. Не#[br.mobile] принуждая идти на#[br.desktop]
          |  сайт или писать в#[br.mobile] WhatsApp.

        p
          |  Оставшиеся 10% - это массфолоу,#[br.mobile] автолайки и#[br.desktop]
          |  платная реклама. Мы и это#[br.mobile] поможем настроить.

        p
          |  Мы нужны, чтобы вы могли#[br.mobile] сфокусироваться#[br.desktop]
          |  на качестве и дизайне#[br.mobile] своего продукта!

  .price от 590 руб. в месяц


  .wrap-button
    button(@click="$router.push({name: 'auth'})") Попробовать бесплатно

  .bottom.no-desk

</template>

<script>
export default {
  props:{
    show: {
      default: false
    }
  },
  mounted(){
    if(!this.isMobile){
      this.style = {
        height: document.body.scrollHeight + 'px'
      }
    }
  },
  data () {
    return {
      style: {},
      close: true
    };
  }
};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';

$margin__bottom: 20px;



#popup-why {

  background: $color__brand-dark;
  color: white;

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: $color-orange;
    text-transform: uppercase;
    font-family: $font__family__light;
    @media (--overtablet){
      border-radius: 5px;
      width: 420px;
      height: 77px;
      font-size: $font__normal;
      display: inline-block;
      margin-left: 50%;
      transform: translateX(-50%);
      margin-top: 40px;
    }
    @media (--tabletandless){
      position: fixed * 0 0 0;
      height: 100px;
      width: 100%;
      font-size: $font__medium;
    }
  }
  .bottom {
    height: 100px;
  }
  .success {

    ol.with-parentheses {
      counter-reset: myCounter;
      list-style: none;
    }

    ol.with-parentheses > li::before {
      content: counter( myCounter ) ') ';
      counter-increment: myCounter;
    }
    ol {
      list-style: initial;
    }
  }

  .more-info {
    h1 {
      font-family: $font__family__semibold;
      margin-bottom: 20px;

      @media (--tabletandless){
        margin-bottom: 35px;
      }
    }
  }

  .price {
    font-family: $font__family__semibold;
    font-size: $font__large;
    text-align: center;
  }

  @media (--overtablet){
    size: 100%;
    .wrap-button {
      background: $color__brand-dark;
      padding-bottom: 40px;
    }
    p {
      margin-bottom: $margin__bottom;
      &.no-bottom {
         margin-bottom: 0;
      }
    }
    .area {
      flex: 1;
      margin: 10px;

      &.two {
        p {
          margin-bottom: 13px;
        }
      }
    }
    .title {
      padding: 20px 0;
      margin-bottom: 20px;
      font-size: $font__large;
      text-align: center;
      font-family: $font__family__thin;
    }
    .text {
      display: flex;
      width: 1100px;
      font-size: $font__normal;
      margin: 0 auto;
    }
    ol {
      margin-bottom: $margin__bottom;
    }
  }

  @media (--tabletandless){
    padding-top: 20px;
    .text {
      font-size: $font__medium;
      padding-left: 20px;
    }

    .price {
      padding: 30px 0 40px 0;
    }
    p {
      margin-bottom: calc($margin__bottom + 10px);
      &.no-bottom {
         margin-bottom: 0;
      }
    }
    .area {
      flex: 1;
      margin: 10px;
    }
    .title {
      padding: 20px 0;
      margin-bottom: 20px;
      font-size: $font__large;
      text-align: center;
      font-family: $font__family__semibold;
    }
    ul {
      margin-bottom: calc($margin__bottom + 10px);
    }
  }

  .close-right {
    position: fixed 10px 10px * *;
    z-index: 210;
    padding: 15px;
    color: white;
    cursor: pointer;
    font-size: $font__normal;
    size: $font__normal;
    box-sizing: content-box;
    @media( --tabletandless ) {
      top: 15px;
      right: 15px;
      size: $font__medium;
      font-size: $font__medium;
    }
  }
}
</style>
