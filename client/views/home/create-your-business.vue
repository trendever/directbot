<template lang="pug">
.create
  .text-box
    span Развивайте бизнес с Directbot
  .tags-buttons_mobile
    button Получите красивую витрину
    button Общайтесь с клиентами
    button Работайте с instagram

</template>

<script>

export default {
  name: '',
  data () {
    return {

    };
  }
};

</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';
.create {
  background: $color__gray-lighter;
  //background-image: url(./img/Directbot_landing-desk_pattern.png);
  font-family: $font__family__semibold;
  color: $color__gray;
  .tags-buttons_mobile {
    display: block;
    margin-top: 0;
    @media (--overtablet){
      position: relative;
      width: 500px;
      margin: 0 auto;
      button {
        height: 500px;
      }
    }

  }

  .text-box  {
    position: relative;
    margin: 0;
    padding-top: 110px;
    padding-bottom: 120px;
    text-align: center;
    font-size: 70px;
    color: white;
    font-family: $font__family__light;
    background: $color__brand;

  }
  button:first-child {
    margin-top:10px;
  }
  button {
    display: block;
    font-size: 50px;
    width: 100%;
    padding: 100px 30px;
    margin: 5px auto;
    height: 500px;

  }

}

</style>
