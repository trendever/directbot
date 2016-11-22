<template lang="pug">

#auth

  form
    input(type="number", v-model="phonenumber")
    input(type="username")

</template>

<script>

export default {

  name: 'component_name',

  data () {
    return {
      phonenumber: '',
      username: '',
    };
  }
};

</script>

<style lang="postcss">

#auth {
  height: 100%;


}




</style>
