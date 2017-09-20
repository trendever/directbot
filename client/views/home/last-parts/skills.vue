<template lang="pug">
#skills
  .hole-wrap
    .title 3 функции Directbot
    .info-blocks

      .arrows
        .right(@click="move(true)")
          i.ic-review_arrow_right
        .left(@click="move(false)")
          i.ic-review_arrow_right

      //-.slide-screen(:style="{marginLeft: marginMove+'px'}")
      template(v-for="block, index in blocks")

        transition-group(:name="transName", tag="div")

          .block(
            key="block",
            v-if="showBlock(index)",
            :class="{'top-margin': index > 0, 'stiker-point': index == 2 }", 
            :data-index="index"
            ref="block")

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
                //-.counter.no-mob {{ words[index]+" функция" }}
                p.first(v-html="block.text")
                p.overview(v-html="block.overview", :class="{opened: openedIndex === index}")

            //-i.ic-white_arrow_down.no-desk(
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
        this.scrollBlocksAction()
      })
    }
  },
  beforeDestroy(){
    if(this.scrl) this.scrl.remove();
  },

  data () {
    return {
      currentIndex: 0,
      words:["Первая", "Вторая", "Третья"],
      mobileSticker: true,
      openedIndex: null,
      currentScrollIndex: null,
      marginMove: 0,
      transName: '',
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
            проверенных блогеров
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
    showBlock(index){
      if(this.isMobile) return true
      return index==this.currentIndex
    },
    scrollBlocksAction(i){
      this.$refs.block.forEach(i=>{
        let index = +i.getAttribute('data-index')
        let rect = i.getBoundingClientRect()
        let point = -500
        if(rect.top <= 20 && rect.top > point){
          if(this.openedIndex == index){
            return 
          } else {
            this.open(index)
            this.currentScrollIndex=index
          }
        }
        if(this.currentScrollIndex == index && rect.top < point){
          this.openedIndex = null
        } 
        if(this.currentScrollIndex == index && rect.top > 20){
          this.currentScrollIndex = null
          this.openedIndex = null
        }
      })
    },
    open(index){
      if(this.openedIndex === index){
        this.openedIndex = null;
        return;
      }
      this.openedIndex = index;
    },

    move(right){
      let width = this.$refs.block[0].offsetWidth
      if(right){
        this.transName = 'slide-left'
        if(this.currentIndex>=2){
          this.currentIndex=0
          return
        }
        this.currentIndex++
        //if(this.marginMove >= 0) return 
        //this.marginMove += width
      } else {
        this.transName = 'slide-right'
        if(this.currentIndex<=0){
          this.currentIndex=2
          return
        }
        this.currentIndex--
        //if(Math.abs(this.marginMove) >= width*2) return
        //this.marginMove -= width
      }
    }
  }
};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';


.slide-left-enter-active {
  transition: all .5s ease;
  position: absolute 84px 0 * 35px;
}
.slide-left-leave-active {
  transition: all .5s ease;
}

.slide-left-enter {
  transform: translate(100%, 0);
  opacity: 1;
}
.slide-left-leave-to {
  transform: translate(-100%, 0);
}

.slide-right-enter-active {
  transition: all .5s ease;
  position: absolute 84px 0 * 35px;
}
.slide-right-leave-active {
  transition: all .5s ease;
}

.slide-right-enter {
  transform: translate(-100%, 0);
  opacity: 1;
}
.slide-right-leave-to {
  transform: translate(100%, 0);
}


#skills {
  position: relative;
  width: 100%;
  @media (--tabletandless){
    margin-top: 34px;
  }

  .hole-wrap {
    max-width: 1500px;
    margin: 0 auto;
  }
  .title {
    font-size: 45px;
    font-family: $font__family__regular;
    text-align: center;
    padding: 30px 0;
    color: #595959;

    @media (--overtablet){
      padding-bottom: 0;
    }

    @media (--tabletandless){
      display: none;
    }
  }

}
.info-blocks {

  @media (--overtablet) {
    overflow: hidden;
    width: 1180px;
    margin: 0 auto;  
  }


  .arrows {

    @media (--tabletandless) {
      display: none;
    }
    display: block;
    i {
      color: $color__brand;
      font-size: 50px;
      font-weight: 900 !important;

    }
    

    .right {
      cursor: pointer;
      position: absolute;
  
      padding: 373px 40px 373px 100px;
      right: 10px;

    }
    .left {
      cursor: pointer;
      position: absolute;
      left: 10px;
      padding: 373px 40px 373px 100px;
      transform: scale(-1,1);
    }

  }

  .slide-screen {
    @media (--overtablet) {
      //width: calc(1180px * 3);
    }
    transition: all 0.4s ease;
  }

  .block {

    display: flex;
    margin-bottom: 40px;
    & > div {
      flex:1;
    
    }

    

    @media (--overtablet) {
      display: inline-flex;
      margin-bottom: 50px;
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
