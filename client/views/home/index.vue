<style src='./style.pcss'></style>
<template lang="pug">
#home.directbot
  router-view
  .section.hero
    .section__content(ref="screenOne").hero__content
      .hero__content__background
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
        | Оператор магазина #[br(v-if="isMobile")] в Instagram #[br]
        span.time__text Всегда на связи с клиентами
      .hero__content__set-up
        button(v-on:click="$router.push({name: 'auth'})").set-up-btn ПОПРОБОВАТЬ БЕСПЛАТНО
      button.btn.btn_primary.__orange.__xl.enter__btn.fast__big__btn(v-on:click="$router.push({name: 'auth'})")
        | ВХОД И РЕГИСТРАЦИЯ
      a.how-btn(v-on:click="scrollFirst") КОМУ НУЖЕН DIRECTBOT?

  .container
    .hero__content__2(ref="screenTwo")
      //-a.how-btn(v-on:click="scrollFirst") КОМУ НУЖЕН DIRECTBOT?
      .head-title(v-if="!isMobile") Кому нужен Directbot?
      .wrap-box
        .hero__content__2__digit.one 1
        .hero__content__2__title.main Крупным #[br] интернет-магазинам,
        .hero__content__2__paragraph
          p кто продаёт в Instagram, #[br] но не успевает отвечать клиентам #[br] в Direct и комментариях под постами
          p(v-if="!isMobile").bold-txt 2 часа ожидания #[br]
          p(v-if="!isMobile").light-txt нужно в среднем, чтобы #[br] получить ответ от инста-шопа

      .wrap-box
        .hero__content__2__digit.two 2
        .hero__content__2__title Продавцам #[br] в Instagram-магазинах,
        .hero__content__2__paragraph
          p которым надоело отвечать #[br] одно и то же в комментариях #[br] и Instagram Direct
          p(v-if="!isMobile").bold-txt 9 из 10 покупателей #[br]
          p(v-if="!isMobile").light-txt спрашивают про товары #[br] в комментариях или Instagram Direct
      .wrap-box
        .hero__content__2__digit.three 3
        .hero__content__2__title.middle Начинающим #[br] Instagram-магазинам,
        .hero__content__2__paragraph
          p.top кому нужно управлять #[br] продажами и быстро #[br] отвечать клиентам
          p(v-if="!isMobile").bold-txt 10 из 10 инста-шопов #[br]
          p(v-if="!isMobile").light-txt хотят свой интернет-магазин #[br] и ставить активные ссылки под постами
      button.shopping_trends(v-on:click="scrollSecond") КАК ЭТО РАБОТАЕТ?
  .hero__content__bg
  .hero__content__bg-bottom
  .hero__content__bg-bottom-2
  .hero__content__landing
    .head-title Союз человека и робота
    .hero__content__landing__top-scheme
      .text-box.top-box 1. Directbot сканирует комментарии #[br(v-if="isMobile")] и Direct в Instagram у магазина
      img(src="./img/insta-bot_image_mob.svg", v-if="isMobile")
      .counter
        span.txt ОТПРАВЛЕНО
        span.digit#counter {{ landingCounter }}
        span.txt СООБЩЕНИЙ
      .text-box.middle-box 2. Бот определяет клиентов #[br(v-if="isMobile")] и находит информацию о товарах
      img(src="./img/insta-bot_image_desk.svg", v-if="!isMobile")
      .text-box.bottom-box 3. Персональный чат-оператор #[br(v-if="isMobile")] отвечает от имени магазина в Instagram
    .hero__content__landing__title.main Преимущества #[br(v-if="isMobile")] нашего оператора
    .wrapper
      .info-box
        .hero__content__landing__icon-1
          img(src="./img/icon-1.png")
        .hero__content__landing__sub-title Отвечает всем #[br] клиентам сразу
        .hero__content__landing__caption Со &#128526 смайлами #[br(v-if="!isMobile")]
          | уделит внимание каждому, #[br(v-if="!isMobile")] быстро ответит. #[br(v-if="isMobile")]
          a.link-info(@click.stop="openPopup('is1')") Ни один клиент #[br(v-if="!isMobile")] не успеет передумать
      .info-box
        .hero__content__landing__icon-2
          img(src="./img/icon-2.png")
        .hero__content__landing__sub-title Выполняет #[br] «мартышкин труд»
        .hero__content__landing__caption Больше не нужно отвечать #[br] и спрашивать одно и то же. #[br]
          a.link-info(@click.stop="openPopup('is2')")
            | Оператор даст ссылку на сайт, уточнит  наличие, узнает размеры и адрес
      .info-box
        .hero__content__landing__icon-3
          img(src="./img/icon-3.png")
        .hero__content__landing__sub-title Подключается #[br(v-if="!isMobile")] в один клик
        .hero__content__landing__caption Подключи нашего оператора #[br(v-if="!isMobile")] к своему  Instagram-магазину #[br(v-if="!isMobile")] в один клик. #[br]
          a.link-info(@click.stop="openPopup('is3')")
            | Ничего не надо скачивать

        .save-experience(v-if="isMobile")
          | ВАЖНО! Мы гарантируем  #[br(v-if="isMobile")]
          | безопасность аккаунта #[br(v-if="isMobile")]
          | магазина от блокировки #[br(v-if="isMobile")]
          | и не храним пароли
    .hero__content__landing__title.middle Что делает #[br(v-if="isMobile")] наш  оператор?
    .hero__content__landing__screen-1
      span.screen-title СКАНИРУЕТ #[br(v-if="!isMobile")] INSTAGRAM DIRECT
      img(src="./img/screen-1.png")
    .hero__content__landing__screen-2
      span.screen-title СКАНИРУЕТ #[br(v-if="!isMobile")] КОММЕНТАРИИ
      img(src="./img/screen-2.png")
    .hero__content__landing__sub-title.deskST Оператор сразу видит #[br(v-if="isMobile")] вопросы покупателей
    .hero__content__landing__caption.deskCap
      a.link-info(@click.stop="openPopup('is4')") Не важно, задан вопрос в комментариях #[br(v-if="isMobile")] или личном сообщении, #[br(v-if="!isMobile")]
      span  оператор #[br(v-if="isMobile")] уже будет отвечать покупателю #[br(v-if="isMobile")] в Direct от твоего имени
    .hero__content__landing__toggle
      .hero__content__landing__toggle__title 
        | ЧТОБЫ УЗНАТЬ ДАЛЬНЕЙШИЕ#[br(v-if="isMobile")]  ДЕЙСТВИЯ ОПЕРАТОРА, #[br(v-if="!isMobile")] 
        | СКАЖИТЕ, #[br(v-if="isMobile")] У ВАС ЕСТЬ ИНТЕРНЕТ-МАГАЗИН?
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
      .wrap-no(v-show="noScreen")
        .hero__content__landing__screen-3
          span.screen-title СОЗДАСТ #[br(v-if="!isMobile")] ИНТЕРНЕТ-МАГАЗИН
          img(src="./img/screen-3-no.png")
        .hero__content__landing__screen-4
          span.screen-title СПРАШИВАЕТ #[br(v-if="!isMobile")] О ТОВАРАХ В ЧАТЕ
          img(src="./img/screen-4-no.png")
        .hero__content__landing__sub-title.info Нет сайта? Ответь на вопросы о товарах
        .hero__content__landing__caption.store Оператор увидит посты в Instagram #[br(v-if="isMobile")] и добавит их в твой
          a.link-info(@click.stop="openPopup('is5')")
            |  новый интернет-магазин #[br(v-if="!isMobile")] по ссылке
            span.bold  tskirt.drbt.io*. #[br(v-if="isMobile")]
          span Также уточнит детали и наличие товаров #[br]
          span.tip *это ссылка на примере инстаграм-магазина tskirt
            .info-wrap
      .hero__content__landing__screen-5
        span.screen-title ОТВЕЧАЕТ В INSTAGRAM DIRECT
        img(src="./img/screen-5.png")
      .hero__content__landing__sub-title.lastST Оператор ответит на вопросы и поможет купить
      .hero__content__landing__caption.lastCap
        a.link-info(@click.stop="openPopup('is6')") Клиенты получат консультацию*
        span  в твоем #[br(v-if="isMobile")] Instagram Direct #[br(v-if="!isMobile")] и ссылку на товар #[br(v-if="isMobile")] в интернет-магазине**
      .hero__content__landing__tip.firstTip *отслеживай диалог в кабинете или Instagram Direct
      .hero__content__landing__tip.secondTip **еще можно покупать не выходя из Instagram Direct
      .hero__content__landing__title.bot Подключайся и получишь
    .wrapper.bot-wrap
      .info-box
        .hero__content__landing__icon-4
          img(src="./img/icon-4.png")
        .hero__content__landing__sub-title Личного #[br(v-if="!isMobile")] оператора
        .hero__content__landing__caption
          a.link-info(@click.stop="openPopup('is7')") Личный оператор #[br(v-if="!isMobile")] на связи с твоими клиентами #[br(v-if="!isMobile")] 24/7. В 10+ раз дешевле*
      .info-box
        .hero__content__landing__icon-5
          img(src="./img/icon-5.png")
        .hero__content__landing__sub-title Адаптивный #[br(v-if="!isMobile")] интернет-магазин
        .hero__content__landing__caption
          a.link-info(@click.stop="openPopup('is8')")
            | Удобный интернет-магазин #[br(v-if="!isMobile")] с платежами #[br(v-if="isMobile")] и доставкой #[br(v-if="!isMobile")] до покупателя
      .info-box.last-box
        .hero__content__landing__icon-6
          img(src="./img/icon-6.png")
        .hero__content__landing__sub-title Сервис рекламы #[br(v-if="!isMobile")] у блогеров
        .hero__content__landing__caption
          a.link-info(@click.stop="openPopup('is9')")
            | Сервис по подбору #[br(v-if="!isMobile")] и организации рекламы #[br(v-if="!isMobile")] через блогеров
      .tooltip
        p *из расчета средней зарплаты оператора 45 тыс.руб. #[br(v-if='isMobile')] в месяц, и это только за 8-часовой день с выходными
  .free-connect
    a.link-info(@click.stop="openPopup('is10')")
      | ХОЧЕШЬ ПОДКЛЮЧИТЬ СВОЕГО  ОПЕРАТОРА? ИЛИ ТЫ САМ ОПЕРАТОР?
  .free-wrap(:class="{'fixed-btns': !isMobile && showBtns}")
    button( v-if="showBtns", :style="{zIndex: showBtns ? 190 : 0}",
      v-on:click="$router.push({name: 'auth'})").btn.btn_primary.__orange.__xl.fast__big__btn.try-free ПОПРОБОВАТЬ БЕСПЛАТНО
    button(v-if="isMobile && showBtns", :style="{zIndex: showBtns ? 190 : 0}", @click="ask").ask-btn СПРОСИТЬ
    button(v-if="!isMobile", @click="ask").ask-btn СПРОСИТЬ В ЧАТЕ
