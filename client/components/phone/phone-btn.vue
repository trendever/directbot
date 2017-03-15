<template lang="pug">

#phone(slot="center-content" v-if="phone")
  a( :href="phone", @click="showPhone($event)")
    img(src="./phone.png")

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

  img {
    width: 100%;
    height: auto;
  }
  a {
    display: initial;
    padding: 15px;
  }

  @media (--overmobile){
    position: absolute -5px 20% 0 *;
    display: inline-block;
    text-align: center;
    a {
      display: inline-block;
      width: 60px;
    }

  }

  @media (--mobile) {
    box-sizing: content-box;
    display: block;
    position: absolute 23px 45px 0 *;
  }

}
</style>
