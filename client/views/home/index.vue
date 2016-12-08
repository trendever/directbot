<style src='./style.pcss'></style>
<template lang="pug">
#home.directbot
  .section.hero
    div.hero-popup(v-if="showPopup")
      iframe#popupiframe(v-bind:src="popupUrl")
    .section__content(ref="screenOne").hero__content
      .profile-header
        .profile-header__center
        button(v-on:click="$router.push({name: 'auth'})").profile-header__auth-btn.btn-smaller ВХОД И РЕГИСТРАЦИЯ
      .hero__content__logo__mobile
      .hero__content__left-logo(v-if="!isMobile")
        a(href="#")
          img(src="./img/directbot-logo-txt.svg")
      .hero__content__center-logo(v-if="!isMobile")
        img(src="./img/directbot-main-logo.png")
      .hero__content__description
        span.bold Оператор вашего #[br] магазина в Instagram #[br]
        span.light 24 часа, 7 дней, 3990&nbsp
          i.ic-currency-rub
          | /месяц
      .hero__content__set-up
        button(v-on:click="$router.push({name: 'auth'})").set-up-btn ПОПРОБОВАТЬ БЕСПЛАТНО
      button.btn.btn_primary.__orange.__xl.enter__btn.fast__big__btn(v-on:click="$router.push({name: 'auth'})")
        | ВХОД И РЕГИСТРАЦИЯ


    .hero__content__2(ref="screenTwo")
      a.how-btn(v-on:click="scrollFirst") КАКИЕ ПРОБЛЕМЫ РЕШАЕТ?
      .wrap-box
        .hero__content__2__title.main 2 часа ожидания
        .hero__content__2__paragraph
          p.top нужно в среднем, #[br(v-if="!isMobile")] чтобы #[br(v-if="isMobile")] получить ответ #[br(v-if="!isMobile")] от инста-шопа
      .wrap-box
        .hero__content__2__title 9 из 10 покупателей
        .hero__content__2__paragraph
          p спрашивают про товары #[br] в комментариях #[br(v-if="!isMobile")] или Instagram Direct
      .wrap-box
        .hero__content__2__title.middle 10 из 10 инста-шопов
        .hero__content__2__paragraph
          p хотят свой интернет-магазин #[br(v-if="!isMobile")] и #[br(v-if="isMobile")] ставить активные ссылки #[br(v-if="!isMobile")] под постами
      button.shopping_trends(v-on:click="scrollSecond") РЕШЕНИЕ
  .hero__content__bg
  .hero__content__landing
    .section.header.section__content(id="header", v-if="isMobile")
      .header__content.u-fixed.directbot-header
        .wrapper.directbot-wrap
          .header__center
            .header__text.head Как это работает?
    .hero__content__landing__top-scheme
      img(src="./img/insta-bot_image_mob.svg", v-if="isMobile")
      .counter
        span.txt ОТПРАВЛЕНО
        span.digit#counter {{ landingCounter }}
        span.txt СООБЩЕНИЙ
      p.t СКАНИРУЕТ КОММЕНТАРИИ #[br] И DIRECT В INSTAGRAM
      p.m БЫСТРО ОТВЕЧАЕТ #[br] КЛИЕНТАМ В DIRECT
      img(src="./img/insta-bot_image_desk.svg", v-if="!isMobile")
      p.b НАШ ОПЕРАТОР ВСЕ УСПЕВАЕТ #[br(v-if="isMobile")] И СТОИТ ВСЕГО 3990&nbsp
        i.ic-rub
        | /МЕС, #[br] ПОТОМУ ЧТО ЕМУ ПОМОГАЕТ #[br(v-if="isMobile")] DIRECTBOT, #[br(v-if="!isMobile")] АВТОМАТИЗИРУЮЩИЙ #[br(v-if="isMobile")] БОЛЬШИНСТВО ДЕЙСТВИЙ
    .hero__content__landing__title.main Преимущества #[br(v-if="isMobile")] нашего оператора
      .wrapper
        .info-box
          .hero__content__landing__icon-1
            img(src="./img/icon-1.png")
          .hero__content__landing__sub-title Отвечает всем #[br] клиентам сразу
          .hero__content__landing__caption Со смайлами&nbsp &#128526 &nbsp
            | уделит внимание #[br(v-if="!isMobile")] каждому, быстро ответит. #[br]
            a.link-info(@click="openPopup('is1')") Ни один клиент не успеет передумать
        .info-box
          .hero__content__landing__icon-2
            img(src="./img/icon-2.png")
          .hero__content__landing__sub-title Выполняет #[br] «мартышкин труд»
          .hero__content__landing__caption Больше не нужно отвечать #[br(v-if="isMobile")] и спрашивать #[br(v-if="!isMobile")] одно и то же. #[br(v-if="isMobile")]
            a.link-info(@click="openPopup('is2')")
              | Оператор даст ссылку на сайт,  уточнит  наличие, узнает размеры и адрес
        .info-box
          .hero__content__landing__icon-3
            img(src="./img/icon-3.png")
          .hero__content__landing__sub-title Подключается быстро, работает самостоятельно
          .hero__content__landing__caption Подключи нашего оператора к своему  Instagram-магазину в один клик. #[br]
            a.link-info(@click="openPopup('is3')")
              | Ничего не надо скачивать
      .hero__content__landing__title.middle Что делает #[br(v-if="isMobile")] наш  оператор?
      .hero__content__landing__screen-1
        span.screen-title СКАНИРУЕТ #[br(v-if="!isMobile")] INSTAGRAM DIRECT
        img(src="./img/screen-1.png")
      .hero__content__landing__screen-2
        span.screen-title СКАНИРУЕТ #[br(v-if="!isMobile")] КОММЕНТАРИИ
        img(src="./img/screen-2.png")
      .hero__content__landing__sub-title.deskST Оператор сразу видит #[br(v-if="isMobile")] вопросы покупателей
      .hero__content__landing__caption.deskCap
        a.link-info(@click="openPopup('is4')") Не важно, задан вопрос в комментариях #[br(v-if="isMobile")] или личном сообщении, #[br(v-if="!isMobile")]
        span  оператор #[br(v-if="isMobile")] уже будет отвечать покупателю #[br(v-if="isMobile")] в Direct от твоего имени
      .hero__content__landing__toggle
        .hero__content__landing__toggle__title ТЕПЕРЬ НАМ НУЖНО ЗНАТЬ, #[br] У ТЕБЯ ЕСТЬ ИНТЕРНЕТ-МАГАЗИН?
        button(v-on:click="noScreen = false, yesScreen = true").yes.toggleBtn.activeBtn ДА
        button(v-on:click="yesScreen = false, noScreen = true").no.toggleBtn НЕТ
      .toggle-box
        .wrap-yes(v-show="yesScreen")
          .hero__content__landing__screen-3
            span.screen-title ИЗУЧИТ ТВОЙ #[br(v-if="!isMobile")] ИНТЕРНЕТ-МАГАЗИН
            img(src="./img/screen-3-yes.png")
          .hero__content__landing__screen-4
            span.screen-title УЗНАЕТ О ТОВАРАХ #[br(v-if="!isMobile")] ПО АРТИКУЛУ
            img(src="./img/screen-4-yes.png")
          .hero__content__landing__sub-title.info-title Есть сайт? Укажи артикул товара под постом
          .hero__content__landing__caption.info-cap Оператор узнает о деталях и наличии товара по артикулу в описании поста. #[br(v-if="!isMobile")] Ссылка на сайт должна быть #[br(v-if="isMobile")] в «био» инста-профиля
          .info-wrap
            .hero__content__landing__screen-5
              span.screen-title ОТВЕЧАЕТ В INSTAGRAM DIRECT
              img(src="./img/screen-5.png")
            .hero__content__landing__sub-title.lastST Оператор ответит на вопросы и поможет купить
            .hero__content__landing__caption.lastCap
              a.link-info(@click="openPopup('is6')") Клиенты получат консультацию*
              span  в твоем #[br(v-if="isMobile")] Instagram Direct #[br(v-if="!isMobile")] и ссылку на товар #[br(v-if="isMobile")] в интернет-магазине**
            .hero__content__landing__tip.firstTip *отслеживай диалог в кабинете или Instagram Direct
            .hero__content__landing__tip.secondTip **еще можно покупать не выходя из Instagram Direct
        .wrap-no(v-show="noScreen")
          .hero__content__landing__screen-3
            span.screen-title СОЗДАСТ #[br(v-if="!isMobile")] ИНТЕРНЕТ-МАГАЗИН
            img(src="./img/screen-3-no.png")
          .hero__content__landing__screen-4
            span.screen-title СПРАШИВАЕТ #[br(v-if="!isMobile")] О ТОВАРАХ В ЧАТЕ
            img(src="./img/screen-4-no.png")
          .hero__content__landing__sub-title.info Нет сайта? Ответь на вопросы о товарах
          .hero__content__landing__caption.store Оператор увидит посты в Instagram #[br(v-if="isMobile")] и добавит их в твой #[br(v-if="!isMobile")]
            a.link-info(@click="openPopup('is5')")
              |  новый интернет-магазин по ссылке
              span.bold  xxxx.drbt.io #[br]
  .info-block
    .title
      p Подключайся и получишь:
    .list
      ol
        li
          a.link-info(@click="openPopup('is7')")
            | Личного оператора, на связи с твоими #[br(v-if="isMobile")] клиентами 24/7. В 15 раз дешевле* &#128563
        li
          a.link-info(@click="openPopup('is8')")
            | Адаптивный интернет-магазин, #[br(v-if="isMobile")] с платежами и доставкой
        li
          a.link-info(@click="openPopup('is9')")
            | Сервис по подбору и организации #[br(v-if="isMobile")] рекламы через блогеров
    .tooltip
      p *из расчета средней зарплаты оператора 45 тыс.руб. #[br(v-if="isMobile")] в месяц, и это только за 8-часовой день с выходными
  .free-connect
    a.link-info(@click="openPopup('is10')")
      | ХОЧЕШЬ ПОДКЛЮЧИТЬ СВОЕГО  ОПЕРАТОРА? ИЛИ ТЫ САМ ОПЕРАТОР?
  .free-wrap
    button(v-on:click="$router.push({name: 'auth'})").btn.btn_primary.__orange.__xl.fast__big__btn.try-free ПОПРОБОВАТЬ БЕСПЛАТНО
