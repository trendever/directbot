<template lang="pug">
#blogger-request
  .close-page(@click="$router.push({name: 'dress-blogger'})"): i.ic-close
  .page-title.mobile Вход и регистрация
  .content-wrap

    .body-section
      .title #ОденьБлогера
      .body
        h1 Фонд одевания блогеров
        p Приглашаем Instagram-блогеров#[br] одеваться за наш счет

    .form-section
      .page-title.desktop Вход и регистрация
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
        )
        i.ic-close(v-if="name",
          @click="name='',$refs.name.focus()")

      .phone
        i.ic-mobile-phone
        input(
          :class='{error: phoneError}',
          ref="phone",
          v-model="phone",
          placeholder="Введите номер телефона",
          @focus="focusPhone",
          @click="$event.target.focus()"
          autocomplete="off",
          autocorrect="off",
          autocapitalize="off",
        )
        i.ic-close(v-if="phone",
          @click="phone='',$refs.phone.focus()")


      .send-btn(@click="request") ОТПРАВИТЬ
      .bottom-link Условия использования





</template>

<script>
import { formatPhone } from 'root/utils';
import { signup } from 'services/auth';

export default {

  data () {

    return {
      phone: '',
      phoneError: false,
      name: '',
      nameError: false
    };

  },

  methods: {
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

        let phone = formatPhone(this.phone, true);

        signup(phone, this.name, true, 'dressblogger')

          .then(data=>{
            console.log('%cБлоггер успешно добавлен',Green30)
            this.$router.push({name: 'dress-blogger'})
          })
          .catch(err=>{
            if(err.user_msg === "Invalid instagram name"){
              this.nameError=true
              this.name="Не валидное Instaram имя.."
            }
            if(err==6){
              this.phoneError=true
              this.phone='Введете верный номер..'
            }
          })

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

#blogger-request {

  color: white;
  text-align: center;
  background-image: url(./images/Bgr-fix-desk.jpg);
  background-attachment: fixed;
  height: 100%;

  @media ( --mobile ) {
    background-image: url(./images/Bgr-fix-mob.jpg);
    background-size: 97%;
    background-position: 40px 80px;
  }

  .close-page {
     @mixin close__page;
  }

  .content-wrap {

    max-width: 1050px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media (--overmobile) {
      padding-top: 150px;
      flex-direction: row-reverse;
    }

    > div {

      @media (--overmobile) {
        margin: 0 10px;
      }
    }
  }

  .page-title {
    display: none;

    &.desktop {
      @media (--overmobile){
        display: block;
        font-size: $font__medium;
        text-align: left;
        margin-bottom: 100px;
      }
    }

    &.mobile {
      @media (--mobile){
        font-size: 40px;
        padding-top: 40px;
        display: block;
        font-family:$font__family__semibold;
      }
    }
  }

  .form-section {

    @media (--mobile) {
      padding: 70px 15px 22px 80px;
    }

    .send-btn {

      @mixin auth__button;

      background: $color-orange;

      @media (--overmobile){
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

      border-bottom: 1px solid white;
      color: white;
      opacity: 0.5;
      display: inline-block;

      @media (--overmobile) {
        margin-top: 10px;
      }

      @media (--mobile){
        margin-top: 50px;
        transform: translateX(-20px)

      }
    }

    .phone, .name {
      position: relative;
      margin-left: 40px;
      margin-top: 23px;
      padding-left: 0;
      width: 580px;
      @media (--mobile){
        transform: translateX(-18px);
      }
      @media (--overmobile){
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

        @media (--overmobile) {
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
        @media (--overmobile){
          top: 8px;
          font-size: 28px;
          left: -47px;
        }
      }

      i.ic-mobile-phone {
        top: 5px;
        font-size: 61px;
        left: -89px;
        @media (--overmobile){
          top: 8px;
          font-size: 36px;
          left: -52px;
        }
      }


    }

    input {
      width: 100%;
      font-family: $font__family__light;
      height: 4rem;
      background: transparent;
      outline: none;
      border-bottom: 1px solid white;
      border-top:none;
      border-right: none;
      border-left: none;
      color: white;

      @mixin standart__font;

      @media (--overmobile){
        height: 50px;
      }

      &::placeholder {
        font-family: $font__family__regular;
      }

      &.error {
        color: $color-orange;
      }
    }
  }
}


</style>
