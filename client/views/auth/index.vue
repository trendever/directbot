<style src="./style.pcss"></style>
<template lang="pug">
#auth
  .signup(:style='{ height: height }')
    .signup__close.__hello(v-on:click='closePage'): i.ic-close
    .section
      .column-desktop-50.header(v-if="showTitleSlider")
        h1.accept Вход и регистрация
      .column-desktop-50.column-desktop-right(v-if="showTitleSlider")
        img(src="./img/directbot.png").logo
        p.paragraph Перед подключением оператора, #[br] создайте или войдите #[br(v-if="isMobile")] в свою #[br(v-if="!isMobile")] учетную запись
      .column-desktop-50
        .bottom-container(:class='{"opened-key-board":!showTitleSlider}')
          .input-container
            .input
              i.ic-insta-name
              input(type='text',
                autocomplete="off",
                autocorrect="off",
                autocapitalize="off",
                spellcheck="false",
                :class=' {error: errorLogin} ',
                v-on:focus='onFocusLogin',
                v-on:keydown.enter='sendSMS()',
                v-on:blur="blurInput",
                v-model='login',
                :placeholder='placeholder')
              .input__clear-btn(
                v-if='login',
                v-on:click='login = ""')
                i.ic-close.clear
            .input.phone
              i.ic-mobile-phone
              input(type='tel',
                autocomplete="off",
                autocorrect="off",
                autocapitalize="off",
                spellcheck="false",
                :class=' {error: errorPhone} ',
                v-on:focus='onFocusPhone',
                v-on:keydown.enter='sendSMS()',
                v-on:blur="blurInput",
                v-model='phone',
                placeholder='Введите номер телефона')
              .input__clear-btn(
                v-if='phone',
                v-on:click='phone = ""')
                i.ic-close.clear
          .btn-container
            button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom(
              v-on:click='sendSMS') Отправить sms-код
            .link-container(v-if="false")
              a.link-bottom( v-on:click.prevent='onClickLink') Мне нужна помощь

</template>

<script>

import { mapActions, mapGetters } from 'vuex';

import listen from 'event-listener';

const TEXT_LINK = {
  instagramMode: 'Мне нужна помощь',
  withoutInstagramMode: 'У меня есть Instagram',
  errorLoginLink: 'Мое имя кто-то занял!',
  errorLoginMesage: 'Имя занято, введите другое',
  errorPhoneFormat: 'Неверный формат номера',
  errorWrongCreditionals: '',
  errorloginLang: 'Неверный формат логина',
  errorNoLogin: 'Не указан логин',
  errorNoPhone: 'Не указан номер телефона',
  errorNoData: 'Не указаны ваши данные'
}

const PLACEHOLDER = {
  instagramMode: 'Введите свое Instagram имя',
  fakeMode: 'Instagram имя (не обязательно)',
  withoutInstagramMode: 'Введите свое имя',
  errorPhoneFormat: 'Введите верный номер',
  errorLoginFormat: 'Только латинские буквы...',
  errorNoLogin: 'Введите свое имя',
  errorNoPhone: 'Введите номер телефона',
  errorNoData: 'Заполните поле'
}

