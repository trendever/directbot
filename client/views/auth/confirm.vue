<style src="./style.pcss"></style>
<template lang="pug">

#confirm
  .signup.confirm(:style='{ height: containerHeight }')
    .signup__close.__hello(v-on:click='closePage'): i.ic-close
    .section
      h1.accept(v-if='!isCompleted') Подтвердите телефон
      h1.accept(v-if='isCompleted') Номер подтвержден
      .middle-container#mid(
        :class="{'has-another-name': anotherName,'ios-input': focused,'instagram-browser': isInstagram && focused, 'chrome-ios': isChromeIos && focused }")
        .thanks-wrap(v-if='isCompleted')
          h1 Спасибо!

          span.another-name-desc(v-if="anotherName && !isMobile")
            | Но вы уже регистрировались ранее с именем&nbsp
            span.inst-name {{ anotherName }}.#[br]
            | Имя можно изменить в настройках своего профиле,#[br]
            | нажав на иконку&nbsp
            i.ic-options_menu

          span.another-name-mobile(v-if="anotherName && isMobile")
            .top-text
              | Но вы уже регистрировались #[br]
              | ранее с другим именем #[br]
              span.inst-name {{ anotherName }} #[br]
            .bottom-text
              | Имя можно изменить #[br]
              | в настройках своего профиля,#[br]
              | нажав на иконку#[br]
              i.ic-options_menu

        template(v-else)
          p(v-if='!isCompleted',
            :class='{ error: errorCode }') {{ text_header }}
          .input-container
            .input.confirm-input.conf
              input(type='tel',
                autofocus
                @blur="blurInput",
                v-on:click="focusClick"
                v-on:keyup='onInput',
                v-on:focus='onFocus',
                v-on:keydown.enter='onButton()',
                ref="confirmField",
                v-model='code',
                placeholder='',
                autocomplete="off",
                autocorrect="off",
                autocapitalize="off",
                spellcheck="false",
                id="conf_inp")

      .bottom-container.__fixed-width
        template(v-if="isMobile")
          .btn-container-mobile
            div.link-div(v-if="needNewSMS")
              a.link-bottom(href='#',
                v-if='!isCompleted',
                v-on:click.prevent='sendSMS') Отправить новый код
            button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom(
              :disabled='isDisabled',
              ref="confirmBtn",
              v-on:keydown.enter='onButton()',
              v-on:click='onButton') {{ isCompleted ? 'Продолжить' : 'Подтвердить' }}
        template(v-else)
          .btn-container
            button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom.accept_btn(
              :disabled='isDisabled',
              ref="confirmBtn",
              v-on:keydown.enter='onButton()',
              v-on:click='onButton') {{ isCompleted ? 'Продолжить' : 'Подтвердить' }}
          .link-container(v-if="needNewSMS")
            a.link-bottom.new_sms(href='#',
              v-if='!isCompleted',
              v-on:click.prevent='sendSMS') Отправить новый код

</template>

<script>
import { keyboardButtomToBottom } from 'root/utils';

import listen from 'event-listener';
import { mapActions, mapGetters } from 'vuex';

import store from 'root/store';

import * as auth from 'services/auth';

import { get as getUser} from 'services/user';

const TEXT_HEADER = {
  DEFAULT: 'Введите код из sms',
  ERROR: 'Ошибка, попробуйте снова',
};

