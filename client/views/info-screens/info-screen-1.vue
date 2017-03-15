<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description._1

    | ВОПРОСЫ ВАШИХ КЛИЕНТОВ БОЛЬШЕ#[br.desktop]
    | НЕ ПОТЕРЯЮТСЯ СРЕДИ#[br.mobile] СПАМА#[br.desktop]
    | И СВЕТСКИХ БЕСЕД ПОДПИСЧИКОВ#[br.desktop]
    | ПОД ВАШИМИ ПОСТАМИ

</template>
<style lang="postcss">
@import 'style/vars/vars.pcss';

.info-screen .description._1 {
	padding-top: 30%;
	@media (--mobile) {
		padding-top: 70%;
	}
}


</style>

