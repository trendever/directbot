<template lang="pug">

#confirm

  input(v-model="code")

  button(v-on:click="onButton") Отправить


</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import * as auth from 'services/auth';
export default {

  data () {
    return {
      code: '',
      isCompleted: false,
      anotherName: false
    };
  },
  computed:{
    ...mapGetters([

      'callbackOnSuccessAuth',
      'authData'

    ])
  },
  methods: {
    ...mapActions([

      'executeCallbackOnSuccessAuth',
      'authUser'

    ]),

    onButton() {
      if(!this.isCompleted) {
        this.onConfirm();
      }
    },

    onConfirm() {
      auth.confirmByCode( this.authData.phone, this.code)

      .then( ({ user, token }) => {

        this.onComplete(user, token);

      }).catch( error => {

        if (error === auth.ERROR_CODES.WRONG_CREDENTIALS) {

          this.onErrorCode();

        }

      })

    },
    onComplete(user, token) {

      this.isCompleted = true;

      this

        .authUser({ user, token })

        .then(() => {

          if(!this.anotherName) {

            if (!this.callbackOnSuccessAuth) {

              setTimeout( () => this.$router.push({name: 'chat_list'}), 1000);

              return true;

            } else {

              this.executeCallbackOnSuccessAuth()

              return 0;

            }

          }
        });

    }

  }

};
</script>

<style lang="postcss">
</style>