export default {

  data(){
    return {
      alreadySended: false,
      focused: false,//для сдвига для мобильных устройств
      code: '',
      errorCode: false,
      isCompleted: false,
      containerHeight: '',
      text_header: TEXT_HEADER.DEFAULT,
      needNewSMS: false,
      anotherName: '',
      isChromeIos: window.browser.ios && window.browser.chrome_mobile
    };
  },

  beforeRouteEnter(from, to, next){

    if (!store.getters.authData.phone && !store.getters.authData.username){
      next(vm=>{
        //vm.$router.push( { name: 'auth' } );
      });
    }

    next();
  },
  created(){
    this.scrollRemove = listen(document, 'touchmove',e=>{e.preventDefault()})
  },
  mounted() {
    setTimeout(()=>this.needNewSMS=true,15000)
    this.$nextTick(()=>{

      this.containerHeight = `${ document.body.scrollHeight }px`;
      const onResize = () => {
        this.containerHeight = `${ document.body.scrollHeight }px`;
      };
      this.resize = listen( window, 'resize', onResize );
      onResize();



      this.$refs.confirmField.focus();
    })

  },
  beforeDestroy(){
    this.resize.remove();
    this.scrollRemove.remove()
  },
  //computed property
  computed: {
    isDisabled() {
      return (this.code.length !== 4);
    },
    ...mapGetters([
      'callbackOnSuccessAuth',
      'authData'
    ])
  },
  methods: {
    ...mapActions([
      'executeCallbackOnSuccessAuth',
      'authUser'
    ]),

    focusClick(){
      this.$refs.confirmField.focus()
      keyboardButtomToBottom();

      if(this.isIos){
        this.focused = true;
      }
    },

    blurInput(){
      this.focused = false;
    },
    // input only numbers
    onInput(e) {
      this.code = this.code.replace(/[^0-9]/g, '');
      if (this.code.length >= 4) {
        this.code = this.code.slice(0, 4);
      }
    },
    onButton() {
      if(this.anotherName){
        if (!this.callbackOnSuccessAuth) {
            setTimeout(()=>{ this.$router.push({name: 'profile'}) }, 1000);
            return;
          } else {
            this.executeCallbackOnSuccessAuth()
            return;
          }
      }
      if (this.isDisabled) {
        return;
      }
      if (!this.isCompleted) {
        this.onConfirm();
        if(!this.alreadySended){
          setTimeout( () =>{
            this.needNewSMS = true;
            this.alreadySended = true;
          }, 8000);
        }
      }
    },
    onConfirm() {
      auth.confirmByCode( this.authData.phone, this.code)
      .then( ({ user, token }) => {
        this.onComplete(user, token);
      }).catch( error => {
        if (error === auth.ERROR_CODES.WRONG_CREDENTIALS) {
          this.onErrorCode();
        }
      })
    },
    onComplete(user, token) {
      this.isCompleted = true;
      this.focused = false;
      this.$refs.confirmBtn.focus();

      if(user.instagram_username) {
        if(user.instagram_username !== this.authData.username){
          this.anotherName = user.instagram_username;
          this.focused = false;
        }
      }



      this
        .authUser( { user, token } )
        .then(() => {

          this.$root.$emit('checkbot-after')

          localStorage.removeItem('fake_action');

          localStorage.setItem('active-account', true);

          if(!this.anotherName) {
            if (!this.callbackOnSuccessAuth) {
              setTimeout( () => this.$router.push( { name: 'profile' } ), 1000);
              return true;
            } else {
              this.executeCallbackOnSuccessAuth()
              return 0;
            }
          }
        });
    },
    onErrorCode() {
      console.log('on error');
      this.errorCode = true;
      this.text_header = TEXT_HEADER.ERROR;
      this.code = '';
    },
    onFocus() {
      if (this.errorCode) {
        this.errorCode = false;
        this.text_header = TEXT_HEADER.DEFAULT;
      }
    },
    sendSMS() {
      this.onFocus();

      this.code = '';

      this.needNewSMS = false;

      setTimeout( () => this.needNewSMS = true, 30000);

      auth.sendPassword(this.authData.phone).then( data => {

        this.$router.push({ name: 'confirm' })

      })

    },
    closePage() {
      //mixpanel.track('Close confirm-sms Page');
      if (window.history.length > 2) {
        window.history.back();
      } else {
        this.$router.push({name: 'home'});
      }
    },
  },
}


</script>
<style type="postcss">


#confirm {
  overflow: hidden;
  height: 100%;

  .middle-container {
    &.ios-input {
      margin-top: 120px;
    }
    &.chrome-ios {
      margin-top: 270px;
    }
  }

}


</style>
