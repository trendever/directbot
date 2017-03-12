<template lang="pug">
#operator-skills

  .landing-title Преимущества Directbot

  .skills-wrapper


    .info-box.one
      .skills-icon
        img(src="../img/icon-1.png")
      .sub-title Создаёт заказы #[br] из Instagram
      .caption
        | Сканирует комментарии и сообщения,#[br]
        | находит клиентов и создаёт новый#[br]
        | заказ в CRM системе.&nbsp
        a.link-info(@click.stop="$parent.openPopup('is1')")
          | Вы не#[br]
          | пропустите ни одного покупателя#[br]

    .info-box.three
      .skills-icon
        img(src="../img/icon-3.png")
      .sub-title Интегрируется в #[br] Instagram Direct
      .caption
        | Больше не нужно "гнать" покупателей#[br]
        | из Instagram в WhatsApp или на сайт#[br]
        | магазина.&nbsp
        a.link-info(@click.stop="$parent.openPopup('is2')")
          | Теперь можно отвечать внутрь#[br]
          | Instagram, не выходя из CRM

    .info-box.four
      .skills-icon
        img(src="../img/privilege-01.png")
      .sub-title
        | Превращает Instagram#[br]
        | в&nbsp
        span.star-link(@click.stop="$parent.openPopup('is11')") интернет-магазин
      .caption
        | Зеркально скопирует ленту, но#[br]
        | добавит кнопку КУПИТЬ, названия#[br]
        | и цены. Магазин доступен#[br]
        | по ссылке внутри Instagram#[br]

    .info-box.two
      .skills-icon
        img(src="../img/icon-2.png")
      .sub-title Выполняет #[br]"мартышкин труд"
      .caption
        | Легко автоматизировать#[br]
        | стандартные вопросы и ответы,#[br]
        | такие как цена, адрес, условия#[br]
        | и модификации товаров и услуг#[br]


    .info-box.six
      .skills-icon
        img(src="../img/privilege-06.png")
      .sub-title Гарантирует #[br]  безопасность профиля
      .caption
        | Мы не храним пароль от Instagram #[br]
        | магазина, а наши алгоритмы  #[br]
        | обеспечивают&nbsp
        a.link-info(@click.stop="$parent.openPopup('is12')")
          | безопасность #[br]
          | от бана или блокировки

    .info-box.five
      .skills-icon
        img(src="../img/icon-6.png")
      .sub-title Организует работу #[br] с блогерами
      .caption
        | Умеет находить блогеров без ботов#[br]
        | и договариваться по бартеру.#[br]
        | Знает, как наполнять ленту#[br]
        a.link-info(@click.stop="$parent.openPopup('is13')")
          | магазина продающими фото

</template>

<script>

export default {

};

</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';


#operator-skills {

  margin: 0 auto;

  .save-experience {
    font-size: $font__family__semibold;
    font-size: 42px;
    color: #595959;
    margin-top: 20px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 40px;
  }


  span.star-link {

    border-bottom: 1px solid $color__gray-dark;
    &:hover {
      cursor: pointer;
    }
  }


  @media (--mobile) {
    .info-box{
      img { max-width: 400px !important };

      &.five img {
        max-width: 340px !important;
        min-width: 300px !important;
      }

      &.two img {
        max-width: 450px !important;
      }

      &.six img {
        max-width: 210px !important;
        min-width: 320px;
      }
    }
  }


  @media screen and (min-width: 1024px){
    .info-box{

      &.one img{
        max-width: 235px;
      }

      &.six img {
        max-width: 158px;
      }

      &.five img {
        max-width: 162px;
      }
      &.four img {
        max-width: 225px;
      }

      &.two img {
        max-with: 300px;
      }
      &.three {
        img { max-width: 212px }
        max-with: 300px;
      }
    }
  }
}

</style>

