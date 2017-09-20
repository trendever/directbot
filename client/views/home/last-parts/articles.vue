<template lang="pug">
#last-articles.phone-background

  template
    .hidden-images
      img(:src="firstImg")
      img(:src="secondImg")
      img(:src="thirdImg")
      //-img(:src="fourImg")
      //-img(:src="fiveImg")

  .title Отзывы клиентов
  .body

    template(v-for="article, index in articles", v-if="showIndex === index")

      template(v-if="!isMobile")

        .arrow-right.centered(@click="next(index)")
          i.ic-review_arrow_right

        .arrow-left.centered(@click="previous(index)")
          i.ic-review_arrow_right

      .plank

        .slider(@click="goShop")
          img(:src="article.img")

        .text
          button.button-wrapper
            //-.land__top-btn
              a(:href="storeWindow", target="_blank") посмотреть витрину
            .info
              .fix-it
                .category {{ article.category }}
                .brand-name(@click="goShop"): span {{ article.shop }}

              .wrap-arrows

                .arrow-right.centered(@click="next(index)")
                  i.ic-review_arrow_right

                .arrow-left.centered(@click="previous(index)")
                  i.ic-review_arrow_right


            button.w_p
              p(v-html="article.text")
              .ps(v-html="article.author")

  slot(name="bottom")

</template>

<script>

let firstImg = require('./images/review_narspi_shop_book_zoom.png');
let secondImg = require('./images/review_bella-fiori_book_zoom.png');
let thirdImg = require('./images/review_grideli_atelier_book_zoom.png');
let fourImg = require('./images/review_zharmoscow_brand.png');
let fiveImg = require('./images/review_sv_spoon.png')
export default {
  computed: {
    storeWindow(){
      let name  = this.shopName.replace('@','');
      return 'https://directbot.io/' + name;
    }
  },
  methods:{
    goShop(){
      window.open(this.storeWindow)
    },
    next(index){
      let scroll = document.body.scrollTop;

      if(index+1 >= this.articles.length){
        this.showIndex=0;
      } else {
        this.showIndex = index+1;
      }
      this.$nextTick(()=>{
        document.body.scrollTop = scroll;
      })
    },
    previous(index){
      let scroll = document.body.scrollTop;
      if(index-1 < 0){
        this.showIndex=this.articles.length-1;
      } else {
        this.showIndex = index-1;
      }
      this.$nextTick(()=>{
        document.body.scrollTop = scroll;
      })
    }
  },
  watch: {
    showIndex(val){
      this.shopName = this.articles[val].shop
    }
  },
  data () {

    return {
      firstImg,
      secondImg,
      thirdImg,
      fourImg,
      fiveImg,
      shopName: 'narspi_shop',
      timeId: {},
      sliderRun: false,
      showIndex: 0,
      articles:[
        {
          img: firstImg,
          shop: "narspi_shop",
          category: "Шубы и меховые жилеты",
          text: `
            "Когда пошли продажи и мы уже<br class="desktop"> собирались
            заняться созданием интернет-<br class="desktop"> магазина,
            один из наших покупателей<br class="desktop"> рассказал
            нам про сервис Directbot.
            Не<br class="desktop"> успели зарегистрироваться, как
            товары уже<br class="desktop"> начали добавляться из
            нашего Instagram в<br class="desktop"> наш новый интернет-магазин.
            Еще мы<br class="desktop"> пользуемся услугами Directbot
            по подбору блогеров по городам"
          `,
          author:'Катя,<br>Владелец бренда'
        },
        {
          img: secondImg,
          shop: "bella.fiori",
          category: "Цветочный бутик",
          text: `
            "Мы уже пользовались службой<br class="desktop"> мониторинга
            комментариев в Instagram,<br class="desktop"> когда подключились
            к Directbot. Ни у кого<br class="desktop"> больше нет интеграции
            с Instagram Direct.<br class="desktop"> А сервис аутсорсинга
            продаж за 3990 руб -<br class="desktop"> неслыханная щедрость.
            Также через<br class="desktop"> Directbot мы находим блогеров
            и<br class="desktop"> заказываем у них фото и рекламу"
          `,
          author:'Нарек,<br>Основатель и управляющий партнер'
        },
        {
          img: thirdImg,
          shop: 'grideli_atelier',
          category: 'Магазин одежды',
          text: `
            "Несмотря на то, что Instagram у нас не
            основной канал продаж, мы получаем<br class="desktop">
            оттуда стабильный поток клиентов без<br class="desktop">
            особых вложений. А подключив Direcbot по<br class="desktop">
            тарифу 3990 руб., мне больше не надо<br class="desktop">
            беспокоиться за качество и скорость<br class="desktop">
            обслуживания клиентов из Instagram. Плюс<br class="desktop">
            порадовала возможность сделать фото для<br class="desktop">
            ленты и рекламу у блогера, расплатившись<br class="desktop">
            своими же товарами"
          `,
          author: "Ольга,<br>Основатель и владелец бренда"
        },
        {
          img: fourImg,
          shop: 'zhar.moscow',
          category: 'Ресторан',
          text: `
            "Directbot полностью удовлетворяет потребности 
            ресторана ЖАРЪ по  присутствию в Instagram.
            Каждую неделю 3-5 блогеров приходят к нам
            на обед или ужин, делают видео, фото,
            размещают нативную рекламу в своей ленте и сториз. 
            Спасибо Directbot, что так тщательно подходит
            к отбору блогеров" 
          `,
          author: "Виктория,<br> глава PR отдела"
        },
        {
          img: fiveImg,
          shop: "sv_spoon",
          category: "Магазин детской одежды",
          text: `
            "Детская мода - очень популярна в Instagram. Раньше сотрудничества с блогерами-мамами, детскими стилистами и аудит отнимали много сил и времени. С появлением Directbot кратно выросло качество и снизились затраты на рекламу у блогеров и создание контента."
          `,
          author: "Елена,<br> глава отдела по маркетингу"
        }
      ]
    };
  }
};
</script>
<style lang="postcss">

