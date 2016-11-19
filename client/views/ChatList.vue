<template lang="pug">
.chat-list.page
  | CHATLIST
  router-link.home( :to="{name: 'home'}") Домой
  router-link.chatone( :to="{name: 'chatone'}") chatone
</template>

<script>

export default {

}
</script>


<style lang="postcss">
.chat-list {

    &.page {

      position: relative;
      height: 6000px

    }

    .home {

      position: fixed;
      top: 50%;

    }

    .chatone {

      position: fixed;
      top: 40%;

    }

}


</style>
