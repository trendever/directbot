<template lang="pug">
#header
  slot
</template>

<script>
export default {
  data () {
    return {

    };
  }
};
</script>

<style lang="postcss">

@import 'components/style/vars/vars.pcss';

#header {
  position: relative;
  height: 50px;
  background: $color__blue;
}


</style>
