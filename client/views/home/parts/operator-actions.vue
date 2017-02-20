<template lang="pug">
#operator-actions

  .bg-face-1
  .bg-face-2
  .bg-face-3

  .landing-title Что делает #[br(v-if="isMobile")] наш  оператор?

  .actions-body.wrap-flex
    .screen.one
      span.screen-title СКАНИРУЕТ #[br(v-if="!isMobile")] INSTAGRAM DIRECT
      img(src="../img/screen-1.png")

    .screen.two
      span.screen-title СКАНИРУЕТ #[br(v-if="!isMobile")] КОММЕНТАРИИ
      img(src="../img/screen-2.png")


  .actions-bottom
    .sub-title Оператор сразу видит #[br(v-if="isMobile")] вопросы покупателей
    .caption

      a.link-info(@click.stop="openPopup('is4')")
        | Не важно, задан вопрос в комментариях #[br(v-if="isMobile")]
        | или личном сообщении, #[br(v-if="!isMobile")]
      span
        | оператор #[br(v-if="isMobile")]
        | уже будет отвечать покупателю #[br(v-if="isMobile")]
        | в Direct от вашего имени

  .toggle-title

    | ЧТОБЫ УЗНАТЬ ДАЛЬНЕЙШИЕ#[br(v-if="isMobile")]  ДЕЙСТВИЯ ОПЕРАТОРА, #[br(v-if="!isMobile")]
    | СКАЖИТЕ, #[br(v-if="isMobile")] У ВАС ЕСТЬ ИНТЕРНЕТ-МАГАЗИН?

    .toogle-btns
      button(
        v-on:click="toggle('yes'),yesScreen = true, noScreen = false",
        :class="{ 'activeBtn': yesScreen }").yes.toggleBtn ДА
      button(
        v-on:click="toggle('no'),yesScreen = false, noScreen = true ",
        :class="{ 'activeBtn': noScreen }").no.toggleBtn НЕТ



</template>

<script>
export default {

  name: 'operator-actions',

  data () {
    return {
      noScreen: false,
      yesScreen: false
    };
  },
  methods:{
    toggle(name){
      window.eventHub.$emit('toggle-landing-buttons',name)
    },
    openPopup(name){
      window.eventHub.$emit('open-landing-popup',name)
    }
  }
};
</script>

<style lang="postcss">

@import 'style/vars/vars.pcss';

#operator-actions {

  position: relative;

  background: white;
  .landing-title {
    padding-bottom: 0;

  }

  .bg-face-1 {
    position: absolute 100px 0px * * ;
    background-image: url(../img/faces-03.jpg);
    height: 100%;
    width: 150px;
    background-repeat: no-repeat;
  }


  .bg-face-2 {
    position: absolute 443px 0px 0px 0px;
    background-image: url(../img/faces-04.png);
    width: 180px;
    background-repeat: no-repeat;
  }

  .bg-face-3 {
    position: absolute 700px 0px * * ;
    background-image: url(../img/faces-07.jpg);
    height: 100%;
    width: 200px;
    background-repeat: no-repeat;
  }

  .toggle-title {

    .toogle-btns {
      padding-top: 25px;
    }

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


 .actions-bottom {

  text-align: center;

  }

}


</style>