@import 'style/vars/vars.pcss';

#last-articles {

  background: transparent;
  height: 100%;
  width: 100%;


  @media (--overtablet) {
    .slider img { width: 530px;}
    .text .wrap-arrows{display: none;}
    .fix-it {
      position: absolute 30px * * 30px;
    }
  }
    
  button.w_p {
    background: transparent;
    border: 0;
    outline: 0;
    color: white;
    @media (--overtablet){
      padding-left:0;
      padding-top: 130px;
    }

  }




  @media (--tabletandless) {
    .plank {
      overflow: visible;
      margin-top: 200px;
    }
    .slider{
      display: block;
      overflow: visible;
      height: 500px;
      img { width: 100%;}
    }

    .text {
      padding: 0;
      .button-wrapper {
        padding: 0;
        .info {
          position: relative;
          padding: 20px 0 40px 0;
          background:rgba(94, 139, 206,.8);
          color: white;

          [class^="arrow"] {
            top:0;
            position: relative;
            display: inline-block;
            color: white;
          }
          .wrap-arrows {
            display: block;
            position: absolute 56px 0 * 0;
            z-index: 100;
          }
          .arrow-left {
            float: left;
          }

          .arrow-right {
            float: right;
          }
        }
      }
    }
  }
  .hidden-images {
    max-width: 100px;
    position: absolute * 0 0 0;
    z-index: -10;
    opacity: 0;
  }

  .slider {
    text-align: center;

    @media (--overtablet){
      text-align: right;
    }
    img {
      display: inline-block;
      position: relative;
      top: 50%;
      transform: translateY(-50%);

      @media (--overtablet){
        width: 610px;
      }
    }
  }


  .centered {
    top: 330px;
    @media (--overtablet){
      top: 30px;
    }

  }

  .body {
    position: relative;
  }

  .button-wrapper {
    outline: none;
    border:none;
    display: block;
    background: none;
    position: relative;


    .land__top-btn {
      display: none;
      @media (--overtablet){
        display: inline-block;
        position: absolute * 10px -50px *;
        padding: 10px 20px;
        border-radius: 3px;
        text-transform: uppercase;
        color: whited;
        background: $color__brand;
        a {color: white;text-decoration: none};
        &:hover {
          color: $color__brand;
          background: white;
          cursor: pointer;
           a {color: $color__brand}
        }
      }
    }



  }

  .title {
    font-size: 60px;
    font-family: $font__family__regular;
    text-align: center;
    padding: 30px 0;
    color: $color__gray-dark;
    @media (--overtablet){
      font-family: $font__family__regular;
      font-size: $font__large;
    }

    @media (--tabletandless){
      padding: 30px 0 0 0;
      font-size: $font__medium;
      color: $color__brand;
      text-transform: uppercase;
      font-family: $font__family__semibold;
    }
  }

  .plank {


    .text {

      @media (--overtablet){
        padding-left: 10px;
        .button-wrapper {
          background: rgba(94, 139, 206,.8);
          color:white;
          padding-left: 30px;
          padding-right: 20px;
          height: auto;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          height: 600px;
          width: 550px;
        }
      }


      .button-wrapper, .wrap {

        .category {
          font-size: calc($font__normal + 4px);
          font-family: $font__family__semibold;
          @media (--tabletandless){
            text-align: center;
          }

        }

        .brand-name {
          display: block;
          color: white;
          font-size: calc($font__large + 10px);
          @media (--tabletandless){
            position: relative;
            max-width: 400px;
            margin: 0 auto;
            z-index: 105;
            font-family: $font__family__semibold;
            text-align: center;
          }

          span {
            cursor: pointer;
            //border-bottom: 2px solid rgba(255, 255, 255, 0.54);
          }
        }

        .ps {
          font-size: $font__normal;
          font-family: $font__family__light;
          padding-top: 20px;
        }


        @media (--tabletandless){
          .w_p {
            background: rgba(94, 139, 206,.8);
            color: white;
          }

          p {
            text-align: left !important;
            padding-left: 15px;
            padding-right: 15px;
          }
          .ps {
            font-size: $font__medium;
            padding-bottom: 50px;
            padding-left: 15px;
          }
          .category {
            font-size: calc($font__normal + 20px);
            font-family: $font__family__semibold;
            padding-top: 20px;
          }
        }
      }
    }
  }
}

</style>
