<template lang="pug">
#info-popup
	.popup-content(:class="{'part-screen': $route.params.id.indexOf('is') !== -1 }")
		i.ic-close(v-on:click="close")
		component(v-bind:is="$route.params.id")

</template>

<script>
import infoScreen1 from 'views/info-screens/info-screen-1.vue';
import infoScreen2 from 'views/info-screens/info-screen-2.vue';
import infoScreen3 from 'views/info-screens/info-screen-3.vue';
import infoScreen4 from 'views/info-screens/info-screen-4.vue';
import infoScreen5 from 'views/info-screens/info-screen-5.vue';
import infoScreen6 from 'views/info-screens/info-screen-6.vue';
import infoScreen7 from 'views/info-screens/info-screen-7.vue';
import infoScreen8 from 'views/info-screens/info-screen-8.vue';
import infoScreen9 from 'views/info-screens/info-screen-9.vue';
import infoScreen10 from 'views/info-screens/info-screen-10.vue';


import useConditions from './use-conditions';

import listen from 'event-listener';

export default {
  created(){
    this.outerClick = listen(document.body, 'click', () => this.$router.push({name: 'home'}))
  },
  beforeDestroy(){
    this.outerClick.remove()
  },
	components:{
		"is1" : infoScreen1,
		"is2" : infoScreen2,
		"is3" : infoScreen3,
		"is4" : infoScreen4,
		"is5" : infoScreen5,
		"is6" : infoScreen6,
		"is7" : infoScreen7,
		"is8" : infoScreen8,
		"is9" : infoScreen9,
		"is10" : infoScreen10,
		"conditions" : useConditions
	},
	methods: {
		close(){
			if(this.$route.params.id === 'conditions'){
				this.$router.push({name: 'auth'})
				return
			}
			this.$router.push({ name: 'home'})

		}
	}
}
</script>

<style lang="postcss">
	@import 'style/vars/vars.pcss';
	#info-popup{

		width: 100%;
		height: 100%;
		z-index: 310;
		position: fixed 0 0 * 0;
		overflow: auto;

		.popup-content{
			&.part-screen {
			  width: 600px;
			  height: 500px;
			  position: absolute;
			  top: 50%;
			  left: 50%;
			  transform: translate(-50%, -50%);
			  overflow: hidden;
		    @media(--mobile) {
		      width: 100%;
		      height: 100%;
		    }
			}

		}

		i.ic-close{
				position: absolute;
				color: $color__white;
				font-size: 24px;
				top: 30px;
				right: 30px;
		  	cursor: pointer;
					@media(--mobile){
						font-size: 34px;
					}
		}
	}
</style>
