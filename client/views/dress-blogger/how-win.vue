<template lang="pug">
#how-win
  .title-wrapper
    h1 Как понравиться жюри?

  .boxes-wrapper
    .info-box

      .box-icon
        img(src="")

      .sub-title
        | Будьте популярным#[br]
        | по-честному
      .caption
        | Ваши посты в Instagram#[br]
        | должны быть регулярными#[br]
        | и набирать не менее 400#[br]
        | «живых» лайков

    .info-box

      .box-icon
        img(src="")
      .sub-title
        | Ставьте наши хештеги#[br]
        | на свои посты
      .caption
        | Пишите под своими постами#[br]
        | #ОденьБлогера и @Trendevercom*.#[br]
        | Отмечайте новые посты, чтобы жюри их#[br]
        | заметили и оценили ваш стиль


    .info-box
      .box-icon
        img(src="")
      .sub-title
        | Подайте заявку#[br]
        | на участие
      .caption
        | Нажмите здесь на кнопку#[br]
        | Участвовать и укажите свое#[br]
        | Instagram-имя и телефон для#[br]
        | регистрации заявки

  .under-wrapper
    .ps-box *компания Trendever.com организатор и главный спонсор фонда №ОденьБлогера
    .place-btn УЧАВСТВОВАТЬ



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

  .title-wrapper h1 {
    font-size: 60px;
    font-family: $font__family__thin;
  }

 .boxes-wrapper {
    margin: 0 auto;
    max-width: 1280px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;


    .info-box {

      margin: 10px 15px;
      max-width: 600px;

      .sub-title {

        font-family: $font__family__semibold;
        font-size: 32px;
        display: inline-block;
        margin-top: 20px;

        @media(--mobile) {
          font-size: 46px;
        }

      }

      .caption {

        margin-top: 7px;
        font-size: 24px;
        line-height: 32px;

        @media(--tabletandless) {
          font-size: 36px;
          font-family: $font__family__light;
          line-height: normal;
        }
      }
    }
  }
}

</style>
