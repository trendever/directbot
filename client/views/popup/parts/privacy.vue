<template lang="pug">

.use-conditions.agreement

	.title

		.title-head ПОЛОЖЕНИЕ О ЗАЩИТЕ ПЕРСОНАЛЬНЫХ ДАННЫХ ПОЛЬЗОВАТЕЛЕЙ DIRECTBOT

	.content
		ul.first-list
			li(v-for="value, key of content")
				.inner-title {{ key }}
				.inner-list(v-if="!checkEmbed(value)")
					ul
						li(v-for="a in value" v-html="a")
				.embed-list(v-else)
					ul
						li(v-for="item, k of value")
							.inner-title {{ k }}
							.inner-list(v-if="!checkEmbed(value)")
								ul
									li(v-for="a in item" v-html="a")
							.embed-list(v-else)
								ul
									li(v-for="item, k of value")
										.inner-title {{ k }}
										.inner-list(v-if="!checkEmbed(value)")
											ul
												li(v-for="a in item" v-html="a")



	.fake-bottom(style="height:50px")

</template>

<style lang="css" scoped>
</style>

<script>

import content from './privacy-content'

export default {
	methods:{
		checkEmbed(o){
			return typeof o == 'object'
		}
	},
  data () {
    return {
    	content
    };
  }
};

</script>

