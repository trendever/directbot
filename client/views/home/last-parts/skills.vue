<template lang="pug">
#slills
  .title Зачем нужен Directbot
  .info-blocks

    template(v-for="block, index in blocks")
      .block

        .image
          img(:src="block.image")

        .text
          span(@click="openedIndex = index" @mouseover="openedIndex = index ")
            p(v-html="block.text")
            p.overview(v-html="block.overview", :class="{opened: openedIndex === index}")



  slot(name="bottom")


</template>

<script>

export default {

  data () {
    return {
      openedIndex: null,
      blocks: [
        {
          image: require("./images/info_box_1.png"),
          text: `
            Организует продажи в<br class="desktop">
            Instagram,<br class="mobile"> чтобы вы не<br class="desktop">
            теряли клиентов<br class="mobile"> и<br class="desktop">
            контролировали результаты
          `,
          overview:`
            Автоматом создаёт чат-заказы в CRM<br class="desktop">
            с покупателями из Instagram. Обслуживайте<br class="desktop">
            клиентов совместно, не рискуя паролем,<br class="desktop">
            и отслеживайте статус выполнения заказов
          `
        },
        {
          image: require("./images/info_box_2.png"),
          text: `
            Продвигает Instagram<br class="desktop">
            органически,<br class="mobile"> заказывая<br class="desktop">
            контент и рекламу<br class="mobile"> у<br class="desktop">
            качественных блогеров
          `,
          overview: `
            Поможет массово создавать фото/видео<br class="desktop">
            с вашими товарами для ленты и рекламы.<br class="desktop">
            Подберет блогеров, проверит их аудиторию<br class="desktop">
            и договориться на выгодных условиях

          `
        },
        {
          image: require("./images/info_box_3.png"),
          text: `
            Превращает Instagram<br class="desktop">
            в<br class="mobile"> онлайн-магазин,<br class="desktop">
            доступный вашим<br class="mobile"> клиентам<br class="desktop">
            по короткой ссылке
          `,
          overview: `
            Трансформирует вашу Instagram-ленту<br class="desktop">
            в интуитивный онлайн-магазин с отзывами,<br class="desktop">
            телефоном и карточками товаров. Ваш<br class="desktop">
            сайт доступен по короткой<br class="mobile"> ссылке
          `
        }

      ]

    };
  }
};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';

#slills {

  max-width: 1050px;
  margin:  60px auto 0 auto;
  .title {
    font-size: 45px;
    font-family: $font__family__regular;
    text-align: center;
    padding: 30px 0;
    color: #595959;

    @media (--tabletandless){
      display: none;
    }
  }

}
.info-blocks {

  .block {
    display: flex;
    margin-bottom: 40px;
    & > div {
      flex:1;
    }
    .text {
      font-size: $font__normal;
      position: relative;
      span {
        padding-top: 70px;
        padding-left: 30px;
        padding-bottom: 70px;
        background: rgba(94, 139, 206,.8);
        display: block;
        margin: 0 auto;
        width: 400px;
        color: white;
        font-family: $font__family__semibold;
        top:50%;
        position: relative;
        transform: translateY(-50%);

        p.overview {
          transition: all .4s ease;
          height: 0px;
          overflow: hidden;
          font-family: $font__family__light;

          &.opened{
            height: 150px;
            overflow: visible;
          }
        }
      }
    }
    @media (--tabletandless){
      display: block;
      position: relative;
      .image img {
        width: 100%;
      }
      .text {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        span {
          background: rgba(94, 139, 206,.8);
          transform: translate(0,0);
          top:0;
          width: 100%;
          font-size: 36px;
          padding: 30px 0px;
          text-align: center;
        }
      }
    }


  }



}



</style>
