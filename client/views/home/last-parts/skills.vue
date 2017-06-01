<template lang="pug">
#slills
  .title Зачем нужен Directbot
  .info-blocks

    template(v-for="block, index in blocks")

      .block(:class="{'top-margin': index > 0, 'stiker-point': index == 2 }")

        template(v-if="index == 2")
          a.header-sticker.no-desk(
            href="https://trendever.com", target="_blank",
            :class="{move: mobileSticker}")
            span.wrap
              | Подключайтесь и продавайте#[br]
              | на Trendever
              span(style="font-weight: bold") &nbspбесплатно


        .image
          img(:src="block.image")

        .text

          span(@click="open(index)",
            @mouseover="openedIndex = index",
            @mouseleave="openedIndex=''",
            :class="{ opened: openedIndex === index }")
            i.ic-info_icon
            .counter {{ index+1 + '/' + blocks.length }}
            p.first(v-html="block.text")
            p.overview(v-html="block.overview", :class="{opened: openedIndex === index}")

        i.ic-white_arrow_down.no-desk(
          v-if="openedIndex !== index",@click="open(index)")

  slot(name="bottom")


</template>

<script>
import listen from 'event-listener';
export default {

  mounted(){
    if(this.isMobile){
      this.scrl = listen(window,'scroll',()=>{

        let top = document.body.querySelector('.stiker-point').getBoundingClientRect().top

        if(top <= 780 && top >= 80 ){
          this.mobileSticker = false;
        } else {
          this.mobileSticker = true;
        }

      })
    }
  },
  beforeDestroy(){
    if(this.scrl) this.scrl.remove();
  },

  data () {
    return {
      mobileSticker: true,
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
            Трансформирует Instagram-ленту<br>
            в интуитивный онлайн-магазин<br> с отзывами,
            телефоном<br class="desktop"> и карточками товаров.<br class="desktop">
            Сайт адаптирован<br class="mobile"> под все<br class="desktop">
            размеры экранов
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

  max-width: 1500px;
  margin:  120px auto 0 auto;
  @media (--tabletandless){
    margin-top: 34px;
  }
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
      margin-bottom: 150px;
      margin-top: 50px;
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
        width: 550px;
        color: white;
        font-family: $font__family__semibold;
        top:50%;
        position: relative;
        transform: translateY(-50%);
        transition: all .4s ease;

        @media (--overtablet){
          //letter-spacing: 1px;
          padding-top: 60px;
          padding-bottom: 45px;
          margin-left: 20px;
          font-size: calc($font__normal + 7px);

          &.opened {
            padding-top: 120px;
            padding-bottom: 110px;
          }

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
            height: 240px;
            @media (--tabletandless){
             height: 240px;
            }
          }
        }
        .counter {
          font-family: $font__family__light;
          position: absolute;
          top: 24px;
          left: 30px;
          font-size: 20px;
          @media (--tabletandless){
            font-size: $font__normal;
            top:11px;
            left: 11px;
          }
        }

        .ic-info_icon {
          display: inline-block;
          color: white;
          font-family: $font__family__light;
          position: absolute;
          top: 26px;
          right: 30px;
          font-size: 20px;
          @media (--tabletandless){
            font-size: calc($font__normal + 2px);
            top:16px;
            right: 16px;
          }
        }
      }
    }
    @media (--tabletandless){
      display: block;
      position: relative;
      margin-bottom: 70px;

      &.top-margin {
        margin-top: 120px;
      }

      i.ic-white_arrow_down {
        color: white;
        display: inline-block;
        z-index:50;
        position: absolute;
        left: 50%;
        bottom: 12px;
        transform: translateX(-50%);
        font-weight: bold;
      }

      .image img {
        width: 100%;
        transform: translateY(-32px);
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
          padding: 30px 0px 15px 0px;
          text-align: center;

        }
      }
    }
  }
}



</style>
