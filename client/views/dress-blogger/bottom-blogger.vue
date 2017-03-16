<template lang="pug">
#bottom-blogger

  .info-area

    .img-content
      img(src="")
    .text-content
      h1 Избранные блогеры...
      p
        | ...выберут 5 Instagram-магазинов на свой вкус.#[br]
        | Затем попросят своих подписчиков проголосовать#[br]
        | за тот единственный, шопинг в котором оплатит#[br]
        | фонд #ОденьБлогера


  .info-area
    .text-content
      h1 Если вы не блогер,
      p
        | ...то наверно знаете блогера, которого вам не#[br]
        | терпится одеть. Расскажите ему про наш фонд или#[br]
        | напишите нам его имя на hello@trendever.com#[br]
    .img-content
      img(src="")


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
#bottom-blogger {

  max-width: 980px;
  margin: 0 auto;


  .info-area {

    display: flex;
    flex-wrap: wrap;


    .img-content {
      flex-shrink: 1;
    }

    .text-content {
      flex-shrink: 3;
      text-align: left;


      h1 {
        font-family: $font__family__semibold;
        font-size: 32px;
        display: inline-block;
        margin-top: 20px;
        @media(--mobile) {
          font-size: 46px;
        }
      }

      p {
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
