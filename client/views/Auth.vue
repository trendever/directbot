<template lang="pug">

#auth

  form
    .input-wrap
      label User name
      input(type="username")
    .input-wrap
      label Номер телефона
      input(type="number", v-model="phone")

</template>

<script>

export default {

  name: 'component_name',

  data () {
    return {
      phone: '',
      username: '',
    };
  }
};

</script>

<style lang="postcss">

#auth {
  height: 100%;
  form {

    display: block;
    margin: 50px auto * auto;

    label {
      display: block;
      text-align: center;
    }


  }

}




</style>
