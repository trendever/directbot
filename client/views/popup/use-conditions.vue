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
			font-family: $font__family__light;

		}


	}

	.content {

		width: 95%;
		margin: 0 auto;
		padding-left: 10%;
		font-size: 24px;

		@media( --mobile) {
			padding-left: 4%;
		}

		.ps {
			padding: 40px 0;
			transform: translateX(-3%);
			font-size: 20px;
			font-family: $font__family__light;
			text-align: center;

			@media(--mobile) {
				font-size: 15px;
			}

		}

		ul {
			margin-top: -30px;
			list-style: decimal;

			@media screen and (min-width: 800px){ 
				transform: translate(-50%);
				margin-left: 50%;
				width: 600px; 
			}

			li {

				font-family: $font__family__light;
				line-height: 36px;
				padding-left: 20px;
				margin-left: 15px;
				margin-top: 10px;

				@media(--mobile) {
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

		h1

			| Пожалуйста внимательно#[br]
			| ознакомьтесь с условиями#[br]
			| использования Directbot

		.light-title
			| Используя сервис Directbot,#[br]
			| вы подтверждаете, что прочитали#[br]
			| и согласны с нижеприведенными условиями:

	.content

		ul
			
			li
				| Directbot никак не аффилирован#[br]
				| с Instagram или Facebook. 

			li
				| Соблюдение правил Instagram#[br]
				| является вашей личной#[br]
				| ответственностью.

			li
				| Нам нужны логин и пароль вашего#[br]
				| Instagram аккаунта исключительно#[br]
				| для подключения к Instagram API.#[br]
				| Мы не храним, не передаем и никак #[br]
				| более не используем #[br] 
				| эту информацию.

			li
				| Мы не гарантируем, что при #[br]
				| использовании сервиса Direcbot #[br]
				| вырастут ваши продажи или #[br]
				| популярность вашего аккаунта #[br]
				| в Instagram.

			li
				| Мы не можем защитить вас от спама,#[br]
				| нежелательных комментариев или#[br]
				| неактивных подписчиков.

			li
				| Мы не можем гарантировать#[br] 
				| безошибочную и непрерывную #[br]
				| работу сервиса Directbot, но всегда#[br]
				| будем своевременно оповещать вас#[br]
				| о любых неполадках.

			li
				| Прежде чем оплачивать сервис#[br]
				| Directbot, мы рекомендуем#[br]
				| воспользоваться бесплатным#[br]
				| трехдневным периодом.

			li
				| Мы можем компенсировать средства #[br]
				|только за неиспользованное время#[br]
				| Directbot.

			li 
				| Мы оставляем за собой право #[br]
				| изменить, приостановить или #[br]
				| аннулировать весь или любую часть #[br]
				| нашего сервиса в любое время. 

			li
				| Direcbot не терпит спам-активность. #[br]
				| Если вы используете подозрительные #[br]
				| имена пользователей или создаете #[br]
				| несколько новых учетных записей,#[br]
				| чтобы продолжать использовать #[br]
				| 3-дневную бесплатную пробную#[br]
				| версию без оплаты или совершаете #[br]
				| другую спам-подобную активность,#[br]
				| вам будет запрещено использовать 
				| Directbot.

			li
				| Это ваша личная ответственность, #[br]
				| отслеживать изменения данных #[br]
				| условий использования. 

		.ps 
			| Последний раз данные условия использования#[br]
			| были обновлены 12 января 2017 года.

</template>

