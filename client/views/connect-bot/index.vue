<style src='./style.pcss'></style>
<template lang="pug">

#connect-bot

  .turn-on-bot(:style='{ height: containerHeight }')
    .turn-on-bot__close(@click="$router.push({name:'profile'})"): i.ic-close
    .section
      .column-desktop-50.head
        h1.accept Подключение Instagram
      .column-desktop-50.column-desktop-right
        img(src="./directbot.png").logo
        p.paragraph.enter-screen(v-if="!needConfirmCode")
          span.bold Безопасность вашего Instagram #[br] профиля очень важна для нас! #[br]
          span.light Поэтому мы не храним пароль #[br] профиля и используем его только #[br] при подключении бота
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
                @click="$refs.textInput.focus()",
                ref="textInput",
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
                @click='login = "", $refs.textInput.focus()')
                i.ic-close.clear
            .input.phone(v-if="!needConfirmCode", id="pass-inp")
              i.ic-pass

              input(
                v-if='!errorPassword',
                ref="passwordInput",
                @click="$refs.passwordInput.focus()",
                type="password",
                autocomplete="off",
                autocorrect="off",
                autocapitalize="off",
                spellcheck="false",
                :class=' {error: errorPassword} ',
                @keydown.enter='connectBot()',
                v-model='password',
                placeholder='Введите пароль от Instagram')

              input(
                ref="errorPasswordInput",
                v-if="errorPassword"
                type='text',
                autocomplete="off",
                autocorrect="off",
                autocapitalize="off",
                spellcheck="false",
                :class=' {error: errorPassword} ',
                @keydown.enter='connectBot()',
                v-model='password',
                placeholder='Введите пароль от Instagram',
                @click='password = "", errorPassword=false,this.$refs.errorPasswordInput.focus()')

              .input__clear-btn(
                v-if='password',
                @click='closePassword')
                i.ic-close.clear
            .input(id="code", v-if="needConfirmCode")
              i.ic-code
              input(
                ref="codeInput"
                v-model="code",
                @click="$refs.codeInput.focus()",
                @keydown.enter='confirmCode',
                placeholder='Введите код')
          .btn-container

            button.btn.btn_primary.__red.__xl.fast__big__btn.btn_fixed-bottom(
              v-if="connectProcess") ПОДКЛЮЧЕНИЕ...
            button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom(
              v-if="!needConfirmCode && !connectProcess",
              @click='connectBot') ПОДКЛЮЧИТЬ INSTAGRAM
            button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom(
              v-if="needConfirmCode && !connectProcess",
              @click='confirmCode') ПОДТВЕРДИТЬ
            .link-container.new-sms
              a.link-bottom(@click.stop="$router.push({name: 'popup', params: {id: 'connect'}})")
                | Мне нужна помощь

</template>

<script>
import * as accountService from 'services/account';
import * as profileService from 'services/profile';
import listen from 'event-listener';

export default {

  data(){

    let instagram_username = profileService.getProfile().user.instagram_username;

    return {
      showTitleSlider: true,
      code: '',
      password: '',
      login: '' || instagram_username,
      errorLogin: false,
      needConfirmCode: false,
      connectProcess: false,
      containerHeight: '',
      errorPassword: ''
    }

  },
  mounted(){

    this.$nextTick(()=>{

      //прилипание кнопки
      this.containerHeight = `${ document.body.scrollHeight }px`;
      const onResize = () => {
        this.containerHeight = `${ document.body.scrollHeight }px`;
      };
      this.resize = listen( window, 'resize', onResize );
      onResize();

    })

  },

  beforeDestroy(){
    this.resize.remove()
  },
  methods:{
    closePassword(){
      this.password = "",
      this.errorPassword=false,
      this.$refs.passwordInput.focus()
    },
    connectBot(){
      this.connectProcess = true;
      accountService

        .add( this.login, this.password )

        .then(data=>{
          this.connectProcess = false;
          if(!data.need_code && data.success){
            this.$root.$emit('checkbot-after')
            this.$router.push( { name: 'profile' } );
            return;
          }

          if(data.need_code){

            this.needConfirmCode = true;

          }

        }).catch(err=>{

          this.errorPassword = this.password = "Неверный пароль"
          this.secretPassword = true;
          this.connectProcess = false;

        })


    },

    confirmCode() {
      this.connectProcess = true;
      accountService
        .confirm(this.login,this.code, this.password)
        .then(data=>{
          this.connectProcess = false;
          if(data !== null) {
            this.$root.$emit('checkbot-after')
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
