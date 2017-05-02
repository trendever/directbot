<template lang="pug">
.create
  .text-box Развивайте бизнес с Directbot
  .tags-buttons_mobile
    button Получите рекламную площадку
    button ОБщайтесь с клиентами
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
  font-family: $font__family__semibold;
  color: $color__gray;
  .tags-buttons_mobile {
    display: block;

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
    margin: 40px;
    text-align: center;
    font-size: 100px;


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
