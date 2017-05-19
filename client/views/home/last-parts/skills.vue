<template lang="pug">
#slills
  .title Зачем нужен Directbot
  .info-blocks

    template(v-for="block, index in blocks")
      .block

        .image
          img(:src="block.image")

        .text

          span(@click="open(index)" @mouseover="openedIndex = index" @mouseleave="openedIndex=''")
            i.ic-info_icon
            .counter {{ index+1 + '/' + blocks.length }}
            p.first(v-html="block.text")
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

            Автоматом создаёт чат-заказы<br class="desktop"> из<br class="mobile">
            Instagram. Ускоряет<br class="desktop"> обслуживание<br class="mobile">
            покупателей,<br class="desktop"> пишет автосообщения<br class="mobile">
            в Direct<br class="desktop"> и комментарии. Сортирует<br class="mobile">
            заказы<br class="desktop"> по статусам в едином окне
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
            Поможет массово создавать<br> фото/видео
            с вашими товарами<br class="desktop"> для<br class="mobile"> ленты и рекламы.
            Подберет блогеров,<br class="mobile"> проверит их аудиторию<br>
            и договориться на выгодных<br class="desktop"> условиях

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
            Трансформирует Instagram-ленту<br class="desktop">
            в интуитивный онлайн-магазин<br class="desktop"> с отзывами,
            телефоном<br class="desktop"> и карточками товаров.<br class="desktop"> Ваш
            сайт доступен<br class="desktop"> по короткой ссылке
          `
        }

      ]

    };
  },
  methods:{
    open(index){
      if(this.openedIndex === index){
        this.openedIndex = null;
        return;
      }
      this.openedIndex = index;
    }
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
    @media (--overtablet) {
      height: 700px;
      .image {
        text-align: right;

        img {
          top:50%;
          position: relative;
          transform: translateY(-50%);
          width: 610px;
        }
      }
    }

    .text {
      font-size: $font__normal;
      position: relative;
      span {
        cursor: pointer;
        padding-top: 120px;
        padding-left: 30px;
        padding-bottom: 110px;
        background: rgba(94, 139, 206,.8);
        display: block;
        margin: 0 auto;
        width: 470px;
        color: white;
        font-family: $font__family__semibold;
        top:50%;
        position: relative;
        transform: translateY(-50%);

        @media (--overtablet){
          margin-left: 20px;
        }

        p.first {
          @media (--tabletandless){
            margin-bottom: 20px;
          }
          margin-bottom: 20px;
        }
        p.overview {
          transition: all .4s ease;
          height: 0px;
          overflow: hidden;
          font-family: $font__family__light;

          &.opened{
            height: 190px;
            @media (--tabletandless){
             height: 220px;
            }
          }
        }
        .counter {
          font-family: $font__family__light;
          position: absolute;
          top: 27px;
          left: 30px;
          font-size: 20px;
          @media (--tabletandless){
            font-size: $font__normal;
            top:20px;
            left: 20px;
          }
        }

        .ic-info_icon {
          display: inline-block;
          color: white;
          font-family: $font__family__light;
          position: absolute;
          top: 32px;
          right: 30px;
          font-size: 20px;
          @media (--tabletandless){
            font-size: $font__normal;
            top:20px;
            right: 20px;
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
          padding: 40px 0px;
          text-align: center;
        }
      }
    }
  }
}



</style>
