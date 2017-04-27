<template lang="pug">

button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom.turn-on-bot-btn(
  @click="$router.push({name: 'connect-bot'})")
  template(v-if="!isTrendever") ПОДКЛЮЧИТЬ INSTAGRAM
  template(v-if="isTrendever")
    | ПОДКЛЮЧИТЬ БИЗНЕС
    span.no-desk -ПРОФИЛЬ
</template>

<script>
export default {
};
</script>

