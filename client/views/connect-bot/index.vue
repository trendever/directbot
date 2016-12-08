<style src='./style.pcss'></style>
<template lang="pug">

#connect-bot

  .help-popup(v-if="helpPopup")
    .close(@click.stop="helpPopup = false"): i.ic-close
    .title
      | Возникли проблемы#[br]
      | с подключением оператора#[br]
      | к вашему Instagram магазину?#[br]
    .content
      ul
        li
          | Еще раз проверьте на опечатки логин#[br]
          | и пароль. Логин нужно указывать без @#[br]
        li
          | Если у вашего аккаунта в instagram#[br]
          | разрешена двухфакторная авторизация,#[br]
          | то на ваш email или номер телефон вы#[br]
          | получите код. Код нужно будет ввести#[br]
          | на втором шаге подключения оператора#[br]
        li
          | Возможно instagram попросит#[br]
          | подтвердить подлинность вашего,#[br]
          | аккаунта, для чего вам нужно войти в#[br]
          | свой аккаунт на веб-сайте instagram.com#[br]

        li
          | В редких случаях, когда вы логинитесь#[br]
          | на сторонние сервисы как наш, Instagram#[br]
          | может попросить обносить пароль от#[br]
          | вашего аккаунта. Для этого вам нужно#[br]
          | перейти по ссылке из email, который#[br]
          | вам пришлет Instagram#[br]



  .turn-on-bot(:style='{ height: height }')
    .turn-on-bot__close(@click="$router.push({name:'profile'})"): i.ic-close
    .section
      .column-desktop-50.header
        h1.accept Подключение оператора
      .column-desktop-50.column-desktop-right
        img(src="./directbot.png").logo
        p.paragraph.enter-screen(v-if="!needConfirmCode")
          span.bold Безопасность вашего Instagram #[br(v-if="!isMobile")] профиля очень важна для нас! #[br]
          span.light Поэтому мы не храним пароль #[br] профиля и используем его только #[br] при подключения бота
        p.paragraph.enter-code-screen(v-if="needConfirmCode")
          span.bold Пожалуйста, #[br] введите 6-ти значный код, #[br]
          span.light высланный на email или телефон, #[br] указанные при регистрации #[br] профиля
          span.bold  {{ login }}
          span.light  в Instаgram
        p.paragraph.code-accept(v-if="false")
          span.bold Код подтвержден #[br]
          span.light Нажмите Подключить оператора #[br(v-if="!isMobile")] еще раз
      .column-desktop-50
        .bottom-container(:class='{"opened-key-board":!showTitleSlider}')
          .input-container
            .input.name(v-if="!needConfirmCode")
              i.ic-insta-name
              input(type='text',
                autocomplete="off",
                autocorrect="off",
                autocapitalize="off",
                spellcheck="false",
                :class=' {error: errorLogin} ',
                @keydown.enter='connectBot()',
                v-model='login',
                placeholder='Введите свое Instagram имя')
              .input__clear-btn(
                v-if='login',
                @click='login = ""')
                i.ic-close.clear
            .input.phone(v-if="!needConfirmCode", id="pass-inp")
              i.ic-pass
              input(type='text',
                autocomplete="off",
                autocorrect="off",
                autocapitalize="off",
                spellcheck="false",
                :class=' {error: errorPhone} ',
                @keydown.enter='connectBot()',
                v-model='password',
                placeholder='Введите пароль от Instagram')
              .input__clear-btn(
                v-if='phone')
                i.ic-close.clear
            .input(id="code", v-if="needConfirmCode")
              i.ic-code
              input(
                v-model="code",
                @keydown.enter='confirmCode',
                placeholder='Введите код')
          .btn-container

            button.btn.btn_primary.__red.__xl.fast__big__btn.btn_fixed-bottom(
              v-if="connectProcess") ПОДКЛЮЧЕНИЕ...
            button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom(
              v-if="!needConfirmCode && !connectProcess",
              @click='connectBot') ПОДКЛЮЧИТЬ ОПЕРАТОРА
            button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom(
              v-if="needConfirmCode && !connectProcess",
              @click='confirmCode') ПОДТВЕРДИТЬ
            .link-container.new-sms
              a.link-bottom(@click="helpPopup = true")
                | Мне нужна помощь

</template>

<script type='text/babel'>
import * as accountService from 'services/account';
import * as profileService from 'services/profile';

export default {

  data(){

    let instagram_username = profileService.getProfile().user.instagram_username;

    return {
      code: '',
      password: '',
      login: instagram_username || '',
      needConfirmCode: false,
      connectProcess: false,
      helpPopup: false
    }

  },
  methods:{

    connectBot(){
      this.connectProcess = true;
      accountService

        .add( this.login, this.password )

        .then(data=>{
          this.connectProcess = false;
          if(!data.need_code && data.success){
            this.$router.push( { name: 'profile' } );
            return;
          }

          if(data.need_code){

            this.needConfirmCode = true;

          }

        }).catch(err=>{
          this.connectProcess = false;
        })


    },

    confirmCode() {
      this.connectProcess = true;
      accountService
        .confirm(this.code)
        .then(data=>{
          this.connectProcess = false;
          if(data !== null) {

            this.$router.push( { name: 'profile' } );
            return;

          }

        })
        .catch(err=>{
          this.connectProcess = false;
        })

    }

  }

}
</script>
