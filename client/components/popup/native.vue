<template lang="pug">

#native-popup(v-if="showPopup", @click="close")
  .popup-content
    slot

</template>

<script>
export default {
  methods:{
    close(){
      window.eventHub.$emit('close-native-popup')
    }
  },
  props: {
    showPopup: {
      default: false
    }
  }
};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';
#native-popup {
  font-family: $font__family__regular;
  position: fixed 0 0 * 0;
  z-index: 500;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.31);
  .popup-content {
    background: #F5F5F6;
    color: black;
    text-align: center;
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    overflow: hidden;
    width: 300px;
    @media (--mobile) {
      border-radius: 30px;
      width: 75%;
      font-size: 32px;
    }
  }

  .title-font {
    font-family: $font__family__semibold;
    font-size: 24px;
    @media (--mobile) {
      font-size: 40px;
    }
  }

  .title-text {
    padding: 20px 10px 10px 10px;
    @media (--mobile) {
      padding: 50px 30px 10px 30px;
    }
  }

  .main-text {
    padding: * 5px 30px 5px;
    @media (--mobile) {
      padding: * 10px 50px 10px;
    }
  }

  .title-text {

    padding: 20px 10px 10px 10px;

    @media (--mobile) {
      padding: 50px 30px 10px 30px;

    }

  }

  .main-text {

    padding: * 5px 30px 5px;

    @media (--mobile) {
      padding: * 10px 50px 10px;

    }

  }

  .button-text {
    font-family: $font__family__semibold;
    border-top: 1px solid grey;
    display: flex;
    justify-content: center;
    color:$color__brand;
    padding: 20px 20px 20px 20px;
    display: flex;
    @media (--mobile) {
      padding: 30px 30px 30px 30px;
      font-size: 36px;
    }

    span {

      width: 100%;
      cursor: pointer;
      padding: * 30px * 30px;
      margin: * 10px * 10px;
      @media (--mobile) {
        padding: * 50px * 50px;
        margin: * 10px * 10px;
      }
    }
  }
}
</style>
