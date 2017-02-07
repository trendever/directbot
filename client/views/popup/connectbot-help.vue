<style lang="postcss">
@import 'style/vars/vars.pcss';


.link-bottom {

	cursor: pointer;

}



.help-popup {
	position: fixed;
	size: 100%;
	overflow: auto;
	background: $color__dark-blue;
	color: white;


	i.ic-close {
		position: absolute 10px 22px * * !important;
		font-size: 24px !important;
		padding: 20px !important; 
	}

	.title {
		padding: 40px * 40px *;
		text-align: center;
		font-family: $font__family__semibold;
		font-size: 32px;
		@media (--mobile) {
			font-size: 40px;
		}

	}

	.content {

		width: 95%;
		margin: 0 auto;
		@media ( --mobile ) {
			padding-left: 4%;
		}

		padding-left: 22%;
		font-size: 24px;
		.link-help {
			text-align: center;
			padding: 50px 2% 30px 0;

			@media screen and (min-width: 751px){
				transform: translateX(-15%)
			}
			.link-bottom {
				display: inline-block;

			}

		}

		ul {

			list-style: initial;

			@media screen and (min-width: 800px) {

				margin-left: 50%;
				transform: translateX(-50%);
				width: 720px;

			}

			li {
				font-family: $font__family__light;
				line-height: 45px;
				margin-top: 10px;
				@media (--mobile) {
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

.help-popup
	i.ic-close(v-on:click="$router.push({name: 'connect-bot'})")
	.title
		| Возникли проблемы#[br]
		| с подключением оператора#[br]
		| к вашему Instagram магазину?#[br]
	.content
		ul
			li
				| Еще раз проверьте на опечатки логин#[br]
				| и пароль. Логин нужно указывать без @
			li
				| Если у вашего аккаунта в Instagram#[br]
				| разрешена двухфакторная авторизация,#[br]
				| то на ваш email или номер телефон вы#[br]
				| получите код. Код нужно будет ввести#[br]
				| на втором шаге подключения оператора
			li
				| Возможно Instagram попросит#[br]
				| подтвердить подлинность вашего,#[br]
				| аккаунта, для чего вам нужно войти в#[br]
				| свой аккаунт на веб-сайте 
				a(href="instagram.com") instagram.com

			li
				| В редких случаях, когда вы логинитесь#[br]
				| на сторонние сервисы как наш, Instagram#[br]
				| может попросить обновить пароль от#[br]
				| вашего аккаунта. Для этого вам нужно#[br]
				| перейти по ссылке из email, который#[br]
				| вам пришлет Instagram

		.link-help
			.link-bottom(@click.stop="help")
				| Мне нужна еще помощь

</template>

<script>
import settings from 'root/settings';
export default {

	methods: {

		help(){
	    this.$store.dispatch('createLead', settings.supportID )
	      .then(
	        ( lead ) => {
	          if ( lead !== undefined && lead !== null ) {
	            this.$router.push( { name: 'chat', params: { id: lead.id } } )
	          }
	        }
	      )
		}

	}
}	


</script>
