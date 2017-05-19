<style src="./new-parts/style-global.pcss"></style>
<template lang="pug">
#landing(:class="{'new-land': newLanding && !lastLanding, 'update-land': !old && !lastLanding}")

  router-view

  .top-landing-background

  landing-top(:new-landing="newLanding", :class="{'update-land':!old && !lastLanding, 'last-landing': lastLanding}")


  //- СТАРЫЙ ЛЕНДИНГ

  template(v-if="!lastLanding")

    template(v-if="!newLanding")

      template(v-if="old")
        who-need
        show-bot
        operator-skills
        articles

      template(v-if="!old")
        #second-mobile-screen(:style="{height: isMobile ? windowHeight + 'px': 'auto'}")
          .wrap
            .item-text.one
              p
                | Организует продажи#[br]
                | в Instagram, чтобы вы#[br]
                | не теряли клиентов#[br]
                | и контролировали#[br]
                | результаты
            .item-text.two
              p
                | Продвигает Instаgram#[br]
                | органически, заказывая#[br]
                | контент и рекламу#[br]
                | у качественных#[br]
                | блогеров
            .item-logos
              img.no-desk(src="./img/logos/Telegram_sign_word_white.png")
              img.no-desk(src="./img/logos/amocrm_logo_white.png")
              img.no-desk(src="./img/logos/bitrix_logo_white.png")
              img.no-desk(src="./img/logos/viber_logo_bubble_word_white.png")

              img.no-mob(src="./img/logos/Telegram_sign_word_blue.png")
              img.no-mob(src="./img/logos/amocrm_logo_blue.png")
              img.no-mob(src="./img/logos/bitrix_logo_blue.png")
              img.no-mob(src="./img/logos/viber_logo_bubble_word_blue.png")

          button.bottom-mobile(@click="scrollSecond") Как это работает



        advantages(:prop-advantages="advantages")
          .title(slot="title")
            | Как это работает
        .mobile-landing-btn Почему мы это делаем
        center
        new-articles
        bottom

      .blue-plank(v-if="old")
        | CRM Directbot удобен настолько,#[br.mobile]
        | что мы готовы предоставить вам#[br]
        | продавца на аутсорсинг 24/7#[br.mobile]
        | всего за 3990 руб. в месяц#[br.mobile]
      operator-actions(:class="{'update-land': !old}")
      toggle-role(:class="{'update-land': !old}")
      connect-get(:class="{'update-land': !old}")
      .fake-height(v-if="toggleBtns")

    template(v-if="newLanding")

      advantages
      center
      new-articles
      bottom

      .fake-bottom

    .chat-ball(v-if="showChatBall && !old",  @click="ask")
      span(v-if="chatText") ЧАТ
      span(v-if="!chatText") FAQ
    .free-wrap(:class="{'fixed-btns': !isMobile && showBtns}")
      button( v-if="showBtns", :style="{zIndex: showBtns ? 190 : 0}",
        v-on:click="$router.push({name: 'auth'})").btn.btn_primary.__orange.__xl.fast__big__btn.try-free ПОПРОБОВАТЬ БЕСПЛАТНО
      button(v-if="isMobile && showBtns", :style="{zIndex: showBtns ? 190 : 0}", @click="ask").ask-btn ЧАТ FAQ
      button(v-if="!isMobile && showBtns", @click="ask").ask-btn СПРОСИТЬ В ЧАТЕ


  //- НОВЫЙ ЛЕНДИНГ


  template(v-if="lastLanding")

    skills
      .btn-wrap(slot="bottom")
        .big-landing-btn(@click="$router.push({name: 'why-popup'})") Почему мы это делаем

    center

    last-articles
      .btn-wrap(slot="bottom")
        .big-landing-btn(@click="ask") Часто задаваемые вопросы

    bottom
      .btn-wrap(slot="bottom")
        .big-landing-btn.white(@click="openManager") Как работает менеджер


    .fake-bottom(v-if="!managerShow")



    template(v-if="managerShow")

      operator-actions(ref="operator", :class="{'update-land': !old}")

      toggle-role(:class="{'update-land': !old}")

      connect-get(:class="{'update-land': !old}")
      .fake-height(v-if="toggleBtns")

    .chat-ball(v-if="showChatBall && !old",  @click="ask")
      transition(name="slide-fade")
        span(v-show="chatText") ЧАТ
      transition(name="slide-fade")
        span(v-show="!chatText") FAQ
    .free-wrap(:class="{'fixed-btns': !isMobile && showBtns}")
      button( v-if="showBtns", :style="{zIndex: showBtns ? 190 : 0}",
        v-on:click="$router.push({name: 'auth'})").btn.btn_primary.__orange.__xl.fast__big__btn.try-free ПОПРОБОВАТЬ БЕСПЛАТНО
      button(v-if="isMobile && showBtns", :style="{zIndex: showBtns ? 190 : 0}", @click="ask").ask-btn ЧАТ FAQ
      button(v-if="!isMobile && showBtns", @click="ask").ask-btn СПРОСИТЬ В ЧАТЕ


</template>

