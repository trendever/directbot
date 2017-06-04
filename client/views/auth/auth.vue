<template lang="pug">
#auth
  .close-page(@click="$router.push({name: 'home'})"): i.ic-close
  .page-title.mobile {{ title }}

  .content-wrap

    .body-section
      img(v-if="isTrendever" src="./img/Trendever_reg_img.svg").trend
      img(v-else src="./img/directbot.png").direct

    .form-section
      .page-title.desktop {{ title }}
      .name
        i.ic-insta-name
        input(
          :class='{error: nameError}',
          ref="name",
          v-model="name",
          placeholder="Введите свое Instagram имя",
          @focus="focusName",
          @click="$event.target.focus()",
          autocomplete="off",
          autocorrect="off",
          autocapitalize="off",
          @keyup.enter="request"
        )
        i.ic-close(v-if="name",
          @click="name='',$refs.name.focus()")

      .phone
        i.ic-mobile-phone
        input(
          type='tel',
          :class='{error: phoneError}',
          ref="phone",
          v-model="phone",
          placeholder="Введите номер телефона",
          @focus="focusPhone",
          @click="$event.target.focus()"
          autocomplete="off",
          autocorrect="off",
          autocapitalize="off",
          @keyup.enter="request"
        )
        i.ic-close(v-if="phone",
          @click="phone='',$refs.phone.focus()")


      .send-btn(@click="request") ОТПРАВИТЬ КОД
      .bottom-link(@click="openConditions") Условия использования





</template>

<script>
import { formatPhone } from 'root/utils';
import { signup } from 'services/auth';
import { mapActions, mapGetters } from 'vuex';
import listen from 'event-listener';

export default {

  computed:{
    title(){
      return this.fakeReg ? 'Регистрация' : 'Вход или регистрация'
    },
    fakeReg(){
      return window.fakeAuth ? true : false
    },
    ...mapGetters([
      'authData',
      'callbackOnSuccessAuth',
      'isFake',
    ]),
  },

  data () {

    return {
      phone: '',
      phoneError: false,
      name: '',
      nameError: false,
      instagram: true

    };

  },
  mounted(){
    this.scrollRemove = listen(document, 'touchmove',e=>{e.preventDefault()})
    this.phone = this.authData.phone;
    this.login = this.authData.username;
    this.instagram = this.authData.instagram;
  },
  beforeDestroy(){
    this.scrollRemove.remove();
  },
  methods: {
    ...mapActions([
      'saveAuthData',
      'signup',
      'setData',
      'signin'
    ]),

    save() {
      this.saveAuthData({
        username: this.name,
        phone: this.phone,
        instagram: this.instagram,
      })
    },

    openConditions(){
      if(!this.isTrendever){
        this.$router.push({name: "popup", params: { id: "conditions"} } )
        return;
      }
      this.$router.push({name: "agreement" } )
    },

    request(){

      //VALIDATE NAME
      if(!this.name){
        this.nameError = true;
        this.name = 'Введите Instagram имя..';
        return;
      }

      if(this.name.match(/[а-яё]+/g) !== null){
        this.nameError = true;
        this.name = 'Только латинские буквы..';
        return;
      }

      //VALIDATE PHONE
      if (!this.phone.replace(/\D/g,'').length) {
        this.phoneError = true;
        this.phone = 'Неверный формат номера..';
        return;
      }

      if(this.name && this.phone) {

        this.save();

        if (this.isFake && window.fakeAuth){
          this.setData().then( ()=> {
            this.$router.push({ name: 'confirm' });
          }).catch( (errorData) => {

            if(errorData.log_list){
             if( errorData.log_list[0].user_msg === 'rpc error: code = 2 desc = User exists'){
              this.onErrorRequest({}, true)
             }
            }

            this.signin().then( ()=> {
              this.setCallbackOnSuccessAuth(()=>{
                this.$router.push({name: 'home'});
              })
              this.$router.push({ name: 'confirm' });
            }).catch( (err) => {
              this.onErrorRequest(err)
            })
          })

        } else {
          //Logout possible fake user
          this.$store.dispatch('logOut');

          this.signup().then( ()=> {

            this.$router.push({ name: 'confirm' });

          }).catch( (err) => {

            this.onErrorRequest(err)

          })

        }

      }

    },

    onErrorRequest(err, dublicate=false){

      if(err.user_msg === "Invalid instagram name"){
        this.nameError=true
        this.name="Не валидное Instaram имя.."
      }
      if(err==6){
        this.phoneError=true
        this.phone='Введете верный номер..'
      }

      if(dublicate){
        this.nameError=true
        this.name="Имя или номер"
        this.phoneError=true
        this.phone='уже заняты'
      }

    },

    //FOCUSES
    focusName(){
      if(this.nameError){
        this.nameError=false
        this.name=''
      }
    },
    focusPhone(){
      if(this.phoneError){
        this.phoneError=false
        this.phone=''
      }
    }

  }
};
</script>
<style lang="postcss">

