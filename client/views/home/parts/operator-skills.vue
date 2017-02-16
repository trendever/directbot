<template lang="pug">
#operator-skills

  .landing-title Преимущества #[br(v-if="isMobile")] нашего оператора

  .skills-wrapper

    .info-box.four

      .skills-icon
        img(src="../img/privilege-01.png")
      .sub-title
        | Превращает Instagram#[br]
        | в&nbsp
        span.star-link(@click.stop="$parent.openPopup('is11')") интернет-магазин
      .caption
        | Посты автоматом добавятся в базу,#[br]
        | а оператор напишет цены и названия#[br]
        | товаров. Сайт доступен по ссылке#[br]
        | внутри Instagram


    .info-box.five
      .skills-icon
        img(src="../img/icon-6.png")
      .sub-title Организует бартерную#[br] рекламу у блогеров
      .caption
        | Умеет находить блогеров без ботов#[br]
        | и договариваться по бартеру.#[br]
        | Знает, как сделать посты, которые#[br]
        a.link-info(@click.stop="$parent.openPopup('is13')")
          | принесут реальных клиентов

    .info-box.one
      .skills-icon
        img(src="../img/icon-1.png")
      .sub-title Отвечает клиентам #[br] внутри Instagram
      .caption Со &#128526 смайлами #[br(v-if="!isMobile")]
        | уделит внимание каждому, #[br(v-if="!isMobile")] быстро ответит. #[br(v-if="isMobile")]
        a.link-info(@click.stop="$parent.openPopup('is1')") Ни один клиент #[br(v-if="!isMobile")] не успеет передумать

    .info-box.two
      .skills-icon
        img(src="../img/icon-2.png")
      .sub-title Выполняет #[br] «мартышкин труд»
      .caption
        | Не нужно отвечать и спрашивать#[br]
        | одно и то же.&nbsp
        a.link-info(@click.stop="$parent.openPopup('is2')")
          | Оператор даст#[br]
          | ссылку на сайт, уточнит  наличие,#[br]
          | узнает размеры и адрес

    .info-box.three
      .skills-icon
        img(src="../img/icon-3.png")
      .sub-title Подключается #[br(v-if="!isMobile")] в один клик
      .caption Подключи нашего оператора #[br(v-if="!isMobile")] к своему  Instagram-магазину #[br(v-if="!isMobile")] в один клик. #[br]
        a.link-info(@click.stop="$parent.openPopup('is3')")
          | Ничего не надо скачивать

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
        max-width: 350px !important;
      }

      &.two img {
        max-width: 450px !important;
      }

      &.six img {
        max-width: 230px !important;
      }
    }
  }


  @media screen and (min-width: 1024px){
    .info-box{
      &.six img {
        max-width: 160px;
      }

      &.five img {
        max-width: 170px;
      }
      &.four img {
        max-width: 230px;
      }

      &.two {
        max-with: 300px;
      }
      &.three {
        img{max-width: 210px}
        max-with: 300px;
      }
    }
  }
}

</style>