<script>
import newArticles from './new-parts/new-articles';
import bottom from './new-parts/bottom';
import center from './new-parts/center';
import advantages from './new-parts/advantages';
import articles from './articles';
import whoNeed from './parts/who-need';
import showBot from './parts/show-bot';
import operatorSkills from './parts/operator-skills';
import operatorActions from './parts/operator-actions';
import toggleRole from './parts/toggle-role';
import connectGet from './parts/connect-get';
import landingTop from './parts/landing-top';
import skills from './last-parts/skills';
import lastArticles from './last-parts/articles';


import listen from 'event-listener';
import { mapGetters } from 'vuex';
import * as authService from 'services/auth';
import config from 'root/../config';

import JQuery from 'jquery';

export default {
  data(){
    return {
      timeId: null,
      chatText: true,
      //Landing pages
      old: false,
      newLanding: false,
      lastLanding: true,
      //---------------

      margin: 0,
      toggleBtns: false,
      showBtns: false,
      windowHeight: 0,
      pricePopupShown: false,
      showChatBall: true,
      managerShow: false,
      advantages: [

        {
          title: 'Создает заказы из Instagram',
          text: `
            Автоматом создаёт чат-заказы<br>
            в CRM с покупателями из Instagram.<br>
            Обслуживайте клиентов совместно,<br>
            не рискуя паролем, и отслеживайте<br>
            статус выполнения заказов
          `
        },
        {
          title: 'Организует работу с блогерами',
          text: `
            Поможет массово создавать фото/видео<br>
            с вашими товарами для ленты и рекламы.<br>
            Подберет блогеров, проверить их<br>
            аудиториюи договориться на<br>
            выгодных условиях
          `
        },
        {
          title: 'Интегрируется в Instagram Direct',
          text: `
            Менеджеры магазина общаются<br>
            с клиентами в Direct прямо из CRM.<br>
            Не теряйте покупателей, которым<br>
            неудобно писать в WhatsApp<br>
            или переходить на сайт
          `
        },
        {

          title: 'Выполняет «мартышкин труд»',
          text: `
            Автоматизирует ответы на<br>
            повторяющиеся вопросы, создает<br>
            шаблоны ответов по товарам и<br>
            пишет уведомления в комментариях<br>
            под фото в Instagram
          `
        },
        {

          title: 'Превращает Instagram в магазин',
          text: `
            Транформирует вашу Instagram-ленту<br>
            в интуитивный онлайн-магазин<br>
            с отзывами, телефоном, карточками<br>
            товаров и доступный по<br>
            короткой ссылке
          `
        },

      ]

    }
  },
  created(){

    this.timeId = setInterval(()=>{
      this.chatText = !this.chatText;
    }, 1500)

    if(this.$route.query && this.$route.query.landing === 'new'){
      this.newLanding = true;
    }

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
        this.showChatBall = document.body.scrollTop <= window.innerHeight * 1.1;
      } else {
        this.showBtns = document.body.scrollTop > window.innerHeight;
        this.showChatBall = document.body.scrollTop <= window.innerHeight;
      }

      if(!this.newLanding){
        let  elem = JQuery('#operator-skills');
        if(elem && elem.offset()){
          if(document.body.scrollTop >= elem.offset().top) {
            if(this.pricePopupShown) return;
            if(this.$store.state.user.pricePopup) return;
            this.pricePopupShown = true;
            setTimeout(()=>{
              if(this.$route.name === 'home'){
                this.$router.push({name: 'home-info', params: {id: 'price'}});
              }
            }, 7000)
          }
        }
      }
    })

    this.resize = listen(window, 'resize',()=>{
      if(window.browser.instagram) {
        this.windowHeight = window.innerHeight;
      }
    })

  },
  mounted(){
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
    if(this.timeId)clearInterval(this.timeId);
    if(this.scrollListener)this.scrollListener.remove();
    if(this.resize)this.resize.remove();
  },
  methods: {
    showArticles(){
      JQuery(document.body).animate({scrollTop: JQuery('#last-articles').offset().top}, 450)
    },
    openManager(){
      this.managerShow = true;
      this.$nextTick(()=>{
        JQuery(document.body).animate({scrollTop: JQuery('#operator-actions').offset().top}, 450)
      })
    },
    openPopup(name){
      this.$router.push({name: 'home-info', params: {id: name}})
    },
    scrollFirst() {
      JQuery(document.body).animate({scrollTop: this.isTrendever ? window.innerHeight : window.innerHeight - 100},450);
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
  computed:{
    ...mapGetters([
      'isAuth',
      'isFake'
    ])
  },
  components:{
    articles,
    whoNeed,
    landingTop,
    showBot,
    operatorSkills,
    operatorActions,
    toggleRole,
    connectGet,
    //new landing
    advantages,
    center,
    bottom,
    newArticles,
    //last landing
    skills,
    lastArticles
  }
}


</script>

<style lang="postcss">


@import 'style/vars/vars.pcss';


.slide-fade-enter-active {
  transition: all .5s ease;
  position: absolute 0 0 * 0;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  position: absolute 0 0 * 0;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}


$ball__size: 105px;

.chat-ball {
  cursor: pointer;
  position: fixed * 20px 50px *;
  size: $ball__size;
  border-radius: 50%;
  background-color: $color-orange;
  text-align: center;
  padding-left: 2px;
  line-height: calc($ball__size + 2px);
  font-size: calc($font__medium - 5px);
  z-index: 240;

  &::after {
    display: block;
    content: '';
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 20px 40px 30px 0px;
    border-color: transparent $color-orange transparent transparent;
    position: absolute * * 0 80px;
    transform: rotate(-149deg);
  }

  @media (--overtablet){
    transform: scale(.5) translate(-70px,30px);
  }

}


#second-mobile-screen {

  position: relative;

  button.bottom-mobile {
    display: none;
    @media (--tabletandless){
      font-family: $font__family__light;
      text-transform: uppercase;
      background-color:$color__brand;
      width: 100%;
      position: absolute * 0 0 0;
      display: block;
      height: 100px;
      border:none;
      outline: none;
      font-size: 36px;
      text-align:center;
      color: white;
    }
  }

  .wrap {
    height: calc(100% - 100px);

    display: flex;
    justify-content: center;


    @media (--tabletandless){
      flex-direction: column;
      background-image: url(./img/Pattern_bgr_mob.svg);
      background-repeat: repeat;
      background-size: cover;
      background-position-y: -100px;
    }


    @media (--overtablet) {
      margin-top: 140px;
      display:block;
    }

    .item-text {
      //flex: 2;
      text-align: center;

      @media (--overtablet) {
        padding-top: 50px;
        padding-bottom: 50px;
        width: calc(100%/2);
        display: inline-block;
        float: right;
        font-size: $font__medium;
        font-family: $font__family__semibold;
        color: $color__gray-dark;

        &.one p {
          padding-right: 100px;
        }
        &.two p {
          padding-left: 100px;
        }
      }

      @media (--tabletandless){
        font-size: calc($font__large + 10px);
        //font-family: $font__family__semibold;
        color:white;
        &.one {
          order: 1;
        }
        &.two {
          order: 3;
        }
      }
    }

    .item-logos {
      text-align: center;

      @media (--overtablet) {

      }

      @media (--tabletandless){
        order: 2;
        margin: 20px 0px;
      }

      img.no-desk {@mixin no_desk;}
      img.no-mob {@mixin no_mob;}


      img {
        display: inline-block;
        width: calc(100%/2 - 70px);
        margin: 20px;
        @media (--overtablet){
          width: 200px;
        }

      }
    }
  }
}


