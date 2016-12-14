<style src="./style.pcss"></style>
<template lang="pug">

#confirm
  .signup.confirm(:style='{ height: containerHeight }')
    .signup__close.__hello(v-on:click='closePage'): i.ic-close
    .section
      h1.accept(v-if='!isCompleted') Подтвердите телефон
      h1.accept(v-if='isCompleted') Номер подтвержден
      .middle-container#mid(:class="{'has-another-name': anotherName}")
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
                v-on:click="$refs.confirmField.focus()"
                v-on:keyup='onInput',
                v-on:focus='onFocus',
                v-on:keydown.enter='onButton()',
                ref="confirmField",
                v-model='code',
                placeholder='9999',
                autocomplete="off",
                autocorrect="off",
                autocapitalize="off",
                spellcheck="false",
                id="conf_inp")

      .bottom-container.__fixed-width
        template(v-if="isMobile")
          .btn-container-mobile
            div.link-div
              a.link-bottom(href='#',
                v-if='!isCompleted',
                v-show='needNewSMS'
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
          .link-container
            a.link-bottom.new_sms(href='#',
              v-if='!isCompleted',
              v-show='needNewSMS'
              v-on:click.prevent='sendSMS') Отправить новый код

</template>

<script>
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
      code: '',
      errorCode: false,
      isCompleted: false,
      containerHeight: '',
      text_header: TEXT_HEADER.DEFAULT,
      needNewSMS: false,
      anotherName: ''
    };
  },

  beforeRouteEnter(from, to, next){

    if (!store.getters.authData.phone && !store.getters.authData.username){
      next(vm=>{
        vm.$router.push( { name: 'auth' } );
      });
    }

    next();
  },

  mounted() {

    this.$nextTick(()=>{
      //прилипание кнопки
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
  },
  computed: {
    isDisabled() {
      return (this.code.length !== 4) && !this.isCompleted;
    },
    isMobile(){
      return window.browser.mobile;
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
        setTimeout( () => this.needNewSMS = true, 7000);
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
      this.$refs.confirmBtn.focus();
      this.anotherName = user.name !== this.authData.username ? user.name : '';
      this
        .authUser( { user, token } )
        .then(() => {
          this.$root.$emit('checkbot-after')
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

      setTimeout( () => this.needNewSMS = true, 7000);

      auth.sendPassword(this.authData.phone).then( data => {

        this.$router.push({ name: 'comfirm' })

      })

    },
    closePage() {
      //mixpanel.track('Close confirm-sms Page');
      if (window.history.length > 2) {
        this.$router.push(window.history.back(2));
      } else {
        this.$router.push({name: 'home'});
      }
    },
  },
}


</script>
