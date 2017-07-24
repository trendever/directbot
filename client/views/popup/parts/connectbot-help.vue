<style lang="postcss">
@import 'style/vars/vars.pcss';
.connect-bot {
  .link-help {
    padding: 50px 0;
    text-align: center;
    background: $color__brand-dark;
  }
}

</style>

<template lang="pug">

.connect-bot

  .title

    .title-head 
      | Возникли проблемы#[br]
      | с подключением оператора#[br]
      | к вашему Instagram магазину?#[br]

  .content

    ul
      li
        | Еще раз проверьте на опечатки логин#[br(v-if="isMobile")]
        | и пароль. Логин нужно указывать без @
      li
        | Если у вашего аккаунта в Instagram#[br(v-if="isMobile")]
        | разрешена двухфакторная авторизация,#[br(v-if="isMobile")]
        | то на ваш email или номер телефон вы#[br(v-if="isMobile")]
        | получите код. Код нужно будет ввести#[br(v-if="isMobile")]
        | на втором шаге подключения оператора
      li
        | Возможно Instagram попросит#[br(v-if="isMobile")]
        | подтвердить подлинность вашего,#[br(v-if="isMobile")]
        | аккаунта, для чего вам нужно войти в#[br(v-if="isMobile")]
        | свой аккаунт на веб-сайте 
        a(href="instagram.com") instagram.com

      li
        | В редких случаях, когда вы логинитесь#[br(v-if="isMobile")]
        | на сторонние сервисы как наш, Instagram#[br(v-if="isMobile")]
        | может попросить обновить пароль от#[br(v-if="isMobile")]
        | вашего аккаунта. Для этого вам нужно#[br(v-if="isMobile")]
        | перейти по ссылке из email, который#[br(v-if="isMobile")]
        | вам пришлет Instagram

    .link-help
      .link-bottom(@click.stop="help")
        | Мне еще нужна помощь

</template>

<script>
import config from 'root/../config';
export default {

  methods: {

    help(){
      this.$store.dispatch('createLead', config.support_id )
        .then(
          ( lead ) => {
            if ( lead !== undefined && lead !== null ) {
              this.$router.push( { name: 'chat', params: { id: lead.id } } )
            }
          }
        )
    }

  }
} 


</script>
