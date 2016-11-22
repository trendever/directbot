<template lang="pug">

#auth

  form(v-on:submit.prevent="sendSMS")

    .input-wrap
      label User name
      input(v-model="login")

    .input-wrap
      label Номер телефона
      input(v-model="phone")

    button(type="submit") получить код

</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {

  data () {
    return {
      phone: '',
      login: '',
      instagram: true
    };
  },

  methods: {

    sendSMS(){
      this.saveAuthData({

          username: this.login,
          phone: this.phone,
          instagram: this.instagram,

      })

      this.signup().then( ()=> {

        this.$router.push({ name: 'confirm' });

      }).catch( (error) => {

        console.log(error)
        //this.onErrorPhone();

      })

    },

    ...mapActions([
      'saveAuthData',
      'signup',
      'setData',
      'setCallbackOnSuccessAuth',
      'qexecuteCallbackOnSuccessAuth'
    ])
  },

  computed: {
    ...mapGetters([
      'authData',
      'callbackOnSuccessAuth'
    ])
  }
};

</script>

<style lang="postcss">

#auth {

  height: 100%;

  form {

    max-width: 70%;
    display: block;
    margin: 50px auto * auto;
    font-size: 2rem;
    text-align: center;

    label {

      display: block;

    }

  }

}

</style>
