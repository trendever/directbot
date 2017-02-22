<template lang="pug">

#phone(slot="center-content" v-if="isMobile && phone")
  a(:href="phone")
    img(src="./phone.png")

</template>

<script>
export default {
  props: ['phone'],
  data () {
    return {
    };
  }
};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';
#phone {
  display: none;
  @media (--mobile) {
    box-sizing: content-box;
    display: block;
    position: absolute 23px 45px 0 *;
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
  }
}
</style>
