<template lang="pug">
.new-articles-plank
  .title Отзывы клиентов
  .body
    template(v-for="article, index in articles", v-if="showArticle === index")

      .arrow-right(@click="next(index)")
        i.ic-review_arrow_right

      .arrow-left(@click="previous(index)")
        i.ic-review_arrow_right

      .plank

        .slider

          .image

            .wrap-hidden

              .wrap-images(:style="{ marginLeft: margin + 'px'}")
                img(src='../articles/review_bella_scr_1_crop.jpg',
                  v-if="article.shop==='@bella.fiori' && this.isMobile")
                img(src='../articles/review_bella_scr_2_crop.jpg',
                  v-if="article.shop==='@bella.fiori' && this.isMobile")
                img(src='../articles/review_bella_scr_1.jpg',
                  v-if="article.shop==='@bella.fiori' && !this.isMobile")
                img(src='../articles/review_bella_scr_2.jpg',
                  v-if="article.shop==='@bella.fiori' && !this.isMobile")
                img(src='../articles/review_narspi_shop_1_crop.jpg',
                  v-if="article.shop==='@narspi_shop' && this.isMobile")
                img(src='../articles/review_narspi_shop_2_crop.jpg',
                  v-if="article.shop==='@narspi_shop' && this.isMobile")
                img(src='../articles/review_narspi_shop_1.jpg',
                  v-if="article.shop==='@narspi_shop' && !this.isMobile")
                img(src='../articles/review_narspi_shop_2.jpg',
                  v-if="article.shop==='@narspi_shop' && !this.isMobile")
                img(src='../articles/review_grideli_atelier_1_crop.jpg',
                  v-if="article.shop==='@grideli_atelier' && this.isMobile")
                img(src='../articles/review_grideli_atelier_2_crop.jpg',
                  v-if="article.shop==='@grideli_atelier' && this.isMobile")
                img(src='../articles/review_grideli_atelier_1.jpg',
                  v-if="article.shop==='@grideli_atelier' && !this.isMobile")
                img(src='../articles/review_grideli_atelier_2.jpg',
                  v-if="article.shop==='@grideli_atelier' && !this.isMobile")
        .text
          button
            .category {{ article.category }}
            .brand-name(@click="show(index)")
              | {{ article.shop }}
            p(v-html="article.text")
            .ps(v-html="article.author")
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

      if(index+1 >= this.articles.length){
        this.showArticle=0;
      } else {
        this.showArticle = index+1;
      }
      this.$nextTick(()=>{
        document.body.scrollTop = scroll;
      })
    },
    previous(index){
      let scroll = document.body.scrollTop;
      if(index-1 < 0){
        this.showArticle=this.articles.length-1;
      } else {
        this.showArticle = index-1;
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
      showArticle: 0,
      articles:[
        {
          shop: "@narspi_shop",
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
          shop: "@bella.fiori",
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
          shop: '@grideli_atelier',
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

.new-articles-plank {

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
      font-family: $font__family__regular;
      font-size: $font__large;
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
        .category {
          font-size: calc($font__normal + 4px);
          font-family: $font__family__semibold;
          @media (--tabletandless){
            text-align: center;
          }

        }

        .brand-name {
          font-size: calc($font__large + 10px);
          @media (--tabletandless){
            text-align: center;
          }
        }

        p, .ps {
          font-size: $font__normal;
          font-family: $font__family__light;
          padding-top: 20px;
        }


        @media (--tabletandless){
          .ps {
            padding-bottom: 50px;
          }
          .category {
            font-size: calc($font__normal + 20px);
            font-family: $font__family__semibold;
            padding-top: 20px;
          }

          .brand-name {
            font-size: calc($font__large + 30px);
          }

          p, .ps {
            font-size: $font__medium;
          }

        }
      }
    }

    .slider {
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
