<template lang="pug">

#toggle-role

  .toggle-title

    | ЧТОБЫ УЗНАТЬ ДАЛЬНЕЙШИЕ#[br(v-if="isMobile")]  ДЕЙСТВИЯ ОПЕРАТОРА, #[br(v-if="!isMobile")]
    | СКАЖИТЕ, #[br(v-if="isMobile")] У ВАС ЕСТЬ ИНТЕРНЕТ-МАГАЗИН?

    .toogle-btns
      button(
        v-on:click="noScreen = false, yesScreen = true",
        :class="{ 'activeBtn': yesScreen }").yes.toggleBtn ДА
      button(
        v-on:click="yesScreen = false, noScreen = true",
        :class="{ 'activeBtn': noScreen }").no.toggleBtn НЕТ

  .toggle-box

    .wrap-yes(v-show="yesScreen")
      .wrap-flex
        .screen
          span.screen-title ИЗУЧИТ ТВОЙ #[br(v-if="!isMobile")] ИНТЕРНЕТ-МАГАЗИН
          img(src="../img/screen-3-yes.png")
        .screen
          span.screen-title УЗНАЕТ О ТОВАРАХ #[br(v-if="!isMobile")] ПО АРТИКУЛУ
          img(src="../img/screen-4-yes.png")
      .sub-title Есть сайт? Укажи артикул товара под постом
      .caption.fix-bottom Оператор узнает о деталях и наличии товара по артикулу в описании поста. #[br(v-if="!isMobile")] Ссылка на сайт должна быть #[br(v-if="isMobile")] в «био» инста-профиля

    .wrap-no(v-show="noScreen")
      .wrap-flex
        .screen
          span.screen-title СОЗДАСТ #[br(v-if="!isMobile")] ИНТЕРНЕТ-МАГАЗИН
          img(src="../img/screen-3-no.png")
        .screen
          span.screen-title СПРАШИВАЕТ #[br(v-if="!isMobile")] О ТОВАРАХ В ЧАТЕ
          img(src="../img/screen-4-no.png")
      .sub-title Нет сайта? Ответь на #[br(v-if="isMobile")] вопросы о товарах
      .caption.fix-bottom Оператор увидит посты в Instagram #[br(v-if="isMobile")] и добавит их в твой

        span
          a.link-info(@click.stop="openPopup('is5')")
          |  новый интернет-магазин #[br(v-if="!isMobile")] по ссылке
          span tskirt.drbt.io*. #[br(v-if="isMobile")]

        span Также уточнит детали и наличие товаров #[br]
        span *это ссылка на примере инстаграм-магазина tskirt


    .bottom-wrapper
      .screen
        span.screen-title ОТВЕЧАЕТ В INSTAGRAM DIRECT
        img(src="../img/screen-5.png")
      .sub-title Оператор ответит на вопросы и поможет купить
      .caption
        a.link-info(@click.stop="openPopup('is6')") Клиенты получат консультацию*
        span  в твоем #[br(v-if="isMobile")] Instagram Direct #[br(v-if="!isMobile")] и ссылку на товар #[br(v-if="isMobile")] в интернет-магазине**
      .tip *отслеживай диалог в кабинете или Instagram Direct
      .tip **еще можно покупать не выходя из Instagram Direct

</template>

<script>
export default {

  data () {

    return {
      noScreen: false,
      yesScreen: true
    };

  },

  methods:{

    openPopup(name){

      window.eventHub.$emit('open-landing-popup', name)

    }

  },

};
</script>

<style lang="postcss">

@import 'style/vars/vars.pcss';
#toggle-role {


  .bottom-wrapper{
    background: white;
    padding-bottom: 10px;
    .tip {
      text-align: center;
    }
  }
  .wrap-no, .wrap-yes {
    .caption, .sub-title {
      padding: 0 25px;

    }
  }
  .caption {
    text-align: center;
    padding: 10px 0;
    &.fix-bottom {
      padding-bottom: 30px;
    }
  }

  .toggle-title {

    background: white;
    text-align: center;
    color: $color__blue;
    font-family: $font__family__semibold;
    font-size: 24px;
    padding-top: 33px;
    padding-bottom: 40px;

    @media(--tabletandless) {
      font-size: 36px;
      padiing-top: 79px;
      padding-bottom: 36px;
    }


    button{
      display: inline-block;
      width: 122px;
      height: 40px;
      font-family: $font__family__light;
      color: $color__blue;
      background-color: transparent;
      border: 1px solid $color__blue;
      border-radius: 5px;
      font-size: 16px;
      vertical-align: super;
      @media(--tabletandless) {
        width: 330px;
        height: 64px;
        font-size: 28px;
        vertical-align: baseline;
      }

      &:hover{
        background-color: $color__blue;
        color: $color__white;
        cursor: pointer;
      }
      &:focus{
        background-color: $color__blue;
        color: $color__white;
        outline: none;
      }
      &:active{
        background-color: $color__blue;
        color: $color__white;
      }
      &.activeBtn{
        background-color: $color__blue;
        color: $color__white;
      }
    }
    .yes{
      margin-right: 10px;
      @media(--tabletandless) {
        margin-right: 30px;
      }
    }
  }


  .capton, .sub-title {
    width: 100%;
    text-align: center;
  }

}
</style>
