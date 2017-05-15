<template lang="pug">
#last-landing
  .title Зачем нужен Directbot
  .info-blocks
    template(v-for="block in blocks")
      .block
        .image
          img(:src="block.image")
        .text
          span(v-html="block.text")



</template>

<script>

export default {

  data () {
    return {

      blocks: [
        {
          image: require("./img/info_box_1.png"),
          text: `
            Организует продажи в<br>
            Instagram, чтобы вы не<br>
            теряли клиентов и<br>
            контролировали результаты<br>
          `
        },
        {
          image: require("./img/info_box_2.png"),
          text: `
            Продвигает Instagram<br>
            органически, заказывая<br>
            контент и рекламу у<br>
            качественных блогеров<br>
          `
        },
        {
          image: require("./img/info_box_3.png"),
          text: `
            Превращает Instagram<br>
            в онлайн-магазин,<br>
            доступный вашим клиентам<br>
            по короткой ссылке<br>
          `
        }

      ]

    };
  }
};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';

#last-landing {

  max-width: 1050px;
  margin:  60px auto 0 auto;
  .title {
    font-size: 45px;
    font-family: $font__family__regular;
    text-align: center;
    padding: 30px 0;
    color: #595959;
  }

}
.info-blocks {

  .block {
    display: flex;
    margin-bottom: 40px;
    & > div {
      flex:1;
    }
    .text {
      font-size: $font__normal;
      position: relative;
      span {
        padding-top: 70px;
        padding-left: 30px;
        padding-bottom: 70px;
        background: $color__brand;
        display: block;
        margin: 0 auto;
        width: 400px;
        color: white;
        font-family: $font__family__semibold;
        top:50%;
        position: relative;
        transform: translateY(-50%);
      }
    }
    @media (--tabletandless){
      display: block;
      position: relative;
      .text {
        display: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        span {
          transform: translate(0,0);
          top:0;
          width: 100%;
          font-size: 36px;
          padding: 20px 0px;
          text-align: center;
        }
      }
    }


  }



}



</style>
