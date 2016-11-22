<template lang="pug">

#confirm

  input(v-model="code")

  button Отправить


</template>

<script>

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

      //this.$els.confirmBtn.focus();

      //this.anotherName = user.name !== this.authData.username ? user.name : '';

      this

        .authUser(user, token)

        .then(() => {

          if(!this.anotherName) {

            if (!this.callbackOnSuccessAuth) {

              setTimeout( () => this.$router.go({name: 'chat_list'}), 1000);

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
