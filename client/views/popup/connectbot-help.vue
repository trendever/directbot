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
		width: 100%;
		margin: 0 auto;
		font-size: 24px;



		@media ( --mobile ) {
			width: 95%;
			padding-left: 4%;
		}

		.link-help {

			text-align: center;
			padding-top: 30px;

			.link-bottom {
				display: inline-block;

			}

		}

		ul {

			list-style: initial;

			margin: 0 auto;
			@media screen and (min-width: 751px) {
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

.help-popup
	i.ic-close(v-on:click="$router.push({name: 'connect-bot'})")
	.title
		| Возникли проблемы#[br]
		| с подключением оператора#[br]
		| к вашему Instagram магазину?#[br]
	.content
		ul
			li
				| Еще раз проверьте на опечатки логин#[br(v-if="isMobile")]
				| и пароль. Логин нужно указывать без @
			li
				| Если у вашего аккаунта в Instagram#[br(v-if="isMobile")]
				| разрешена двухфакторная авторизация,#[br(v-if="isMobile")]
				| то на ваш email или номер телефон вы#[br(v-if="isMobile")]
				| получите код. Код нужно будет ввести#[br(v-if="isMobile")]
				| на втором шаге подключения оператора
			li
				| Возможно Instagram попросит#[br(v-if="isMobile")]
				| подтвердить подлинность вашего,#[br(v-if="isMobile")]
				| аккаунта, для чего вам нужно войти в#[br(v-if="isMobile")]
				| свой аккаунт на веб-сайте 
				a(href="instagram.com") instagram.com

			li
				| В редких случаях, когда вы логинитесь#[br(v-if="isMobile")]
				| на сторонние сервисы как наш, Instagram#[br(v-if="isMobile")]
				| может попросить обновить пароль от#[br(v-if="isMobile")]
				| вашего аккаунта. Для этого вам нужно#[br(v-if="isMobile")]
				| перейти по ссылке из email, который#[br(v-if="isMobile")]
				| вам пришлет Instagram

		.link-help
			.link-bottom(@click.stop="help")
				| Мне еще нужна помощь

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