</template>
<script>

import Hammer from 'hammerjs';
import JQuery from 'jquery';
import listen from 'event-listener';


import settings from 'root/settings';
import * as commonService from 'services/common';

export default {
  data(){
    return {
      inputOpened: false,
      menuOpened: false,
      phoneNumber: '',
      smsSent: false,
      phoneError: false,
      yesScreen: true,
      noScreen: false,
      showPopup: false,
      popupUrl: ""
    }
  },
  created(){
    if(this.$store.getters.isAuth) {
      this.$router.replace({name: 'profile'});
    }
  },
  mounted() {

    this.timeID = this.count();

    this.$root.$on('postMessage',(msg) => {
      let fra = document.getElementById("popupiframe");
      if(fra && msg.data && msg.data.name == "Close" && msg.source == fra.contentWindow) {
        this.showPopup = false;
        this.popupUrl = "";
      }
    });

    //SWIPE LOGIC

    if(this.$refs.screenTwo && this.$refs.screenOne) {

      let screenOne = new Hammer(this.$refs.screenOne,{touchAction: 'none'});
      screenOne.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

      screenOne.on('swipeup', ()=> {
        this.scrollFirst()
      });

      let screenTwo = new Hammer(this.$refs.screenTwo,{touchAction: 'none'});
      screenTwo.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

      screenTwo.on('swipeup', ()=> {
        this.scrollSecond();
      });

      screenTwo.on('swipedown', ()=> {
        JQuery(document.body).animate({scrollTop: 0 },450);
      });
    }

    JQuery('.toggleBtn').on('click', function() {
        JQuery('.toggleBtn').not(this).removeClass('activeBtn');
        JQuery(this).toggleClass('activeBtn');
    });

  },
  beforeDestroy(){

    clearInterval(this.timeID);

  },
  computed: {

      getLinkTitle(){
        if (this.phoneError){
          return "НЕВЕРНЫЙ НОМЕР";
        }
        if (this.smsSent){
          return "ОТПРАВЛЕНО";
        }else{
          return "ПОЛУЧИТЬ ССЫЛКУ";
        }
      },
      disableButton(){
        if (this.phoneNumber.length >= 11 && !this.phoneError){
          return false;
        }else{
          return true;
        }
      }
    },

  methods: {
    count(){

      return setInterval(()=>{
        this.landingCounter += [1,3,5][Math.round(Math.random()*10/4)];
      },1000)

    },
    openPopup(target){
      if (this.isMobile){
        this.$router.push({ name: 'popup', params: { id: target }})
      }else{
        this.showPopup = true;
        this.popupUrl = window.location.origin + "/popup/" + target;
      }

    },
    touchMove(e){
      if(this.scrollCnt.scrollTop < 2 * window.innerHeight ) {
        e.preventDefault();
      }
    },
    openInput(){
      this.inputOpened = !this.inputOpened;
      this.$nextTick(()=>{
        this.$els.input.focus()
      });
    },
    logout(){

      this.logOut();
      window.location = '/';

    },

    getLink(){

      commonService.marketSms({phone: this.phoneNumber }).then(data=>{
          yaCounter35346175.reachGoal('get_link');
          this.$set('smsSent', true);
          this.$set('phoneNumber','');
          setTimeout( () => this.$set('smsSent', false), 3000);
        },err=>{
          this.$set('phoneError',true);
          setTimeout( () => this.$set('phoneError', false), 3000);
        }
      );
    },
    scrollFirst() {
      JQuery(document.body).animate({scrollTop: window.innerHeight},450);
    },

    scrollSecond() {
      JQuery(document.body).animate({scrollTop: 2 * window.innerHeight},450);
    }
  }
};

</script>
