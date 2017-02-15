<template lang="pug">
#operator-skills

  .landing-title Преимущества #[br(v-if="isMobile")] нашего оператора

  .skills-wrapper

    .info-box.four

      .skills-icon
        img(src="../img/privilege-03.png")
      .sub-title Превращает ленту instagram#[br] в интернет-магазин*
      .caption
        | Посты автоматом добавятся в базу,#[br]
        | а оператор напишет цены и названия#[br]
        | товаров. Сайт доступен по короткой#[br]
        | ссылке с любых устройств

    .info-box.five
      .skills-icon
        img(src="../img/icon-6.png")
      .sub-title Организует бартерную#[br] рекламу у блогеров
      .caption
        | Умеет находить блогеров без ботов#[br]
        | и договариваться по бартеру.#[br]
        | Знает, как сделать посты, которые#[br]
        | принесут реальных клиентов

    .info-box.one
      .skills-icon
        img(src="../img/icon-1.png")
      .sub-title Отвечает всем #[br] клиентам сразу
      .caption Со &#128526 смайлами #[br(v-if="!isMobile")]
        | уделит внимание каждому, #[br(v-if="!isMobile")] быстро ответит. #[br(v-if="isMobile")]
        a.link-info(@click.stop="$parent.openPopup('is1')") Ни один клиент #[br(v-if="!isMobile")] не успеет передумать

    .info-box.two
      .skills-icon
        img(src="../img/icon-2.png")
      .sub-title Выполняет #[br] «мартышкин труд»
      .caption
        | Больше не нужно отвечать #[br]
        | и спрашивать одно и то же. #[br]
        a.link-info(@click.stop="$parent.openPopup('is2')")
          | Оператор даст ссылку на сайт, уточнит  наличие, узнает размеры и адрес

    .info-box.three
      .skills-icon
        img(src="../img/icon-3.png")
      .sub-title Подключается #[br(v-if="!isMobile")] в один клик
      .caption Подключи нашего оператора #[br(v-if="!isMobile")] к своему  Instagram-магазину #[br(v-if="!isMobile")] в один клик. #[br]
        a.link-info(@click.stop="$parent.openPopup('is3')")
          | Ничего не надо скачивать

  .save-experience(v-if="isMobile")
    | ВАЖНО! Мы гарантируем  #[br(v-if="isMobile")]
    | безопасность аккаунта #[br(v-if="isMobile")]
    | магазина от блокировки #[br(v-if="isMobile")]
    | и не храним пароли


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
  @media (--mobile) {
    .info-box.five img {

        max-width: 350px !important;

    }

    .info-box img {
      max-width: 400px !important;
    }

    .info-box.two img {
      max-width: 450px !important;
    }
  }

  .info-box.three {
    img {
      max-width: 220px;
    }
  }

  .info-box.two {
    img {
      max-width: 250px;
    }
  }
  .info-box.one {
    img {
      max-width: 230px;
    }
  }

  @media screen and (min-width: 1024px){
    .info-box.five {
      img {
        max-width: 180px;
      }
    }
  }
}




</style>

