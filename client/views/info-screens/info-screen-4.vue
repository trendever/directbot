<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description
    .center-block
      | Directbot сканирует твой #[br(v-if="!isMobile")]
      | Instagram на ключевые слова #[br(v-if="!isMobile")]
      | и уведомляет оператора #[br(v-if="isMobile")]
      | &nbspо клиентах
</template>

