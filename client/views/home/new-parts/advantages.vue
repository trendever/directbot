<template lang="pug">
.advantages-plank
  .title Система#[br.mobile] автоматизации#[br.mobile] взаимодействия#[br] с клиетами#[br.mobile] и блогерами
  .body

    template(v-for="advantage, index in advantages", v-if="showAdvantage === index")

      .arrow-right(@click="next(index)")
        i.ic-review_arrow_right

      .arrow-left(@click="previous(index)")
        i.ic-review_arrow_right

      .plank

        .slider

          .image
            .wrap-hidden
              .wrap-images(:style="{ marginLeft: margin + 'px'}")
                img(src='./img/iPhone_1200_01-1.jpg',
                  v-if="index===0")
                img(src='./img/iPhone_1200_01-2.jpg',
                  v-if="index===0")
                img(src='./img/iPhone_1200_05-1.jpg',
                  v-if="index===1")
                img(src='./img/iPhone_1200_05-2.jpg',
                  v-if="index===1")
                img(src='./img/iPhone_1200_02-1.jpg',
                  v-if="index===2")
                img(src='./img/iPhone_1200_02-2.jpg',
                  v-if="index===2")
                img(src='./img/iPhone_1200_04-1.jpg',
                  v-if="index===3")
                img(src='./img/iPhone_1200_04-2.jpg',
                  v-if="index===3")
                img(src='./img/iPhone_1200_03-1.jpg',
                  v-if="index===4")
                img(src='./img/iPhone_1200_03-2.jpg',
                  v-if="index===4")
        .text
          button
            .brand-name(@click="next(index)")
              div(v-html="advantage.title")
            p(v-html="advantage.text")
</template>

<script>
export default {
  mounted(){
    this.timeId = setInterval(()=>{
      this.sliderRun = !this.sliderRun;
    },3000)
  },
  beforeDestroy(){
    clearInterval(this.timeId)
  },
  methods:{
    next(index){
      let scroll = document.body.scrollTop;
      if(index+1 >= this.advantages.length){
        this.showAdvantage=0;
      } else {
        this.showAdvantage = index+1;
      }
      this.$nextTick(()=>{
        document.body.scrollTop = scroll;
      })
    },
    previous(index){
      let scroll = document.body.scrollTop;

      if(index-1 < 0){
        this.showAdvantage=this.advantages.length-1;
      } else {
        this.showAdvantage = index-1;
      }
      this.$nextTick(()=>{
        document.body.scrollTop = scroll;
      })
    }
  },
  data () {
    return {
      margin: 0,
      sliderRun: false,
      showAdvantage: 0,
      advantages :[
        {
          title: "Создает заказы<br> из Instagram",
          text: `
            Бот сразу находит покупателей и создает<br>
            с ними чат-заказы в CRM. Обслуживайте<br>
            клиентов в Instagram совместно, не рискуя<br>
            паролем или отслеживайте статус выполнения<br>
            заказов
          `
        },
        {
          title: "Организует работу<br> с блогерами",
          text: `
            Поможет массово создавать фото/видео<br>
            с вашими товарами для ленты и рекламы.<br>
            подберет качественных блогеров<br>
            и договорится на выгодных условиях.
          `
        },
        {
          title: "Интегрируется в<br> Instagram Direct",
          text: `
            Менеджеры магазина общаются<br>
            с клиентами в Direct прямо из CRM.<br>
            Не теряйте покупателей, которым не удобно<br>
            писать в WhatsApp или переходить на сайт          `
        },
        {
          title: 'Выполняет <br> "мартышкин труд"',
          text: `
            Автоматизирует ответы на повторяющиеся<br>
            вопросы и пишет уведомления об этом<br>
            в комментариях под фото в Instagram
          `
        },
        {
          title: 'Превращает Instagram<br> в магазин',
          text: `
            Трансформирует вашу Instagram-ленту,
            в интуитивный онлайн-магазин,
            доступный по короткойссылке
          `
        }

      ]
    };
  },
  watch:{
    sliderRun(val){
      if(val){
        this.margin = -this.$el.querySelector('.wrap-hidden').offsetWidth;
      } else {
        this.margin = 0;
      }
    }
  },

};
</script>
<style lang="postcss">

@import 'style/vars/vars.pcss';

$tablet_width: 484px;
$pc_width: 262px;

.arrow-right, .arrow-left {
  font-size: 50px;
  position: absolute;
  top:1000px;
  color: $color__brand;
  padding: 20px;
  cursor:pointer;
  z-index: 400;

  @media (--overtablet){
    top:240px;
    padding: 20px 40px;
  }
}
.arrow-right {
  right: 10px;
}

.arrow-left {
  left: 10px;
  transform: rotate(180deg) translateY(10px);
}

.advantages-plank {
  position: relative;
  background: transparent;
  height: 100%;
  width: 100%;
  .body {
    position: relative;
  }

  button {
    outline: none;
    border:none;
    display: block;
    background: none;
  }

  .title {
    font-size: 60px;
    font-family: $font__family__regular;
    text-align: center;
    padding: 30px 0;
    color: $color__gray-dark;

    @media (--overtablet){

      font-size: $font__large;
      padding-top: 180px;
    }

  }

  .plank {
    display: flex;
    flex-wrap: wrap;

    & > div {
      width: 50%;
      height: 700px;
      @media (--tabletandless){
        height: 970px;
        width: auto;
        min-width: 750px;
      }
    }

    .text {

      text-align: left;
      padding-left: 25px;
      color: $color__gray-dark;
      max-width: 550px;

      @media (--tabletandless) {
        padding-right: 25px;
        height: auto;
      }

      button, .wrap {
        height: 100%;
        text-align: left;
        color: $color__gray-dark;
        font-family: $font__family__light;

        .brand-name {
          font-size: calc($font__large + 10px);
          font-family: $font__family__regular;
          font-size: $font__large;
          @media (--tabletandless){
            text-align: center;


            div {
              font-family:$font__family__semibold;
              font-size: 60px;
            }
          }
        }

        p {
          font-size: $font__normal;
          font-family: $font__family__light;
          padding-top: 20px;
        }


        @media (--tabletandless){

          .brand-name {
            font-size: calc($font__large + 30px);
          }

          p {
            font-size: $font__medium;
          }

        }
      }
    }

    .slider {
      position: relative;
      .image {
        background-image: url(../articles/scr_iphone_full.png);
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: 50%;
        float: right;
        width: 400px;
        height: 100%;

        .wrap-hidden {
          overflow: hidden;
          @media (--tabletandless){
            transform: translate(121px,150px);
            width: $tablet_width;
            height: 810px;
          }
          @media (--overtablet){
            transform: translate(63px,116px);
            width: $pc_width;

          }

        }

        .wrap-images {
          transition: all .4s;
          @media (--tabletandless){
            width: calc($tablet_width * 2);
          }
          @media (--overtablet){
            width: calc($pc_width * 2);
          }
        }

        img {
          @media (--tabletandless){
            width: $tablet_width;
          }
          @media (--overtablet){
            width: $pc_width;
          }
        }

        @media (--tabletandless){
          width: 100%;
          background-image: url(../articles/scr_iphone_crop.png)
        }
      }
    }
  }
}

</style>
