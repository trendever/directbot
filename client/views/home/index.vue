<style src='./style.pcss'></style>
<template lang="pug">
#home.directbot
  .section.hero
    .section__content.hero__content
      .profile-header
        .profile-header__center
        button.profile-header__auth-btn.btn-smaller ВХОД И РЕГИСТРАЦИЯ
      .hero__content__logo__mobile
      .hero__content__left-logo(v-if="!isMobile")
        a(href="#")
          img(src="./img/directbot-logo-txt.svg")
      .hero__content__center-logo(v-if="!isMobile")
        img(src="./img/directbot-main-logo.png")
      .hero__content__description
        span.bold Оператор вашего #[br] магазина в Instagram #[br]
        span.light 24 часа, 7 дней, 2990&nbsp
          i.ic-currency-rub
          | /мес
      .hero__content__set-up
        button.set-up-btn ПОПРОБОВАТЬ ЗА 0
          i.ic-rub
        button(v-if="!isMobile").set-up-btn ПОДКЛЮЧИТЬ БЕСПЛАТНО
    button.btn.btn_primary.__orange.__xl.enter__btn.fast__big__btn ВХОД И РЕГИСТРАЦИЯ
  .hero__content__2
    a.how-btn КАКИЕ ПРОБЛЕМЫ РЕШАЕТ?
    .wrap-box
      .hero__content__2__title.main 2 часа ожидания
      .hero__content__2__paragraph
        p.top нужно в среднем, чтобы #[br] получить ответ от инста-шопа
    .wrap-box
      .hero__content__2__title 9 из 10 покупателей
      .hero__content__2__paragraph
        p спрашивают про товары #[br] в комментариях или Instagram Direct
    .wrap-box
      .hero__content__2__title.middle 10 из 10 инста-шопов
      .hero__content__2__paragraph
        p хотят свой интернет-магазин и #[br] ставить активные ссылки под постами
    .wrap-box
      .hero__content__2__title.bot РЕШЕНИЕ
      .hero__content__2__paragraph
        p.last Наш оператор ответит #[br] вашим клиентам в Instagram Direct #[br] и, если нужно, создаст сайт
    button.shopping_trends КАК ЭТО РАБОТАЕТ?
  .hero__content__landing
    .section.header.section__content(id="header", v-if="isMobile")
      .header__content.u-fixed.directbot-header
        .wrapper.directbot-wrap
          .header__center
            .header__text.head Как это работает?
    .hero__content__landing__top-scheme
      p СКАНИРУЕТ КОММЕНТАРИИ И DIRECT В INSTAGRAM
      p БЫСТРО ОТВЕЧАЕТ КЛИЕНТАМ В DIRECT
      p НАШ ОПЕРАТОР ВСЕ УСПЕВАЕТ И СТОИТ ВСЕГО 2990&nbsp
        i.ic-rub
        | /МЕС, ПОТОМУ ЧТО ЕМУ ПОМОГАЕТ DIRECTBOT, АВТОМАТИЗИРУЮЩИЙ БОЛЬШИНСТВО ДЕЙСТВИЙ
    .hero__content__landing__title.main Преимущества нашего оператора
      .wrapper
        .info-box
          .hero__content__landing__icon-1
            img(src="./img/icon-1.png")
          .hero__content__landing__sub-title Отвечает всем клиентам сразу
          .hero__content__landing__caption Со смайлами&nbsp
            i.ic-smile &nbsp&nbsp&nbsp&nbsp&nbsp
            | уделит внимание каждому, быстро ответит.
            a.link-info(v-on:click="showPopupA = true") Ни один клиент не успеет передумать
            info-popup(:show-popup="showPopupA")
              i.ic-close(v-if="!isMobile")
              info-screen1
        .info-box
          .hero__content__landing__icon-2
            img(src="./img/icon-2.png")
          .hero__content__landing__sub-title Выполняет  «мартышкин труд»
          .hero__content__landing__caption Больше не нужно отвечать  и спрашивать  одно и то же.
            a.link-info Оператор даст ссылку на сайт,  уточнит  наличие, узнает размеры и адрес
            info-popup
              i.ic-close(v-if="!isMobile")
              info-screen2
        .info-box
          .hero__content__landing__icon-3
            img(src="./img/icon-3.png")
          .hero__content__landing__sub-title Подключается быстро,  работает самостоятельно
          .hero__content__landing__caption Подключи нашего оператора к своему  Instagram-магазину в один клик.
            a.link-info Ничего не надо скачивать
            info-popup
              i.ic-close(v-if="!isMobile")
              info-screen3
      .hero__content__landing__title.middle Как работает наш  оператор?
      .hero__content__landing__screen-1
        span.screen-title СКАНИРУЕТ INSTAGRAM DIRECT
        img(src="./img/screen-1.png")
      .hero__content__landing__screen-2
        span.screen-title СКАНИРУЕТ КОММЕНТАРИИ
        img(src="./img/screen-2.png")
      .hero__content__landing__sub-title Оператор сразу видит  вопросы покупателей
      .hero__content__landing__caption Не важно, задан вопрос в комментариях  или личном сообщении,  оператор уже будет в чате  с покупателем
      .hero__content__landing__toggle
        .hero__content__landing__toggle__title ТЕПЕРЬ ОПЕРАТОРУ НУЖНО ЗНАТЬ,  У ТЕБЯ ЕСТЬ ИНТЕРНЕТ-МАГАЗИН?
        button(v-on:click="noScreen = false, yesScreen = true").yes ДА
        button(v-on:click="yesScreen = false, noScreen = true").no НЕТ
      .toggle-box
        .wrap-yes(v-show="yesScreen")
          .hero__content__landing__screen-3
            span.screen-title ИЗУЧИТ ТВОЙ ИНТЕРНЕТ-МАГАЗИН
            img(src="./img/screen-3-yes.png")
          .hero__content__landing__screen-4
            span.screen-title УЗНАЕТ О ТОВАРАХ ПО АРТИКУЛУ
            img(src="./img/screen-4-yes.png")
          .hero__content__landing__sub-title.info Есть сайт? Укажи артикул  товара под постом
          .hero__content__landing__caption Оператор узнает о деталях и наличии  товара по артикулу в описании поста.  Ссылка на сайт должна быть  в «био» инста-профиля
          .info-wrap
            .hero__content__landing__screen-5
              span.screen-title ОТВЕЧАЕТ В INSTAGRAM DIRECT
              img(src="./img/screen-5.png")
            .hero__content__landing__sub-title Оператор ответит на вопросы  и поможет купить
            .hero__content__landing__caption Клиенты получат консультацию* и ссылку  для покупки товара в твоем  интернет-магазине**
            .hero__content__landing__tip *отслеживай диалог в кабинете или Instagram Direct
            .hero__content__landing__tip **еще можно покупать не выходя из Instagram Direct
        .wrap-no(v-show="noScreen")
          .hero__content__landing__screen-3
            span.screen-title СОЗДАСТ ИНТЕРНЕТ-МАГАЗИН
            img(src="./img/screen-3-no.png")
          .hero__content__landing__screen-4
            span.screen-title СПРАШИВАЕТ О ТОВАРАХ В ЧАТЕ
            img(src="./img/screen-4-no.png")
          .hero__content__landing__sub-title.info Нет сайта? Ответь  на вопросы о товарах
          .hero__content__landing__caption.store Оператор увидит посты в Instagram  и добавит их в твой
            a.link-info  новый интернет-магазин по ссылке
              span.bold  xxxx.drbt.io
            info-popup
              i.ic-close(v-if="!isMobile")
              info-screen4
            | Также уточнит детали и наличие товаров
  .info-block
    .title
      p Подключайся и получишь:
    .list
      ol
        li Опытного оператора в команду,  но в 15 раз дешевле*
        li Адаптивный интернет-магазин,  с платежами и доставкой
        li Сервис по подбору и организации  рекламы через блогеров
    .tooltip
      p *из расчета средней зарплаты оператора 45 тыс.руб.  в месяц, и это только за 8-часовой день с выходными
  .free-connect
    p ХОЧЕШЬ ПОДКЛЮЧИТЬ СВОЕГО  ОПЕРАТОРА? ИЛИ ТЫ САМ ОПЕРАТОР?
    a ЖМИ СЮДА
</template>
<script>
//import JQuery from 'jquery';
import listen from 'event-listener'

import InfoPopup from '../../components/popup/info-popup';
import infoScreen1 from '../info-screens/info-screen-1'
import infoScreen2 from '../info-screens/info-screen-2'
import infoScreen3 from '../info-screens/info-screen-3'
import infoScreen4 from '../info-screens/info-screen-4'

export default {
  data(){
    return {
      isMobile : true,
      showPopupA: false,
      showPopupB: false,
      showPopupC: false,
      showPopupD: false,
      yesScreen: true,
      noScreen: false
    }
  },
  components: {
    InfoPopup,
    infoScreen1,
    infoScreen2,
    infoScreen3,
    infoScreen4
  },
  watch: {
    '$route' (to, from) {
      this.$emit('setList')
    }
  }
}
</script>
