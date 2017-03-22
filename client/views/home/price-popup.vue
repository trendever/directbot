<template lang="pug">
#price-popup

  .background

  .price-title Сколько стоит Directbot?

  .wrap-block

    .price-image(v-if="!isMobile")
        img(src="./img/pop-up_chat-list001.png")

    .price-content

      .price-text
        | Доступ в панель Directbot стоит#[br]
        | 1200 руб. в месяц. Оттуда вы и ваша#[br]
        | команда можете сами отвечать клиентам#[br]
        | в Instagram. Пробуйте бесплатно!#[br]

      .price-image(v-if="isMobile")
        img(src="./img/pop-up_chat-list001.png", :class="{'instagram': isInstagram || isFacebook}")

      .price-caption

        | Либо попробуйте услуги#[br]
        | нашего оператора, который сам#[br]
        | обслуживает ваших клиентов.#[br]
        | Тарифы доступны после регистрации#[br]

      .price-button(@click.stop="$router.push({name: 'auth'})") ПОПРОБОВАТЬ БЕСПЛАТНО





</template>

<script>

export default {
  data(){
    return {
      isInstagram: window.browser.instagram,
      isFacebook: window.browser.facebook,
    }
  },
  created(){
    document.body.style.overflow = 'hidden';
  },
  beforeDestroy(){
    document.body.style.overflow = 'auto';
  },
  mounted(){
    let popup = this.$store.state.user.pricePopup;
    if(!popup){
      this.$store.state.user.pricePopup = true;
    }
  }
};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';

#price-popup {

  padding-top: 150px;
  color: white;
  font-family: $font__family__light;
  height: 100%;
  font-size: $font__normal;

  @media ( --mobile ) {
    padding-top: 40px;
    height: 100%;
    font-size: $font__medium;
  }


  .background {
    position: absolute * 0 0 0;
    z-index: -1;
    height: 100%;
    background: $color__dark-blue;

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
    padding: 0 0 24px 0;
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
      //padding-top: 100px;
    }

    @media (--mobile) {
      font-size: $font__medium;
      text-align: center;
      width: 100%;
    }

    @media screen and (max-height: 1350px){
      img.instagram {
        max-width: 450px;
      }
    }

    .price-text, .price-caption {
      padding: 24px 0;

/*       @media screen and (max-height: 1200px){
        padding-bottom: 8px;
        padding-top: 5px;
      } */

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


    @media screen and (min-width: 751px){
      &:hover {
        background: $color-orange-dark;
      }
    }

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
