<template lang="pug">

#phone(slot="center-content", v-if="phone", :class="$route.name")
  a( :href="phone", @click="showPhone($event)")
    //-img(src="./phone.png")
    i.ic-icon_phone

</template>

<script>
import { navigateTolink } from 'root/utils';

export default {
  props: ['phone'],
  methods: {
    showPhone(e){
      if(!this.isMobile){
        e.preventDefault();
        let phone = this.phone.replace(/tel:/g, "");
        window.eventHub.$emit('popup-show-phone', phone);
      }
    }
  }
};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';
#phone {
  cursor: pointer;
  max-width: 40px;
  height: auto;

  @media (--overtablet){
    position: relative;
    left: 20%;
    display: inline-block;
    text-align: center;
    a {
      display: inline;
      width: 60px;
      height: 50px;
    }
  }

  @media (--tabletandless) {
    box-sizing: content-box;
    display: block;
    position: absolute 23px 45px 0 *;
  }

  i.ic-icon_phone {
    font-size: 30px;
    color: $color__brand;
    @media (--tabletandless){
      font-size: 42px;
    }
  }

  a {
    display: inline;
    padding: 10px;
  }

  &.home {
    display: none;
    @media (--overtablet){
      display: none;//inline-block;
      position: absolute 10px 620px * initial;
      z-index: 200;

      i {
        color: white;
        font-size: 30px;
      }
      a {
        display: inline-block;
      }

    }
    @media (--tabletandless){
      display: inline-block;
      position: absolute 22px 125px initial *;
      z-index: 200;
      max-width: 100px;
      i {
        color: white;
        font-size: 40px;
      }

      a {
        display: inline-block;
      }
    }
  }

  &.chat, &.fake_chat  {

    @media (--tabletandless){
      position: absolute 24px 40px * *;
    }

    @media screen and (min-width: 1200px){
      top: -88px;
      left: 480px !important;
    }
    @media screen and (min-width: 1025px) and (max-width: 1199px){
      left: 390px !important;
      top: -88px;
    }
  }

  &.user {

    @media screen and (min-width: 1400px){
      left: 430px !important;

    }

    @media screen and (min-width: 1025px) and (max-width: 1399px){
      left: 240px !important;
    }
  }

  &.product-detail {
    @media screen and (min-width: 1200px){
      left: 480px !important;
    }
  }


}
</style>
