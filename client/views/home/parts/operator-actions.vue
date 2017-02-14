<template lang="pug">
#operator-actions

	.landing-title Что делает #[br(v-if="isMobile")] наш  оператор?

	.actions-body.wrap-flex
		.screen.one
			span.screen-title СКАНИРУЕТ #[br(v-if="!isMobile")] INSTAGRAM DIRECT
			img(src="../img/screen-1.png")

		.screen.two
			span.screen-title СКАНИРУЕТ #[br(v-if="!isMobile")] КОММЕНТАРИИ
			img(src="../img/screen-2.png")


	.actions-bottom
		.sub-title Оператор сразу видит #[br(v-if="isMobile")] вопросы покупателей
		.caption

			a.link-info(@click.stop="openPopup('is4')") 
				| Не важно, задан вопрос в комментариях #[br(v-if="isMobile")] 
				| или личном сообщении, #[br(v-if="!isMobile")]
			span  
				| оператор #[br(v-if="isMobile")] 
				| уже будет отвечать покупателю #[br(v-if="isMobile")]
				| в Direct от твоего имени


</template>

<script>
export default {

	name: 'operator-actions',

	data () {
		return {
			noScreen: false,
			yesScreen: true
		};
	},
	methods:{
		ask(){

		},
		openPopup(name){
			window.eventHub.$emit('open-landing-popup',name)
		}
	}
};
</script>

<style lang="postcss">

@import 'style/vars/vars.pcss';

#operator-actions {

 background: white;


 .actions-bottom {

 	text-align: center;

 }

}


</style>