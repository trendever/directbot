<style src="./style.pcss"></style>
<template lang="pug">
#auth
  .signup(:style='{ height: height }')
    .signup__close.__hello(v-on:click.stop='closePage'): i.ic-close
    .section
      .column-desktop-50.head(v-if="showTitleSlider")
        h1.accept(v-if="!fakeReg") Вход или регистрация
        h1.accept(v-if="fakeReg") Регистрация

      .column-desktop-50.column-desktop-right
        template(v-if="showTitleSlider")
          img(v-if="isTrendever" src="./img/Trendever_reg_img.svg").logo.trndvr
          img(v-else src="./img/directbot.png").logo
          .block(style="height:129px")
          //-p.paragraph Перед подключением оператора, #[br] создайте или войдите #[br(v-if="isMobile")] в свою #[br(v-if="!isMobile")] учетную запись

        //-template(v-if="fakeReg")
          .logo.fake-logo
            img(src="./img/auth-logo.png")
          .reg
            p Войдите или зарегистрируйтесь,
              br
              | {{fakeText}}
              br
              span.bold {{fakeData}}

      .column-desktop-50(:class="{'instagram-browser': isInstagram}")
        .bottom-container(:class='{"opened-key-board":!showTitleSlider}')
          .input-container
            .input
              i.ic-insta-name
              input(type='text',
                ref="inputLogin",
                autocomplete="off",
                autocorrect="off",
                autocapitalize="off",
                spellcheck="false",
                :class=' {error: errorLogin} ',
                v-on:click.stop="focusInput($event)",
                v-on:focus.prevent='onFocusLogin',
                v-on:keydown.enter='sendSMS()',
                v-on:blur="blurInput($event)",
                v-model='login',
                :placeholder='placeholder')
              .input__clear-btn(
                v-if='login',
                v-on:click.stop='login = "", dublicate = false, $refs.inputLogin.focus()')
                i.ic-close.clear
            .input.phone
              i.ic-mobile-phone
              input.second-input(type='tel',
                ref="inputPhone",
                autocomplete="off",
                autocorrect="off",
                autocapitalize="off",
                spellcheck="false",
                :class=' {error: errorPhone} ',
                v-on:click.stop="focusInput($event)",
                v-on:focus.prevent='onFocusPhone',
                v-on:keydown.enter='sendSMS()',
                v-on:blur="blurInput($event)",
                v-model='phone',
                placeholder='Введите номер телефона')
              .input__clear-btn(
                v-if='phone',
                v-on:click.stop='phone = "", dublicate = false, $refs.inputPhone.focus()')
                i.ic-close.clear
          .btn-container
            button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom(
              v-on:click='sendSMS') Отправить код
            //-.link-container(v-if="false")
              a.link-bottom( v-on:click.prevent='onClickLink') Мне нужна помощь
            .link-container
              a.link-bottom.some-left(v-on:click.stop='conditions')
                | Условия использования

</template>

<script>
import  { keyboardButtomToBottom } from 'root/utils';
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
  errorNoData: 'Заполните поле',
  errorDublicateFormat: [
  'Имя или номер',
  'уже заняты'
  ]
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
      instagram: true,
      showTitleSlider: true,
      dublicate: false,
      loginFocused: false,
      phoneFocused: false,
      isBlurBetweenInput: false
    }
  },
  created(){
    if(this.$store.getters.isAuth && !this.$store.getters.isFake) {
      localStorage.setItem('active-account', true);
      this.$router.push({name: 'profile'})
    }
    this.scrollRemove = listen(document, 'touchmove',e=>{e.preventDefault()})
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
    this.scrollRemove.remove();
  },
  computed: {
    ...mapGetters([
      'authData',
      'callbackOnSuccessAuth',
      'isFake',
    ]),
    placeholder(){
      return this.isFake && window.fakeAuth ? PLACEHOLDER.fakeMode : PLACEHOLDER.instagramMode;
    },
    fakeReg(){
      if (window.fakeAuth){
        return true;
      }
      return false;
    },
    fakeText(){
      if(window.fakeAuth) return window.fakeAuth.text;

    },
    fakeData(){
      if(window.fakeAuth) return window.fakeAuth.data;
    }
  },
  methods: {
    conditions(){
      if(!this.isTrendever){
        this.$router.push({name: "popup", params: { id: "conditions"} } )
        return;
      }
      this.$router.push({name: "agreement" } )
    },
    ...mapActions([
      'saveAuthData',
      'signup',
      'setData',
      'signin'
    ]),
    closePage() {
      //mixpanel.track('Close Signup Page');
      this.save();
      this.$router.push({name: 'home'});

    },

    focusInput(e){
      e.target.focus();
      if(this.isIos && !window.browser.instagram)return
      //keyboardButtomToBottom();

    },
    save() {
      this.saveAuthData({
        username: this.login,
        phone: this.phone,
        instagram: this.instagram,
      })
    },

    sendSMS() {

      this.isBlurBetweenInput = false;

      if(this.login === null) {
        this.login = '';
      }


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


      if (this.isFake && window.fakeAuth){
        this.setData().then( ()=> {
          this.$router.push({ name: 'confirm' });
        }).catch( (errorData) => {

          if(errorData.log_list){
           if( errorData.log_list[0].user_msg === 'rpc error: code = 2 desc = User exists'){
            this.dublicate = true;
           }
          }

          this.signin().then( ()=> {
            this.setCallbackOnSuccessAuth(()=>{
              this.$router.push({name: 'home'});
            })
            this.$router.push({ name: 'confirm' });
          }).catch( (error) => {
             this.onErrorPhone();
             this.onErrorLogin()
          })
        })
      }else{
        //Logout possible fake user
        this.$store.dispatch('logOut');

        this.signup().then( ()=> {
          this.$router.push({ name: 'confirm' });
        }).catch( (error) => {
          this.onErrorPhone();

        })
      }

    },

    blurInput(e){

      if (browser.android)
        this.showTitleSlider =  document.body.scrollHeight >= 1000 || document.body.scrollWidth > 750;
    },

    onErrorPhone() {
      this.phone = '';
      this.errorPhone = true;
      this.phone = this.dublicate ? PLACEHOLDER['errorDublicateFormat'][1] : PLACEHOLDER['errorPhoneFormat'];
    },

    // remove error class from <input> phone
    onFocusPhone() {
      /*if (browser.android)
        this.showTitleSlider = false;*/
      if (this.errorPhone) {
        this.errorPhone = false;
        this.phone = '';
      };
    },
    onErrorLogin() {
      this.login = this.dublicate ? PLACEHOLDER['errorDublicateFormat'][0] : TEXT_LINK['errorLoginMesage'];
      this.errorLogin =  true;
    },

    // clear login and remove error class from <input>
    onFocusLogin() {
      /*if (browser.android)
        this.showTitleSlider = false;*/
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
