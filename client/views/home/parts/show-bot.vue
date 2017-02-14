<template lang="pug">

#show-bot(:style="{ height: isMobile ? windowHeight + 'px': 'initial' }")
  .wrap-connect
    .landing-title Союз человека и робота
    .top-scheme
      .text-box.top-box 1. Directbot сканирует комментарии #[br(v-if="isMobile")] и Direct в Instagram у магазина
      img(src="../img/insta-bot_image_mob.svg", v-if="isMobile")
      .counter
        span.txt ОТПРАВЛЕНО
        span.digit#counter {{ landingCounter }}
        span.txt СООБЩЕНИЙ
      .text-box.middle-box 2. Бот определяет клиентов #[br(v-if="isMobile")] и находит информацию о товарах
      img(src="../img/insta-bot_image_desk.svg", v-if="!isMobile")
      .text-box.bottom-box 3. Персональный чат-оператор #[br(v-if="isMobile")] отвечает от имени магазина в Instagram

</template>

<script>
export default {
  data () {
    return {
      landingCounter: 4783,
      windowHeight: window.innerHeight
    };
  },
  created(){
    this.counterID = this.landingCount();
  },
  methods:{
    landingCount(){
      return setInterval(()=>{
        this.landingCounter += [1,3,5][Math.round(Math.random()*10/4)];
      },4000)
    }
  },
  beforeDestroy(){
    clearInterval(this.counterID);
  }

};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';

#show-bot{
  background: white ;
  text-align: center;
  margin: 0 auto;
  position: relative;

  @media(--tabletandless) {
    padding: 0px 25px 0px 25px;
  }

  .wrap-connect {

    max-width: 1050px;
    margin: 0 auto;

  }

  .head-title{
    font-size: 60px;
    font-family: $font__family__thin;
    text-align: center;
    margin: 0 auto;
    width: 80%;
    color: $color__gray-dark;

    @media(--tabletandless) {
      font-size: 64px;
      width: 100%;
    }
  }

  .top-scheme{
    width: 100%;
    position: relative;

    .text-box{
      float: left;
      text-align: left;
      font-family: $font__family__light;
      font-size: 24px;
      color: $color__blue;
      background-color: #E5EBF7;
      border: 2px solid $color__blue;
      border-radius: 10px;
      width: 418px;
      height: 85px;
      margin: 24px 0px 0px 29px;
      padding: 9px 0px 0px 14px;
      position: relative;
      @media(--tabletandless) {
        display: block;
        float: none;
        font-size: 36px;
        margin: 46px 0px 0px 0px;
        height: 139px;
        width: 624px;
        padding: 22px 20px;
        line-height: 45px;
        z-index: -1;
      }
      &:after{
        content: '';
        background-image: url(/static/media/tail.bc824adc.png);
        background-repeat: no-repeat;
        background-size: 24px;
        position: absolute;
        width: 30px;
        height: 30px;
        top: 81px;
        right: 39px;
        @media(--tabletandless) {
          content: url(../img/tail.png);
          background-image: none;
          width: 0;
          height: 0;
          top: auto;
          bottom: 13px;
          right: 70px;
          z-index: 20;
        }
      }
    }
    .middle-box{
      margin: -7px 0px 100px 125px;
      width: 450px;
      height: 85px;
      padding: 12px 0px 0px 16px;
      @media(--tabletandless) {
        position: absolute;
        height: 137px;
        width: 624px;
        top: 350px;
        padding: 19px 20px;
        margin: 50px 0px 0px 0px;
      }
      &:after{
        content: '';
        background-image: url(../img/tail.png);
        background-repeat: no-repeat;
        -webkit-background-size: 24px;
        background-size: 24px;
        height: 30px;
        width: 30px;
        position: absolute;
        transform: scaleX(-1);
        left: 168px;
        top: 81px;
        @media(--tabletandless) {
          content: url(../img/tail.png);
          width: 0;
          height: 0;
          top: auto;
          bottom: 13px;
          left: 330px;
          z-index: 20;
        }
      }
    }
    .bottom-box{
      margin: 10px auto 0px;
      float: none;
      width: 475px;
      height: 85px;
      padding-top: 11px;
      margin-left: 306px;
      @media(--tabletandless) {
        height: 137px;
        line-height: 47px;
        padding: 17px 0px 0px 20px;
        width: 690px;
        margin: 29px auto 56px auto;
      }
      &:after{
        content: '';
        position: absolute;
        background-image: url(../img/tail.png);
        background-repeat: no-repeat;
        -webkit-background-size: 24px;
        background-size: 24px;
        height: 30px;
        width: 30px;
        transform: scaleY(-1);
        top: -30px;
        left: 225px;
        @media(--tabletandless) {
          content: url(../img/tail.png);
          background-image: none;
          width: 0;
          height: 0;
          top: 14px;
          left: 50px;
          z-index: 20;
        }
      }
    }

    img{
      width: 888px;
      margin-top: -81px;
      margin-left: 100px;
      @media(--tabletandless) {
        width: auto;
        height: auto;
        margin-top: 0px;
        margin-left: 0;
      }
    }

    p{
      position: absolute;
      left: 103px;
      text-align: left;
      font-family: $font__family__semibold;
      font-size: 28px;
      color: $color__blue;
      @media(--tabletandless){
        font-size: 36px;
      }

      i.ic-rub{
        padding-top: 7px;
        font-size: 20px;
        font-family: $font__family__semibold;
        @media(--tabletandless) {
          padding-top: 9px;
          font-size: 26px;
        }
      }
    }
    .t{
      top: 44px;
      @media(--tabletandless) {
        top: 339px;
      }
    }
    .m{
      top: 44px;
      left: 652px;
      @media(--tabletandless) {
        top: 439px;
        left: 103px;
      }
    }
    .b{
      text-align: center;
      position: relative;
      left: 0;
      margin-top: 14px;
      @media(--tabletandless) {
        margin-top: 30px;
      }
    }
    .counter{
      display: inline-block;
      text-align: center;
      position: absolute;
      top: 100px;
      right: 250px;
      z-index: 0;

      @media(--tabletandless){
        top: 580px;
        left: 288px;
        right: auto;
      }

      span{
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .txt{
        font-size: 12px;
        font-family: $font__family__semibold;
        color: $color__blue;

        @media(--tabletandless){
          font-size: 18px;
        }

        &:first-child{
          padding-top: 6px;
        }

        &:last-child{
          margin-top: -2px;
          @media(--tabletandless) {
            margin-top: -6px;
          }
        }
      }

      .digit{
        font-size: 30px;
        font-family: $font__family__semibold;
        color: $color__blue;
        margin-top: -4px;
        //background: text-gradient(circle at 33% 100%, #FED373 4%, #F15245 30%, #D92E7F 62%, #9B36B7 85%, #515ECF);

        @media(--tabletandless) {
          margin-top: -8px;
          font-size: 46px;
        }
      }
    }
  }


}


</style>
