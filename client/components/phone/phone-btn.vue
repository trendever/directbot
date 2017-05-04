<template lang="pug">

#phone(slot="center-content", v-if="true", :class="$route.name")
  a( :href="phone", @click="showPhone($event)")
    //img(src="./phone.png")
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
        window.eventHub.$emit('show-desktop-phone', phone);
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


  i.ic-icon_phone {
    font-size: 30px;
    color: $color__brand;
    @media (--tabletandless){
      font-size: 45px;
    }
  }
/*   img {
    width: 100%;
    height: auto;
  } */
  a {
    display: initial;
    padding: 10px;
    @media (--overtablet){
      height: 50px;
    }
  }

  &.chat {
    @media screen and (min-width: 1200px){
      transform: translateY(-34px);
      left: 480px !important;
    }

    @media screen and (min-width: 1025px) and (max-width: 1199px){
      left: 390px !important;
      transform: translateY(-34px);
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

  @media (--overtablet){
    position: relative;
    left: 20%;
    display: inline-block;
    text-align: center;
    a {
      display: inline-block;
      width: 60px;
    }

  }

  @media (--tabletandless) {
    box-sizing: content-box;
    display: block;
    position: absolute 23px 45px 0 *;
  }

}
</style>
