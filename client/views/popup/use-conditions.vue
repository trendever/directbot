<style type="potcss">
@import '../../style/vars/vars.pcss';

.conditions-popup {

	background: $color__dark-blue;
	color: white;

	.close {
		position: absolute 10px 10px * *;
		font-size: 36px;
		padding: 20px;
	}

	.title {
		padding: 40px * 40px *;
		text-align: center;
		font-family: $font__family__semibold;
		font-size: 32px;

		@media (--mobile) {
			font-size: 40px;
		}

		h1 {
			margin: 30px 0;
		}

		.light-title {


				font-size: 40px;
				font-family: $font__family__light;

				@media screen and (min-width: 751px) {  
					margin-bottom: 24px;
					font-size: 24px;
				}

				&.one {
					@media (--mobile) {
						font-family: $font__family__semibold;
						margin-bottom: 30px;
					}
				}
		}
	}

	.content {

		width: 95%;
		margin: 0 auto;
		font-size: 24px;

		@media( --mobile) {
			padding-left: 4%;
		}

		.ps {
			padding: 40px 0;
			
			font-size: 20px;
			font-family: $font__family__light;
			text-align: center;

			@media(--mobile) {
				margin-right: 22px;
				font-size: 15px;
			}

		}

		ul {

			list-style: decimal;
			padding-left: 30px;
			margin-left: auto;
			margin-right: auto;
			@media screen and (min-width: 751px) {
				margin-top: -44px;
				padding-left: 50px;
				width: 720px;
			}

			li {
				font-family: $font__family__light;
				line-height: 25px;
				margin-top: 10px;
				@media (--mobile) {
					line-height: 45px;
					margin-top: 30px;
					font-size: 26px;
				}

				a {
					color: white;
				}

			}
		}
	}
}


</style>

<template lang="pug">

.conditions-popup

	.title

		h1 Условия использования

		.light-title.one

			| Пожалуйста внимательно#[br(v-if="isMobile")]
			| ознакомьтесь#[br(v-if="!isMobile")] с условиями#[br(v-if="isMobile")]
			| использования Directbot

		.light-title
			| Используя сервис Directbot,#[br(v-if="isMobile")]
			| вы подтверждаете, #[br(v-if="!isMobile")]что прочитали#[br(v-if="isMobile")]
			| и согласны с нижеприведенными условиями:

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

