<style src="./style.pcss"></style>
<template lang="pug">
.advantages-plank.phone-background
  .title
    | Система
    | автоматизации#[br.mobile]
    | взаимодействия#[br.desktop]
    | с#[br.mobile] клиентами
    | и#[br.mobile] блогерами
  .body

    template(v-for="advantage, index in advantages", v-if="showAdvantage === index")

      .arrow-right.centered(@click="next(index)")
        i.ic-review_arrow_right

      .arrow-left.centered(@click="previous(index)")
        i.ic-review_arrow_right

      .plank

        .slider

          .image
            .wrap-hidden
              .wrap-images(
                :style="{ marginLeft: margin + 'px'}",
                :class="{'opacity-anim': anim}"
                )
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
            .brand-name
              .dots-action
                span(@click="selectAdvantage(0)", :class="{'choosen': index===0}") 1
                span(@click="selectAdvantage(1)", :class="{'choosen': index===1}") 2
                span(@click="selectAdvantage(2)", :class="{'choosen': index===2}") 3
                span(@click="selectAdvantage(3)", :class="{'choosen': index===3}") 4
                span(@click="selectAdvantage(4)", :class="{'choosen': index===4}") 5
              div(v-html="advantage.title")
            p(v-html="advantage.text")

</template>

<script>
export default {
  mounted(){
    this.runMiniSlider()
  },
  beforeDestroy(){
    if(this.timeId) clearInterval(this.timeId);
  },
  methods:{
    selectAdvantage(index){
      let scroll = document.body.scrollTop;
      this.showAdvantage=index;
      this.$nextTick(()=>{
        document.body.scrollTop = scroll;
      })
    },
    runMiniSlider(){
      if(this.timeId) clearInterval(this.timeId);
      this.timeId = setInterval(()=>{
        this.sliderRun = !this.sliderRun;
      },2500)
    },
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
      anim: false,
      timeId: {},
      margin: 0,
      sliderRun: false,
      showAdvantage: 0,
      advantages :[
        {
          title: "Создает заказы<br> из Instagram",
          text: `
            Автоматом создаёт чат-заказы в CRM<br class="desktop">
            с покупателями из Instagram. Обслуживайте<br class="desktop">
            клиентов совместно, не рискуя паролем,<br class="desktop">
            и отслеживайте статус выполнения заказов
          `
        },
        {
          title: "Организует работу<br> с блогерами",
          text: `
            Поможет массово создавать фото/видео<br class="desktop">
            с вашими товарами для ленты и рекламы.<br class="desktop">
            Подберет блогеров, проверит их аудиторию<br class="desktop">
            и договориться на выгодных условиях
          `
        },
        {
          title: "Интегрируется в<br> Instagram Direct",
          text: `
            Менеджеры магазина общаются<br class="desktop">
            с клиентами в Direct прямо из CRM.<br class="desktop">
            Не теряйте покупателей, которым неудобно<br class="desktop">
            писать в WhatsApp или переходить на сайт          `
        },
        {
          title: 'Выполняет <br> "мартышкин труд"',
          text: `
            Автоматизирует ответы на повторяющиеся<br class="desktop">
            вопросы, создает шаблоны ответов<br class="desktop">
            по товарам и пишет уведомления<br class="desktop">
            в комментариях под фото в Instagram
          `
        },

        {
          title: 'Превращает<br>Instagram в магазин',
          text: `
            Трансформирует вашу Instagram-ленту<br class="desktop">
            в интуитивный онлайн-магазин с отзывами,<br class="desktop">
            телефоном и карточками товаров. Ваш<br class="desktop">
            сайт доступен по короткой<br class="mobile"> ссылке
          `
        }

      ]
    };
  },
  watch:{
    sliderRun(val){
      if(val){
        this.anim=true
        setTimeout(()=>{
          this.anim=false
          this.margin = -this.$el.querySelector('.wrap-hidden').offsetWidth;
        },300)
      } else {
        this.anim=true
        setTimeout(()=>{
          this.anim=false
          this.margin = 0;
        },300)
      }
    },
    showAdvantage(){
      this.margin = 0;
      this.sliderRun = false;
    }
  },

};
</script>
<style lang="postcss">

@import 'style/vars/vars.pcss';

.advantages-plank {
  position: relative;
  background: transparent;
  height: 100%;
  width: 100%;

  .dots-action {
    position: absolute;
    right: 0;
    left: 0;
    top: 5px;
    width: 100%;
    @media (--overtablet){
      top: -69px;
      left: -15px;
    }

    @media (--tabletandless){
      position: relative;
      text-align: center;
      padding-top: 10px;
      padding-bottom: 10px;

    }
    span {

      cursor: pointer;
      display: inline-block;
      margin: 15px;
      size: 35px;
      line-height:33px;
      border: 1px solid $color__brand;
      border-radius: 50%;
      color: $color__brand;
      font-size: calc($font__normal);
      text-align: center;
      @media (--overtablet) {
        font-family: $font__family__light;
      }
      @media (--tabletandless){
        display:inline-block;
        font-size: calc($font__medium + 7px);
        border: 3px solid $color__brand;
        line-height:57px;
        top: 35px;
        margin-top: 10px;
        margin-left: 26px;
        margin-right: 26px;
        size: 65px;
      }
      &.choosen {
        background:$color__brand;
        color: white;
      }
    }
  }

  .body {
    position: relative;
  }

  button {
    outline: none;
    border:none;
    display: block;
    background: none;
  }

  .centered {
    @media (--overtablet){
      top: 294px;
    }
    @media (--tabletandless){
      top: 1200px;
    }

  }

  .title {
    //line-height: 55px;
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
}

</style>