@import 'style/vars/vars.pcss';

#auth {

  hidden: true;
  color: white;
  text-align: center;
  background-color: $color__brand-dark;
  background-attachment: fixed;
  height: 100%;

  @media ( --tabletandless ) {
    background-size: 97%;
    background-position: 40px 80px;
  }

  .close-page {
    @mixin close__page;
    .standalone & {
      margin-top: $standalone__fake__height;
    }
  }

  .content-wrap {
    overflow: hidden;
    max-width: 1050px;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    @media (--overtablet) {
      padding-top: 150px;
      flex-direction: row-reverse;
    }

    @media (--tabletandless){
      justify-content: space-around;
      flex-direction: column;
      height: calc( 100% - 230px);
    }

    .form-section, .body-section {
      width: 420px;
      @media (--tabletandless) {
        min-height: 362px;
        width: 100%;
      }
    }

    .body-section .title {
      @media screen and (max-height: 1170px) and (max-width: 750px){
        margin-top: 15px;
      }
    }

    .body-section {
      @media (--tabletandless){
        margin: 0;
        max-height: 607px;
      }

      img {
        position: relative;
        display: inline-block;

        &.direct {
          @media (--tabletandless){
            max-width: 220px;
            transform: translateY(50%);
          }
          @media (--overtablet){
            max-width: 160px;
            transform: translate(70px, 120px);
          }
        }
        &.trend {

          @media screen and (max-height: 1160px) and (max-width: 768px){
            transform: translateY(0%) !important;
          }

          @media (--tabletandless){
            transform: translateY(15%) translateX(-5px);
          }


          @media (--overtablet){
            width: 400px;
            transform: translate(60px, 50px);
          }
        }
      }
    }
  }

  .page-title {
    display: none;

    .standalone & {
      padding-top: calc($standalone__fake__height + 40px) !important;
    }

    &.desktop {
      @media (--overtablet){
        display: block;
        font-size: $font__medium;
        text-align: left;
        margin-bottom: 100px;
      }
    }

    &.mobile {
      @media (--tabletandless){
        font-size: 40px;
        padding-top: 40px;
        display: block;
        font-family:$font__family__semibold;
      }
    }
  }

  .form-section {

    @media (--tabletandless) {
      padding: 70px 15px 22px 100px;
    }

    .send-btn {

      @mixin auth__button;

      background: $color-orange;

      @media (--overtablet){
        position: relative;
        width: 420px;
        height: 77px;
        border-radius: 5px;
        line-height: 77px;
        font-size: $font__normal;
        color: black;
        cursor: pointer;
        margin-top: 50px;

      }

    }

    .bottom-link {

      @mixin standart__font;
      cursor: pointer;
      border-bottom: 1px solid white;
      color: white;
      opacity: 0.5;
      display: inline-block;

      @media (--overtablet) {
        margin-top: 10px;
      }

      @media (--tabletandless){
        margin-top: 50px;
        transform: translateX(-42px)

      }
    }

    .phone, .name {
      border-bottom: 1px solid rgba(255,255,255, 0.4);
      position: relative;
      margin-left: 40px;
      margin-top: 23px;
      padding-left: 0;
      width: 580px;
      @media (--tabletandless){
        transform: translateX(-18px);
      }
      @media (--overtablet){
        width: 370px;
      }
      i {
        position: absolute;
        top: 0;
      }

      i.ic-close {
        top: -5px;
        right: -20px;
        font-size: 2rem;
        padding: 20px;
        cursor: pointer;

        @media (--overtablet) {
          font-size: 20px;
          top: -3px;
          opacity: .5;
        }

        &:hover {
          opacity: 1;
        }

      }

      i.ic-insta-name {
        font-size: 44px;
        top: 5px;
        left: -79px;
        @media (--overtablet){
          top: 8px;
          font-size: 28px;
          left: -47px;
        }
      }

      i.ic-mobile-phone {
        top: 5px;
        font-size: 61px;
        left: -89px;
        @media (--overtablet){
          top: 8px;
          font-size: 36px;
          left: -52px;
        }
      }


    }

    input {
      display: inline-block;
      padding: 0;
      width: 100%;
      font-family: $font__family__light;
      height: 4rem;
      background: transparent;
      outline: none;
      border: none;
      color: white;
      box-shadow: none;


      @mixin standart__font;

      @media (--overtablet){
        height: 50px;
      }

      &::placeholder {
        font-family: $font__family__light;
        color: rgba(255,255,255, 0.4);
      }

      &.error {
        color: $color-orange;
      }
    }
  }
}


</style>

