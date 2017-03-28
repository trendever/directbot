<style src="./info-screen.pcss"></style>
<template lang="pug">

.info-screen
  .description
    .center-block
      | DIRECTBOT - это eCommerce платформа для InstАgram магазинов, к которой&nbsp #[br(v-if="isMobile")]
      | вы можете подключить #[br(v-if="isMobile")] &nbspсебя и команду
      button(v-on:click="$router.push({name: 'auth'})").btn.btn_primary.__orange.__xl.fast__big__btn.continue-btn ПРОДОЛЖИТЬ
</template>


