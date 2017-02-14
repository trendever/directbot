<template lang="pug">

#toggle-role

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
      .bg-face-1
      .bg-face-2
      .screen
        span.screen-title ОТВЕЧАЕТ В INSTAGRAM DIRECT
        img(src="../img/screen-5.png")
      .sub-title Оператор ответит на вопросы и поможет купить
      .caption
        a.link-info(@click.stop="openPopup('is6')") Клиенты получат консультацию*
        span  в твоем #[br(v-if="isMobile")] Instagram Direct #[br(v-if="!isMobile")] и ссылку на товар #[br(v-if="isMobile")] в интернет-магазине**
      .tip-wrap
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
  created(){
    window.eventHub.$on('toggle-landing-buttons', data=>{
      this.yesScreen = data === 'yes';
      this.noScreen = data === 'no';
    })
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
    padding-bottom: 30px;
    position: relative;
    .bg-face-1 {
      position: absolute 100px 0px * * ;
      background-image: url(../img/faces-06.png);
      height: 100%;
      width: 360px;
      background-repeat: no-repeat;
    }

    .bg-face-2 {
      position: absolute 460px 0px 0px 0px;
      background-image: url(../img/faces-05.png);
      width: 180px;
      background-repeat: no-repeat;
    }
    .tip-wrap {
      text-align: center;
    }

    .sub-title {
      padding: 0 25px;

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

  .capton, .sub-title {
    width: 100%;
    text-align: center;
  }

}
</style>