export default {

  data(){
    return {
      login: '',
      phone: '',
      errorLogin: false,
      errorPhone: false,
      height: 'static',
      textLink: TEXT_LINK.instagramMode,
      placeholder: (this.isFake) ? PLACEHOLDER.fakeMode : PLACEHOLDER.instagramMode,
      instagram: true,
      showTitleSlider: true
    }
  },

  mounted() {
    this.$nextTick(()=>{
      this.height = `${ document.body.scrollHeight }px`;
      this.phone = this.authData.phone;
      this.login = this.authData.username;
      this.instagram = this.authData.instagram;
      const onResize = () => {
        this.height = `${ document.body.scrollHeight }px`;
        this.showTitleSlider = document.body.scrollHeight >= 1000 || document.body.scrollWidth > 750;
      };
      this.resize = listen( window, 'resize', onResize );
      onResize();
    })
  },
  beforeDestroy(){
    this.resize.remove();
  },
  computed: {
    ...mapGetters([
      'authData',
      'callbackOnSuccessAuth',
      'isFake',

    ])
  },
  methods: {
    ...mapActions([
      'saveAuthData',
      'signup',
      'setData',
      'signin'
    ]),
    closePage() {
      //mixpanel.track('Close Signup Page');
      this.save();

      if (this.isFake){
        console.log("CLOSE AUTH CLICK")
        console.log(window.before)
        if (window.before.name === "chat_list" || window.before.name === "profile"){
        this.$router.push({ name: "home"})
            return
        }
      }

      if (window.history.length > 2) {
        window.history.back();
      } else {
        this.$router.push({name: 'home'});
      }
    },

    save() {
      this.saveAuthData({
        username: this.login,
        phone: this.phone,
        instagram: this.instagram,
      })
    },

    sendSMS() {

      if(!this.login && !this.isFake) {
        this.login = '';
        this.errorLogin = true;
        this.login = PLACEHOLDER['errorNoLogin'];
        return;

      }

      if(this.login.match(/[а-яё]+/g) !== null){
        this.login = '';
        this.errorLogin = true;
        this.login = PLACEHOLDER['errorLoginFormat'];
        return;
      }

      if(!this.phone) {
        this.onErrorPhone();
        return;
      }

      let len = this.phone.replace(/\D/g,'').length;

      if (!len) {
        this.onErrorPhone();
        return;
      }

      this.save();


      if (this.isFake){
        this.setData().then( ()=> {
          this.$router.push({ name: 'comfirm' });
        }).catch( (error) => {
          this.signin().then( ()=> {
            this.setCallbackOnSuccessAuth(()=>{
              this.$router.push({name: 'home'});
            })
            this.$router.push({ name: 'comfirm' });
          }).catch( (error) => {
             this.onErrorPhone();
          })
        })
      }else{
        this.signup().then( ()=> {
          this.$router.push({ name: 'comfirm' });
        }).catch( (error) => {
          this.onErrorPhone();
        })
      }

    },

    blurInput(){
      if (browser.android)
        this.showTitleSlider =  document.body.scrollHeight >= 1000 || document.body.scrollWidth > 750;
    },

    onErrorPhone() {
      this.phone = '';
      this.errorPhone = true;
      this.phone = PLACEHOLDER['errorPhoneFormat'];
    },

    // remove error class from <input> phone
    onFocusPhone() {
      if (browser.android)
        this.showTitleSlider = false;
      if (this.errorPhone) {
        this.errorPhone = false;
        this.phone = '';
      };
    },

    onErrorLogin() {
      this.login =  TEXT_LINK['errorLoginMesage'];
      this.errorLogin =  true;
    },

    // clear login and remove error class from <input>
    onFocusLogin() {
      if (browser.android)
        this.showTitleSlider = false;
      if (this.errorLogin) {
        this.errorLogin = false;
        this.login =  '';
      };
    },

    // change to hint text
    onClickLink() {
      this.instagram = !this.instagram;
      var toggleClassBlock = document.querySelector('.input.name i'); // TODO Сделай чезе v-el или v-ref
      if(toggleClassBlock !== null){
        if (!this.instagram) {
          this.textLink = TEXT_LINK.withoutInstagramMode;
          this.placeholder = PLACEHOLDER.withoutInstagramMode;
          // TODO Классы тоже можно вешать через vue
          toggleClassBlock.classList.remove('ic-insta-name');
          toggleClassBlock.classList.add('ic-user');
        } else {
          this.textLink = TEXT_LINK.instagramMode;
          this.placeholder = PLACEHOLDER.instagramMode;
          toggleClassBlock.classList.remove('ic-user');
          toggleClassBlock.classList.add('ic-insta-name');
        }
      }
    }
  },
}

</script>

<style lang="postcss">

#auth {

  height: 100%;
  overflow: hidden;

  form {

    max-width: 70%;
    display: block;
    margin: 50px auto * auto;
    font-size: 2rem;
    text-align: center;

    label {

      display: block;

    }

  }

}

</style>
