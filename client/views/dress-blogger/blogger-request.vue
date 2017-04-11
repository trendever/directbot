<template lang="pug">
#blogger-request
  .close-page(@click="$router.push({name: 'dress-blogger'})"): i.ic-close
  .page-title.mobile {{ title }}
  .content-wrap

    .requested-section(v-if="requested")
      h1 Спасибо!

    .body-section(v-if="!requested")
      img(src="./images/lp_drblog_reg_image.svg")

    //-.body-section(v-if="!requested")
      .title #ОденьБлогера
      .body
        h1 Фонд одевания блогеров
        p Приглашаем Instagram-блогеров#[br] одеваться за наш счет

    .form-section(v-if="!requested")
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
          :class='{error: phoneError}',
          ref="phone",
          v-model="phone",
          placeholder="Введите номер телефона",
          @focus="focusPhone",
          @click="$event.target.focus()"
          autocomplete="off",
          autocorrect="off",
          autocapitalize="off",
          type="phone",
          @keyup.enter="request"
        )
        i.ic-close(v-if="phone",
          @click="phone='',$refs.phone.focus()")


      .send-btn(@click="request") ОТПРАВИТЬ
      .bottom-link Условия участия





</template>

<script>
import { formatPhone } from 'root/utils';
import { signup } from 'services/auth';

export default {

  data () {

    return {
      title: 'Заявка на участие',
      phone: '',
      phoneError: false,
      name: '',
      nameError: false,
      requested: false
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
            this.requested=true;
            setTimeout(()=>{
              this.$router.push({name: 'dress-blogger'})
            },1000)
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
  hidden: true;
  color: white;
  text-align: center;
  //background-image: url(./images/Bgr-fix-desk.jpg);
  background-color: black;
  background-attachment: fixed;
  height: 100%;

  @media ( --mobile ) {
    //background-image: url(./images/Bgr-fix-mob.jpg);
    background-color: black;
    background-size: 97%;
    background-position: 40px 80px;
  }

  .close-page {
     @mixin close__page;
  }

  .body-section .title {
    @media screen and (max-height: 1170px) and (max-width: 750px){
      margin-top: 15px;
    }
  }

  .body-section {

    @media (--tabletandless){
      max-height: 607px;
    }

    img {
      @media (--tabletandless){
        transform: translate(50px,0px)
      }
      @media (--overtablet){
        max-width: 400px;
        transform: translate(40px, -20px)
      }
    }

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

  .requested-section {

    text-align: center;
    font-size: $font__large;
    color: white;
    padding-top: 15%;
    @media (--mobile){
      font-size: 60px;
      margin-top: 45%;
      padding: 0;
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
      cursor: pointer;
      border-bottom: 1px solid white;
      color: white;
      opacity: 0.5;
      display: inline-block;

      @media (--overmobile) {
        margin-top: 10px;
      }

      @media (--mobile){
        margin-top: 50px;
        transform: translateX(-23px)

      }
    }

    .phone, .name {
      border-bottom: 1px solid white;
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
      padding: 0;
      width: 100%;
      font-family: $font__family__light;
      height: 4rem;
      background: transparent;
      outline: none;
      border: none;
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
