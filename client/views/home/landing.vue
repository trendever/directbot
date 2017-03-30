<style src="./style.pcss"></style>
<style lang="postcss">

@import 'style/vars/vars.pcss';
$tablet_width: 484px;
$pc_width: 262px;
  .articles-plank {
    background: white;
    height: 100%;
    width: 100%;
    @media (--overtablet){

    }

    .arrow-right {
      display: inline-block;
      float: right;
      color: $color__brand;
      padding: 20px;
    }

    button {
      outline: none;
      border:none;
      display: block;
      background: none;
    }

    .title, .plank {

    }

    .title {
      font-size: 60px;
      font-family: $font__family__thin;
      text-align: center;
      padding: 30px 0;
      color: $color__gray-dark;

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

          }

          .brand-name {
            font-size: calc($font__large + 10px);
            font-family: $font__family__thin;
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
          background-image: url(./articles/scr_iphone_full.png);
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
            background-image: url(./articles/scr_iphone_crop.png)
          }
        }
      }
    }
  }

</style>
<template lang="pug">
#landing

  router-view

  .top-landing-background

  landing-top
  who-need
  show-bot
  operator-skills

  .articles-plank
    .title Отызывы клиентов
    .plank(v-for="article, index in articles", v-if="showArticle === index")
      .slider
        .image
          .wrap-hidden
            .wrap-images(:style="{ marginLeft: margin + 'px'}")
              img(src='./articles/review_bella_scr_1_crop.jpg', v-if="article.shop==='@bella.fiori' && this.isMobile")
              img(src='./articles/review_bella_scr_2_crop.jpg', v-if="article.shop==='@bella.fiori' && this.isMobile")
              img(src='./articles/review_bella_scr_1.jpg', v-if="article.shop==='@bella.fiori' && !this.isMobile")
              img(src='./articles/review_bella_scr_2.jpg', v-if="article.shop==='@bella.fiori' && !this.isMobile")
              img(src='./articles/review_narspi_shop_1_crop.jpg', v-if="article.shop==='@narspi_shop' && this.isMobile")
              img(src='./articles/review_narspi_shop_2_crop.jpg', v-if="article.shop==='@narspi_shop' && this.isMobile")
              img(src='./articles/review_narspi_shop_1.jpg', v-if="article.shop==='@narspi_shop' && !this.isMobile")
              img(src='./articles/review_narspi_shop_2.jpg', v-if="article.shop==='@narspi_shop' && !this.isMobile")
              img(src='./articles/review_grideli_atelier_1_crop.jpg', v-if="article.shop==='@grideli_atelier' && this.isMobile")
              img(src='./articles/review_grideli_atelier_2_crop.jpg', v-if="article.shop==='@grideli_atelier' && this.isMobile")
              img(src='./articles/review_grideli_atelier_1.jpg', v-if="article.shop==='@grideli_atelier' && !this.isMobile")
              img(src='./articles/review_grideli_atelier_2.jpg', v-if="article.shop==='@grideli_atelier' && !this.isMobile")
      .text
        button
          .category {{ article.category }}
          .brand-name
            | {{ article.shop }}
            .arrow-right(@click="show(index)")
              i.ic-review_arrow_right
          p(v-html="article.text")
          .ps(v-html="article.author")



  .blue-plank
    | CRM Directbot удобен настолько,#[br.mobile]
    | что мы готовы предоставить вам#[br]
    | продавца на аутсорсинг 24/7#[br.mobile]
    | всего за 3990 руб. в месяц#[br.mobile]



  operator-actions
  toggle-role
  connect-get

  .fake-height(v-if="toggleBtns")
  //-.free-connect(v-if="toggleBtns")
    a.link-info(@click.stop="openPopup('is10')")
      | ХОЧЕШЬ ПОДКЛЮЧИТЬ СВОЕГО  ОПЕРАТОРА? ИЛИ ТЫ САМ ОПЕРАТОР?

  .free-wrap(:class="{'fixed-btns': !isMobile && showBtns}")
    button( v-if="showBtns", :style="{zIndex: showBtns ? 190 : 0}",
      v-on:click="$router.push({name: 'auth'})").btn.btn_primary.__orange.__xl.fast__big__btn.try-free ПОПРОБОВАТЬ БЕСПЛАТНО
    button(v-if="isMobile && showBtns", :style="{zIndex: showBtns ? 190 : 0}", @click="ask").ask-btn ЧАТ FAQ
    button(v-if="!isMobile && showBtns", @click="ask").ask-btn СПРОСИТЬ В ЧАТЕ


</template>

<script>

import whoNeed from './parts/who-need';
import showBot from './parts/show-bot';
import operatorSkills from './parts/operator-skills';
import operatorActions from './parts/operator-actions';
import toggleRole from './parts/toggle-role';
import connectGet from './parts/connect-get';
import landingTop from './parts/landing-top';


import listen from 'event-listener';
import { mapGetters } from 'vuex';
import * as authService from 'services/auth';
import config from 'root/../config';

import JQuery from 'jquery';

