<template lang="pug">
#top-blogger

  .brand-section

    .shops-btn МАГАЗИНАМ

  .body-section
    .title #ОденьБлогера
    .body
      h1 Фонд одевания блогеров
      p Приглашаем Instagram-блогеров#[br]одеватьсяза наш счет
      .go-btn УЧАВСТВОВАТЬ

  .info-section
    | Раз в месяц несколько блогеров,#[br]
    | по решению жюри фонда,#[br]
    | получают сертификаты#[br]
    | от 2 000 до 80 000 руб.#[br]
    | на бесплатный шопинг в Instagram#[br]


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

#top-blogger {

  .body-section {
    padding-top: 60px;

    .title {
      font-size: 60px;
      font-family: $font__family__semibold;
      padding-bottom: 20px;
    }

    .body {
      h1 {
        font-size: $font__medium;
      }
      p {
        font-family: $font__family__thin;
        font-size: $font__normal;
      }
    }
  }


  .info-section {
    padding-top: 120px;
    padding-bottom: 90px;
    font-size: $font__large;
    font-family: $font__family__semibold;

  }

}



</style>
