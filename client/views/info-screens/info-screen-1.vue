<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description._1

    | Вы сами решаете на какие#[br] 
    | вопросы отвечает оператор,#[br]
    | а какие лучше обьяснить самим.#[br] 
    | Оператор может сверить#[br(v-if="isMobile")] наличие,#[br(v-if="!isMobile")] 
    | узнать размеры, адрес доставки,#[br] 
    | сообщать детали оплаты

</template>
<style lang="postcss">
@import 'style/vars/vars.pcss';

.info-screen .description._1 {
	padding-top: 25%;
	@media (--mobile) {
		padding-top: 50%;
	}
}


</style>

