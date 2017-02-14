<template lang="pug">

#connect-get

	.landing-title  Подключайся и получишь

	.skills-wrapper

		.info-box
			.skills-icon
				img(src="../img/icon-4.png")
			.sub-title Личного #[br(v-if="!isMobile")] оператора
			.caption
				a.link-info(@click.stop="openPopup('is7')") Личный оператор #[br(v-if="!isMobile")] на связи с твоими клиентами #[br(v-if="!isMobile")] 24/7. В 10+ раз дешевле*
		.info-box
			.skills-icon
				img(src="../img/icon-5.png")
			.sub-title Адаптивный #[br(v-if="!isMobile")] интернет-магазин
			.caption
				a.link-info(@click.stop="openPopup('is8')")
					| Удобный интернет-магазин #[br(v-if="!isMobile")] с платежами #[br(v-if="isMobile")] и доставкой #[br(v-if="!isMobile")] до покупателя
		.info-box
			.skills-icon
				img(src="../img/icon-6.png")
			.sub-title Сервис рекламы #[br(v-if="!isMobile")] у блогеров
			.caption
				a.link-info(@click.stop="openPopup('is9')")
					| Сервис по подбору #[br(v-if="!isMobile")] и организации рекламы #[br(v-if="!isMobile")] через блогеров

	.tooltip
		p *из расчета средней зарплаты оператора 45 тыс.руб. #[br(v-if='isMobile')] в месяц, и это только за 8-часовой день с выходными

</template>

<script>
export default {

	name: 'connect-get',

	data () {
		return {

		};
	}
};
</script>

<style lang="postcss">
#connect-get {

  .tooltip {
    text-align: center;
    padding-bottom: 40px;
  }
}


</style>
