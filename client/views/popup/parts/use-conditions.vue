<style lang="postcss">

@import 'style/vars/vars.pcss';

.use-conditions {
	ul  {
		list-style: decimal !important;
		li {
			@media (--mobile) {
				padding-left: 20px;
			}
		}

	}
	.ps {
		padding: 40px 0;
		
		font-size: 20px;
		font-family: $font__family__light;
		text-align: center;

		@media(--mobile) {
			font-size: 24px;
		}

	}
}
</style>

<template lang="pug">

.use-conditions

	.title

		.title-head Условия использования

		.title-body.one

			| Пожалуйста внимательно ознакомьтесь#[br(v-if="isMobile")]
			| с условиями использования Directbot#[br(v-if="isMobile")]

		.title-body
			| Используя сервис Directbot, вы #[br(v-if="isMobile")]
			| подтверждаете, #[br(v-if="!isMobile")]что прочитали и согласны#[br(v-if="isMobile")]
			| с нижеприведенными условиями:

	.content

		ul
			
			li
				| Directbot никак не аффилирован#[br(v-if="isMobile")]
				| с Instagram или Facebook. 

			li
				| Соблюдение правил Instagram#[br(v-if="isMobile")]
				| является вашей личной#[br(v-if="isMobile")]
				| ответственностью.

			li
				| Нам нужны логин и пароль вашего#[br(v-if="isMobile")]
				| Instagram аккаунта исключительно#[br(v-if="isMobile")]
				| для подключения к Instagram API.#[br(v-if="isMobile")]
				| Мы не храним, не передаем и никак #[br(v-if="isMobile")]
				| более не используем #[br(v-if="isMobile")] 
				| эту информацию.

			li
				| Мы не гарантируем, что при #[br(v-if="isMobile")]
				| использовании сервиса Direcbot #[br(v-if="isMobile")]
				| вырастут ваши продажи или #[br(v-if="isMobile")]
				| популярность вашего аккаунта #[br(v-if="isMobile")]
				| в Instagram.

			li
				| Мы не можем защитить вас от спама,#[br(v-if="isMobile")]
				| нежелательных комментариев или#[br(v-if="isMobile")]
				| неактивных подписчиков.

			li
				| Мы не можем гарантировать#[br(v-if="isMobile")] 
				| безошибочную и непрерывную #[br(v-if="isMobile")]
				| работу сервиса Directbot, но всегда#[br(v-if="isMobile")]
				| будем своевременно оповещать вас#[br(v-if="isMobile")]
				| о любых неполадках.

			li
				| Прежде чем оплачивать сервис#[br(v-if="isMobile")]
				| Directbot, мы рекомендуем#[br(v-if="isMobile")]
				| воспользоваться бесплатным#[br(v-if="isMobile")]
				| трехдневным периодом.

			li
				| Мы можем компенсировать средства #[br(v-if="isMobile")]
				|только за неиспользованное время#[br(v-if="isMobile")]
				| Directbot.

			li 
				| Мы оставляем за собой право #[br(v-if="isMobile")]
				| изменить, приостановить или #[br(v-if="isMobile")]
				| аннулировать весь или любую часть #[br(v-if="isMobile")]
				| нашего сервиса в любое время. 

			li
				| Direcbot не терпит спам-активность. #[br(v-if="isMobile")]
				| Если вы используете подозрительные #[br(v-if="isMobile")]
				| имена пользователей или создаете #[br(v-if="isMobile")]
				| несколько новых учетных записей,#[br(v-if="isMobile")]
				| чтобы продолжать использовать #[br(v-if="isMobile")]
				| 3-дневную бесплатную пробную#[br(v-if="isMobile")]
				| версию без оплаты или совершаете #[br(v-if="isMobile")]
				| другую спам-подобную активность,#[br(v-if="isMobile")]
				| вам будет запрещено использовать 
				| Directbot.

			li
				| Это ваша личная ответственность, #[br(v-if="isMobile")]
				| отслеживать изменения данных #[br(v-if="isMobile")]
				| условий использования. 

		.ps 
			| Последний раз данные условия использования#[br(v-if="isMobile")]
			| были обновлены 12 января 2017 года.

</template>