#toggle-role.update-land,
#connect-get.update-land,
#operator-actions.update-land {
    background: transparent;
    background-color: transparent;
  .landing-title {
    @mixin landing__title;
    @media (--overtablet){
      padding-top: 30px;
    }
  }

  .toggle-title, .bottom-wrapper{
    background: transparent;
    background-color: transparent;
  }

   div[class^='bg-face'] {
    background-image: none;
  }
}



#landing.update-land {
  @media (--overtablet){
    .advantages-plank .title {
      padding-top: 20px;
    }
  }
}



#landing.new-land{
  @media (--overtablet) {
    background-attachment: fixed;
  }
  @media (--tabletandless){
    //background-image: url(./new-parts/img/drbt_pattern_mob_light.jpg);
    //background-position: 0 25px;

  }
}



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
    background: url(./img/Bgr_clg-blue_1920.png) no-repeat;
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

  .fake-bottom {
    @media (--tabletandless){
      height: 99px;
    }
    height: 79px;

  }
  .btn-wrap {

    width: 100%;
    text-align: center;
    margin-top: 20px;


    &.bottom-margin {
      margin-bottom: 20px;
    }

    @media (--tabletandless){
       margin-bottom: 60px;
    }

    .big-landing-btn {
      $size: 4px;
      @define-mixin blue {
        color: $color__brand;
        border: $size solid $color__brand;
      }

      @define-mixin white {
        color: white;
        border: $size solid white;
      }

      text-transform: uppercase;
      cursor: pointer;
      border-radius: 5px;
      font-family: $font__family__semibold;

      @mixin blue;

      @media (--overtablet){
        border-width: 3px;
        display: inline-block;
        width: 448px;
        padding: 14px 30px;
        font-size: $font__normal;
      }

      @media (--tabletandless){
        width: 639px;
        display: inline-block;
        padding: 36px 30px;//width: 600px;
        font-size: 36px;
        text-align: center;
      }

      &:hover {
        background: $color__brand;
        color: white;
      }
      &.white{
        border-color: white;
        @mixin white;
        &:hover {
          background: white;
          color: $color__brand;
        }
      }

    }
  }

  .mobile-landing-btn {
    display: none;
    margin: 35px auto 25px auto;
    @media (--tabletandless){
      display: block;
      border-radius: 5px;
      font-family: $font__family__semibold;
      color: $color__brand;
      border: 1px solid $color__brand;
      width: 600px;
      height: 118px;
      font-size: 36px;
      text-align: center;
      line-height: 118px;
      text-transform: uppercase;
    }
  }

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
      z-index: 500;
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
