<template lang="pug">
#how-win
  .title-wrapper
    h1 Как понравиться жюри?

  .boxes-wrapper
    .info-box

      .box-icon
        img(src="./images/ico_how1.png")

      .sub-title
        | Будьте популярным#[br]
        | по-честному
      .caption
        | Ваши посты в Instagram#[br.desktop]
        | должны быть#[br.mobile] регулярными#[br.desktop]
        | и набирать не менее#[br.mobile] 400#[br.desktop]
        | «живых» лайков

    .info-box

      .box-icon
        img(src="./images/ico_how2.png")
      .sub-title
        | Ставьте наши хештеги#[br]
        | на свои посты
      .caption
        | Пишите под своими постами#[br]
        | #ОденьБлогера и @Trendevercom*.#[br]
        | Отмечайте новые посты, чтобы жюри #[br]
        | их заметили и оценили ваш стиль

      .ps-box.mobile
        | *компания Trendever.com организатор и главный спонсор #[br]
        | фонда #ОденьБлогера


    .info-box
      .box-icon
        img(src="./images/ico_how3.png")
      .sub-title
        | Подайте заявку#[br]
        | на участие
      .caption
        | Нажмите здесь на кнопку#[br.desktop]
        | Участвовать и#[br.mobile] укажите свое#[br.desktop]
        | Instagram-имя и телефон#[br.mobile] для#[br.desktop]
        | регистрации заявки

  .under-wrapper
    .ps-box.desktop *компания Trendever.com организатор и главный спонсор фонда #ОденьБлогера
    .place-btn УЧАСТВОВАТЬ



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
#how-win {

  padding-bottom: 50px;
  .ps-box {
    margin-bottom: 20px;

    &.desktop {
      @media ( --mobile ) {
        display: none;
      }
    }

    &.mobile {
      text-align: left;
      padding-top: 40px;
      font-size: calc($font__normal + 10%);
      @media ( --overmobile ) {
        display: none;
      }
    }
  }

  .title-wrapper h1 {
    font-size: 60px;
    font-family: $font__family__thin;
    padding-bottom: 50px;
  }

 .boxes-wrapper {
    margin: 0 auto;
    max-width: 1280px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;


    .info-box {

      margin: 10px 35px;
      max-width: 600px;

      @media (--mobile) {
        margin-bottom: 100px;
        max-width: 100%;
      }

      .box-icon img {
        max-width: 150px;
        @media (--mobile) {
          font-size: 46px;
          max-width: 350px;
        }
      }

      .sub-title {

        font-family: $font__family__semibold;
        font-size: 32px;
        display: inline-block;
        margin-top: 20px;

        @media (--mobile) {
          font-size: 46px;
        }

      }

      .caption {

        margin-top: 7px;
        font-size: 24px;
        line-height: 32px;

        @media (--mobile) {
          font-size: 36px;
          font-family: $font__family__light;
          line-height: normal;
        }

      }
    }
  }
}

</style>
