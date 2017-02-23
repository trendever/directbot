<template lang="pug">
#dark-sample

  .close-block
    i.ic-close

  div(slot="content", v-if="$route.query.columns != 2 || twoColumns")

  template(v-else)

    .group-wrap

      .left-content

        .content(slot="left-content", v-if="leftTitle !== 'Заголовок Один'")

        //-Пример
        template(v-else)
          .content
            .title-block
              h1 {{ leftTitle }}
            .body-block
              p Пример текста#[br] слева
            .bottom-block
              button {{ buttonText }}

      .right-content

        .content(slot="right-content", v-if="rightTitle !== 'Заголовок Два'")

        //-Пример
        template(v-else)
          .content
            .title-block
              h1 {{ rightTitle }}
            .body-block
              p Пример текста#[br] справа

    .bottom-block(v-if="centerButton")
      button {{ buttonText }}

</template>

<script>
export default {

  props: {
    twoColumns: {
      default: false,
    },
    centerButton: {
      default: false,
    },
    leftTitle: {
      default: 'Заголовок Один'
    },
    rightTitle: {
      default: 'Заголовок Два'
    },
    buttonText: {
      default: 'Кнопка'
    }
  },

  data () {
    return {

    };
  }
};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';


#dark-sample {
  height: 100%;
  overflow:hidden;
  background: $color__dark-blue;
  font-family: $font__family__light;
  font-size: $font__normal;
  @media (--mobile) {
    font-size: $font__medium;
  }
  color: white;

  .close-block {
    cursor: pointer;
    position: absolute 0 0 * *;
    i.ic-close {
      padding: $click__area__padding;

    }
  }

  .group-wrap {

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    > div {
      width: 35%;
      @media (--mobile){
        width: 100%;
      }
    }


  }

  .content {
    height: 400px;


  }

  .title-block {
    h1 {
      text-align: center;
      padding-top: 50px;

      font-size: $font__title;

      @media (--mobile) {
        font-size: $font__medium;
      }

    }

  }


  .body-block {


    p {

      font-size: $font__normal;
      margin-left: 50%;
      transform: translateX(-50%);


    }
  }


  .bottom-block {
    text-align: center;
    @media (--mobile) {
      position: absolute * 0 0 0;
    }
    button {
      cursor: pointer;
      font-size: $font__normal;
      font-family:$font__family__light;
      @media (--mobile) {
        font-size: $font__medium;
      }
      display: inline-block;
      border: none;
      outline: none;
      height: 75px;
      width: 420px;
      background: $color-orange;
      border-radius: 6px;
      @media (--mobile) {
        width: 100%;
        height: 100px;
        border-radius: 0;
      }
    }
  }

}

</style>
