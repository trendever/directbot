<template lang="pug">
#bottom-blogger

  .info-area

    .img-content
      img.first(src="./images/ico_blogger1.png")
    .text-content
      h1 Избранные блогеры...
      p
        | ...выберут 5 Instagram-магазинов на свой#[br.mobile] вкус.#[br.desktop]
        | Затем попросят своих подписчиков#[br.mobile] проголосовать#[br.desktop]
        | за тот единственный,#[br.mobile] шопинг в котором оплатит#[br.desktop]
        | фонд#[br.mobile] #ОденьБлогера


  .info-area.reverse
    .text-content
      h1 Если вы не блогер,
      p
        | ...то наверно знаете блогера, которого#[br.mobile] вам не#[br.desktop]
        | терпится одеть. Расскажите ему#[br.mobile] про наш фонд или#[br.desktop]
        | напишите нам#[br.mobile] его имя на hello@trendever.com#[br.desktop]
    .img-content
      img(src="./images/ico_blogger2.png")


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

  @media (--mobile) {

    padding: 0 40px;

  }


  .info-area {

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 100px;

    @media (--mobile) {

      &.reverse {
        flex-direction: column-reverse;
      }
    }


    .img-content {
      flex-shrink: 1;
      img {
        max-width: 250px;
        @media (--mobile) {
          max-width: 450px;
        }

        &.first {
          @media (--overmobile) {
            margin-top: 15px;
          }
        }
      }
    }

    .text-content {
      flex-shrink: 3;
      text-align: left;


      h1 {
        font-family: $font__family__semibold;
        font-size: 32px;
        display: inline-block;
        margin-top: 20px;
        @media (--mobile) {
          width: 100%;
          font-size: 46px;
          text-align: center;
        }
      }

      p {
        margin-top: 7px;
        font-size: 24px;
        line-height: 32px;

        @media (--mobile) {
          font-size: 36px;
          line-height: normal;
        }
      }
    }
  }
}
</style>
