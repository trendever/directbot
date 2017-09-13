<template lang="pug">

.use-conditions.agreement.privacy

	.title

		.title-head ПОЛОЖЕНИЕ О ЗАЩИТЕ ПЕРСОНАЛЬНЫХ#[br.no-mob] ДАННЫХ ПОЛЬЗОВАТЕЛЕЙ DIRECTBOT
	
	.content
		ul.first-list
			li(v-for="value, key of content")
				.inner-title {{ key }}
				.inner-list
					ul
						template(v-for="a in value")
							li(v-if="isString(a)" v-html="a")
							li(v-else v-for="val,ke in a")
								.inner-title {{ ke }}
								.embed-list
									ul
										template(v-for="b in val")
											li(v-if="isString(b)" v-html="b")
											li(v-else v-for="v,k in b")
												.inner-title {{ k }}
												.embed-list
													ul
														template(v-for="c in v")
															li(v-html="c")
				




	.fake-bottom(style="height:50px")

</template>

<style lang="postcss">

.use-conditions.privacy {
	.inner-title {

	}
}
</style>

<script>

import content from './privacy-content'
console.log(content)

export default {
	methods:{
		isArray(i){
			console.log(Array.isArray(i))
			return Array.isArray(i)
		},
		isString(i){
			return typeof i == 'string'
		}
	},
  data () {
    return {
    	content
    };
  }
};

</script>

