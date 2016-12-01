<template lang="pug">

#profile

  .profile.content

    .self-page(v-if="selfPage")

    .user-page(v-if="userPage")


</template>

<script>
export default {
  data () {
    return {
      selfPage: this.$route.name === 'profile',
      userPage: this.$route.name === 'user'
    };
  }
};
</script>

<style lang="postcss">
</style>
