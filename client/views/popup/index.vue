<template lang="pug">
#info-popup(:class="{ 'popup-price': $route.path === '/home/price' }")
	.popup-content(
    :class="{'part-screen': $route.params.id.indexOf('is') !== -1, 'full-screen': paramsId === 'price' }")
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
import infoScreen11 from 'views/info-screens/info-screen-11.vue';
import infoScreen12 from 'views/info-screens/info-screen-12.vue';
import infoScreen13 from 'views/info-screens/info-screen-13.vue';
import infoScreen14 from 'views/info-screens/info-screen-14.vue';
import pricePopup from 'views/home/price-popup';


import listen from 'event-listener';

export default {
  computed:{
    paramsId(){
      return this.$route.params.id
    }
  },
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
		"is11" : infoScreen11,
    "is12" : infoScreen12,
    "is13" : infoScreen13,
    "is14" : infoScreen14,
    "price": pricePopup
	},
	methods: {
		close(){
			this.$router.push({ name: 'home'})
		}
	}
}
</script>

<style lang="postcss">
	@import 'style/vars/vars.pcss';

	#info-popup {
		width: 100%;
		height: 100%;
		z-index: 310;
		position: fixed 0 0 * 0;
		overflow: auto;

    &.popup-price {
      background: $color__brand-dark;
    }

		.popup-content{

      &.full-screen {
        size: 100%;

      }
			&.part-screen {

			  width: 600px;
			  height: 500px;
			  position: absolute 0 0 * 0;
			  overflow: hidden;

        @media (min-width: 751px){
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
		    @media(--mobile) {
		      width: 100%;
		      height: 100%;
		    }
			}

		}
    i.ic-close {
      position: absolute 10px 10px * *;
      z-index: 210;
      padding: 15px;
      color: white;
      cursor: pointer;
      font-size: $font__normal;
      size: $font__normal;
      box-sizing: content-box;
      @media( --tabletandless ) {
        top: 15px;
        right: 15px;
        size: $font__medium;
        font-size: $font__medium;
      }
    }
	}
</style>
