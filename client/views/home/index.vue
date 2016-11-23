<style src='./style.pcss'></style>
<template lang="pug">
#home.directbot
  .section.hero
    .section__content.hero__content
      .profile-header
        .profile-header__center
        button.profile-header__auth-btn.btn-smaller ВХОД И РЕГИСТРАЦИЯ
      .hero__content__logo__mobile
      .hero__content__left-logo
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
        p.last Наш оператор ответит #[br] вашим клиентам в Instagram Direct #[br] и, если нужно, создаст сайт
    button.shopping_trends КАК ЭТО РАБОТАЕТ?
  .hero__content__landing
    .section.header.section__content(id="header")
      .header__content.u-fixed.directbot-header
        .wrapper.directbot-wrap
          .header__center
            .header__text.head Как это работает?
    .hero__content__landing__top-scheme
      p СКАНИРУЕТ КОММЕНТАРИИ #[br] И DIRECT В INSTAGRAM
      p БЫСТРО ОТВЕЧАЕТ #[br] КЛИЕНТАМ В DIRECT
      p НАШ ОПЕРАТОР ВСЕ УСПЕВАЕТ #[br] И СТОИТ ВСЕГО 2990&nbsp
        i.ic-rub
        | /МЕС, #[br] ПОТОМУ ЧТО ЕМУ ПОМОГАЕТ #[br] DIRECTBOT, АВТОМАТИЗИРУЮЩИЙ БОЛЬШИНСТВО ДЕЙСТВИЙ
    .hero__content__landing__title.main Преимущества #[br] нашего оператора
      .wrapper
        .info-box
          .hero__content__landing__icon-1
            img(src="./img/icon-1.png")
          .hero__content__landing__sub-title Отвечает всем #[br] клиентам сразу
          .hero__content__landing__caption Со смайлами&nbsp
            i.ic-smile &nbsp&nbsp&nbsp&nbsp&nbsp
            | уделит внимание #[br] каждому, быстро ответит. #[br]
            a.link-info  Ни один клиент не успеет передумать
            a.link-info  Ни один клиент #[br] не успеет передумать
            info-popup
              i.ic-close
              info-screen1
        .info-box
          .hero__content__landing__icon-2
            img(src="./img/icon-2.png")
          .hero__content__landing__sub-title Выполняет #[br] «мартышкин труд»
          .hero__content__landing__caption Больше не нужно отвечать #[br] и спрашивать #[br] одно и то же. #[br]
            a.link-info Оператор даст ссылку на сайт, #[br] уточнит #[br] наличие, узнает размеры и адрес
            a.link-info Бот даст ссылку на сайт, #[br] уточнит #[br] наличие, узнает размеры и адрес
            info-popup
              i.ic-close
              info-screen2
        .info-box
          .hero__content__landing__icon-3
            img(src="./img/icon-3.png")
          .hero__content__landing__sub-title Подключается быстро, #[br] работает самостоятельно
          .hero__content__landing__caption Подключи нашего оператора к своему #[br] Instagram-магазину в один клик. #[br]
            a.link-info Ничего не надо скачивать
            a.link-info Ничего не надо скачивать
            info-popup
              i.ic-close
              info-screen3
      .hero__content__landing__title.middle Как работает наш #[br] оператор?
      .hero__content__landing__screen-1
        span.screen-title СКАНИРУЕТ INSTAGRAM DIRECT
        img(src="./img/screen-1.png")
      .hero__content__landing__screen-2
        span.screen-title СКАНИРУЕТ КОММЕНТАРИИ
        img(src="./img/screen-2.png")
      .hero__content__landing__sub-title Оператор сразу видит #[br] вопросы покупателей
      .hero__content__landing__caption Не важно, задан вопрос в комментариях #[br] или личном сообщении, #[br] оператор уже будет в чате #[br] с покупателем
      .hero__content__landing__toggle
        .hero__content__landing__toggle__title ТЕПЕРЬ ОПЕРАТОРУ НУЖНО ЗНАТЬ, #[br] У ТЕБЯ ЕСТЬ ИНТЕРНЕТ-МАГАЗИН?
        button.yes ДА
        button.no НЕТ
      .toggle-box
        .wrap-yes
          .hero__content__landing__screen-3
            span.screen-title ИЗУЧИТ ТВОЙ ИНТЕРНЕТ-МАГАЗИН
            img(src="./img/screen-3-yes.png")
          .hero__content__landing__screen-4
            span.screen-title УЗНАЕТ О ТОВАРАХ ПО АРТИКУЛУ
            img(src="./img/screen-4-yes.png")
          .hero__content__landing__sub-title.info Есть сайт? Укажи артикул #[br] товара под постом
          .hero__content__landing__caption Оператор узнает о деталях и наличии #[br] товара по артикулу в описании поста. #[br] Ссылка на сайт должна быть #[br] в «био» инста-профиля
          .info-wrap
            .hero__content__landing__screen-5
              span.screen-title ОТВЕЧАЕТ В INSTAGRAM DIRECT
              img(src="./img/screen-5.png")
            .hero__content__landing__sub-title Оператор ответит на вопросы #[br] и поможет купить
            .hero__content__landing__caption Клиенты получат консультацию* и ссылку #[br] для покупки товара в твоем #[br] интернет-магазине**
            .hero__content__landing__tip *отслеживай диалог в кабинете или Instagram Direct
            .hero__content__landing__tip **еще можно покупать не выходя из Instagram Direct
        .wrap-no
          .hero__content__landing__screen-3
            span.screen-title СОЗДАСТ ИНТЕРНЕТ-МАГАЗИН
            img(src="./img/screen-3-no.png")
          .hero__content__landing__screen-4
            span.screen-title СПРАШИВАЕТ О ТОВАРАХ В ЧАТЕ
            img(src="./img/screen-4-no.png")
          .hero__content__landing__sub-title.info Нет сайта? Ответь #[br] на вопросы о товарах
          .hero__content__landing__caption.store Оператор увидит посты в Instagram #[br] и добавит их в твой
            a.link-info  новый интернет-магазин по ссылке
              span.bold  xxxx.drbt.io #[br]
            a.link-info  новый интернет-магазин по ссылке
              span.bold  xxxx.drbt.io
            info-popup
              i.ic-close
              info-screen4
            | Также уточнит детали и наличие товаров
    .info-block
      .title
        p Подключайся и получишь:
      .list
        ol
          li Опытного оператора в команду, #[br] но в 15 раз дешевле*
          li Адаптивный интернет-магазин, #[br] с платежами и доставкой
          li Сервис по подбору и организации #[br] рекламы через блогеров
      .tooltip
        p *из расчета средней зарплаты оператора 45 тыс.руб. #[br] в месяц, и это только за 8-часовой день с выходными
    .free-connect
      p ХОЧЕШЬ ПОДКЛЮЧИТЬ СВОЕГО #[br] ОПЕРАТОРА? ИЛИ ТЫ САМ ОПЕРАТОР?
      a ЖМИ СЮДА
</template>
<script>

export default {
  data(){
    return {
      isMobile : true
    }
  },
  watch: {
    '$route' (to, from) {
      this.$emit('setList')
    }
  }
}
</script>