export default {
  data(){
    return {
      margin: 0,
      toggleBtns: false,
      showBtns: false,
      windowHeight: 0,
      pricePopupShown: false,
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
            Несмотря на то, что Instagram у нас не<br class="desktop">
            основной канал продаж, мы получаем<br class="desktop">
            оттуда стабильный поток клиентов без<br class="desktop">
            особых вложений. А подключив Direcbot по<br class="desktop">
            тарифу 3990 руб., мне больше не надо<br class="desktop">
            беспокоиться за качество и скорость<br class="desktop">
            обслуживания клиентов из Instagram. Плюс<br class="desktop">
            порадовала возможность сделать фото для<br class="desktop">
            ленты и рекламу у блогера, расплатившись<br class="desktop">
            своими же товарами.<br class="desktop">
          `,
          author: "Ольга,<br>Основатель и владелец бренда"
        }
      ]
    }
  },
  created(){

    if(this.isAuth && !this.isFake){
      this.$router.replace({name: 'profile'})
    }

    window.eventHub.$on('open-landing-popup',name=>{this.openPopup(name)})
    window.eventHub.$on('toggle-landing-buttons',()=>{
      this.toggleBtns = true;
      this.$nextTick(()=>{
        JQuery(document.body).animate({scrollTop: JQuery('.toogle-btns').offset().top})
      })
    })
    this.scrollListener=listen(window, 'scroll',()=>{

      if(this.isMobile){
        this.showBtns = document.body.scrollTop > window.innerHeight * 2;
      } else {
        this.showBtns = document.body.scrollTop > window.innerHeight;
      }

      if(document.body.scrollTop >= JQuery('#operator-skills').offset().top) {
        if(this.pricePopupShown) return;
        if(this.$store.state.user.pricePopup) return;
        this.pricePopupShown = true;
        setTimeout(()=>{
          if(this.$route.name === 'home'){
            this.$router.push({name: 'home-info', params: {id: 'price'}});
          }
        }, 7000)

      }
    })

    this.resize = listen(window, 'resize',()=>{
      if(window.browser.instagram) {
        this.windowHeight = window.innerHeight;
      }
    })

  },
  mounted(){
    this.timeId = setInterval(()=>{
      this.sliderRun = !this.sliderRun;
    },3000)
    this.$nextTick(()=>{
      if(window.browser.safari && !window.browser.instagram){
        this.windowHeight = document.body.offsetHeight;
      } else {
         this.windowHeight = window.innerHeight;
      }
      if(window.browser.facebook && window.browser.ios){
        setTimeout(()=>{
          this.windowHeight = window.innerHeight;
        },500)
      }
    })
  },
  beforeDestroy(){
    clearInterval(this.timeId);
    if(this.scrollListener)this.scrollListener.remove();
    if(this.resize)this.resize.remove();
  },
  methods: {
    show(index){
      if(index+1 >= this.articles.length){
        this.showArticle=0;
        return;
      }

      this.showArticle = index+1;
    },
    openPopup(name){
      this.$router.push({name: 'home-info', params: {id: name}})
    },
    scrollFirst() {
      JQuery(document.body).animate({scrollTop: window.innerHeight},450);
    },
    scrollSecond() {
      JQuery(document.body).animate({scrollTop: 2 * window.innerHeight},450);
    },
    ask(){
      yaCounter42602829.reachGoal('askfrommain');
      let dispatch = this.$store.dispatch.bind(this);
      function openChat(vm){
        dispatch('createLead',config.info_id)
          .then(lead=>{
            dispatch('setFakeAction', 'chat-info');
            if(!lead.id){
              alert('Некорректный чат');
              return;
            }
            vm.$router.push({name: 'chat', params: { id: lead.id} })
          },err => console.log(err))
      }
      if(this.isFake && this.isAuth) {
        openChat(this);
        return;
      }
      if ( !this.isAuth ) {
        authService
          .fakeRegister()
          .then(({token,user})=>{
            dispatch('authUser', { user, token })
              .then( () => {
                openChat(this)
              })
        });
      }
    }
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

  computed:{
    ...mapGetters([
      'isAuth',
      'isFake'
    ])
  },
  components:{
    whoNeed,
    landingTop,
    showBot,
    operatorSkills,
    operatorActions,
    toggleRole,
    connectGet
  }
}


</script>

<style lang="postcss">

@import 'style/vars/vars.pcss';

#landing {
  width: 100%;
  overflow: hidden;
  min-height: 100%;
  background: url(./img/DirectBot_landing-desk_pattern.png)

}

.who-need, #landing-top {
  transition: height .3s;
}

#landing .top-landing-background {
  position: absolute 0 0 * 0;
  height: 483px;
  @media screen and (min-width: 1024px) {
    background: url(/static/media/Bgr_clg-blue_1920.2c872bac.png) no-repeat;
    background-size: cover;
  }
}


#landing,
#connect-get,
#toggle-role,
#landing-top,
#operator-actions,
#operator-skills,
#show-bot,
.who-need {

  .blue-plank {
    text-align: center;
    background: $color__brand;
    color: white;
    font-family: $font__family__semibold;
    @media (--overmobile) {
      font-size: 32px;
      padding: 30px * 30px *;
    }

    @media (--mobile) {
      font-size: $font__medium;
      padding: 45px * 45px *;
    }

  }


  .bg-face-1,
  .bg-face-2,
  .bg-face-3 {

    @media (--tabletandless){
      display: none;
    }

  }

  a.link-info {
    border-bottom: 1px solid #595959 !important;
  }

  .free-connect{
    background: white;
    text-align: center;
    padding-top: 31px;
    font-size: 18px;
    font-family: $font__family__semibold;
    color: $color__black;
    padding-bottom: 110px;
    margin-bottom: 0;
    @media(--tabletandless) {
      font-size: 36px;
      padding: 85px 30px 150px 30px;
      margin-bottom: 0px;
    }

    a{
      display: inline;
      color: $color__black;
      border-bottom: 1px solid $color__black;
      text-decoration: none;

      &:hover{
        cursor: pointer;
        border-bottom: 1px solid transparent;
      }
    }
  }


  .fake-height {
    @media (--overmobile){
      height: 80px;
    }

    @media ( --mobile ){

    }
  }

  .free-wrap{
    height: 80px;
    background-color: rgba(9, 22, 43, 0.85);
    margin-top: 0px;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    @media (--tabletandless) {
      display: block;
      height: auto;
      background-color: transparent;
      margin-top: 0px;
    }
    &.fixed-btns {
      position: fixed * 0 -1px 0;
      z-index: 300;
    }
  }

  button.try-free{
    width: 275px !important;
    height: 40px !important;
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 0px !important;
    line-height: normal !important;
    padding: 0;
    @media(--tabletandless){
      display: block;
      position: fixed;
      bottom: -50px;
      right: 0;
      width: 50% !important;
      height: 100px !important;
      font-size: 36px;
      margin-top: 0px;
      margin-bottom: 50px !important;
      line-height: 100px !important;
    }
  }
  .ask-btn{
    width: 275px;
    height: 40px;
    color: $color__white;
    border: 1px solid $color__white;
    border-radius: 5px;
    background-color: transparent;
    font-size: 16px;
    font-family: $font__family__light;
    margin-top: 20px;
    margin-right: 10px;
    @media(--tabletandless){
      display: block;
      position: fixed;
      bottom: 0px;
      left: 0;
      width: 50% !important;
      height: 100px !important;
      font-size: 36px;
      margin-top: 0px;
      margin-right: 0px;
      line-height: 100px !important;
      border: none;
      border-radius: 0px;
      background-color: $color__brand;
    }
    &:hover{
      cursor: pointer;
      background-color: $color__white;
      color: $color__brand-dark;
    }
  }



  .skills-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    padding: 0 25px;
  }

  .info-box{
    text-align: center;
    padding: 40px 0;

    max-width: 500px;
    @media (--tabletandless) {
      max-width: 100%;
    }

    @media screen and (min-width: 1024px){
      margin: 0 20px;
      min-width: 400px;
    }

    @media screen and (min-width: 1815px){
      width: 500px;
    }
    .skills-icon {

      img {
        width: 100%;
        @media (--mobile) {
          max-width: 500px;
        }
        @media (--overmobile) {
          max-width: 270px;
        }
      }
    }
  }

  .wrap-flex {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding:0 25px;
    text-align: center;


  }

  .sub-title {
    font-family: $font__family__semibold;
    color: #595959;
    font-size: 32px;
    display: inline-block;
    margin-top: 20px;
    @media(--tabletandless) {
      display: block;
      text-align: center;
      font-size: 46px;
    }
  }

  .screen {

    text-align: center;
    margin: 0 30px;
    img {
      max-width: 370px;

      @media (--mobile){
        min-width: 500px;
      }
    }

  }

  .tip{

    font-size: 16px;
    font-family: $font__family__light;
    color: $color__gray-dark;
    @media(--tabletandless) {
      font-size: 28px;
      margin-top: 14px;
    }

  }
  .caption{
    margin-top: 7px;
    font-size: 24px;
    line-height: 32px;
    color: #595959;
    position: relative;

    @media(--tabletandless) {
      text-align: center;
      font-size: 36px;
      font-family: $font__family__light;
      margin-top: 8px;
      line-height: normal;
      padding-top: 0px;
    }

    .link-info{

      display: inline;
      color: #595959;
      border-bottom: 1px solid #595959;
      cursor: pointer;
      text-decoration: none;

      .bold{
        font-family: $font__family__semibold;
      }

      &:hover{
        cursor: pointer;
        border-bottom: none;
      }
    }
  }
}

.landing-title {
  text-align: center;
  font-family: $font__family__thin;
  color: #595959;
  font-size: 60px;
  padding-top: 30px;
  padding-bottom: 30px;
}


.screen-title{
  text-align: center;
  display: block;
  font-size: 28px;
  font-family: $font__family__semibold;
  color: $color__brand;
  padding-top: 40px;
  padding-bottom: 20px;
  @media(--tabletandless) {
    display: inline-block;
    font-size: 36px;
  }
}

</style>