</template>
<script>

import Hammer from 'hammerjs';
import JQuery from 'jquery';
import listen from 'event-listener';

import { mapGetters } from 'vuex';
import * as authService from 'services/auth';
import config from 'root/../config.js'
import * as commonService from 'services/common';

export default {
  data(){
    return {
      showBtns: false,
      inputOpened: false,
      menuOpened: false,
      phoneNumber: '',
      smsSent: false,
      phoneError: false,
      yesScreen: true,
      noScreen: false,
      showPopup: false,
      popupUrl: "",
      landingCounter: 4783
    }
  },
  created(){
    if(this.isAuth && !this.isFake) {
      if(localStorage.getItem('active-account')) this.$router.replace({name: 'profile'});
    }
  },
  mounted() {

    this.timeID = this.count();

    this.$root.$on('postMessage',(msg) => {
      this.showPopup = false;
      let fra = document.getElementById("popupiframe");
      if(fra && msg.data && msg.data.name == "Close" && msg.source == fra.contentWindow) {
        this.showPopup = false;
        this.popupUrl = "";
      }
    });

    //SWIPE LOGIC

    /*if(this.$refs.screenTwo && this.$refs.screenOne) {

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
    }*/

    JQuery('.toggleBtn').on('click', function() {
        JQuery('.toggleBtn').not(this).removeClass('activeBtn');
        JQuery(this).toggleClass('activeBtn');
    });

    //Scroll

    this.scrollHandler = listen(window, 'scroll',()=>{
      this.showBtns = document.body.scrollTop > window.innerHeight;
    });

      if(window.browser.instagram) {
        document.querySelector('.hero__content').classList.add("insta-scr1");
        document.querySelector('.hero__content__2').classList.add("insta-scr2");
        document.querySelector('.hero__content__landing').classList.add("insta-landing");
      };

  },
  beforeDestroy(){
    this.scrollHandler.remove();
    clearInterval(this.timeID);

  },
  computed: {
      ...mapGetters([
        'isAuth',
        'isFake'
      ]),
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
    ask(){

      let dispatch = this.$store.dispatch.bind(this);

      function openChat(vm){
        dispatch('createLead',config.info_id)
          .then(lead=>{
            dispatch('setFakeAction', 'chat-info');
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

    },

    count(){

      return setInterval(()=>{
        this.landingCounter += [1,3,5][Math.round(Math.random()*10/4)];
      },4000)

    },

    openPopup(target){
      this.$router.push({ name: 'home-info', params: { id: target }})
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
