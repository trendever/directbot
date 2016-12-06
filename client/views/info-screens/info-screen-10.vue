<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description._10 DIRECTBOT - это eCommerce платформа для InstАgram магазинов, к которой #[br(v-if="isMobile")] вы можете подключить #[br(v-if="isMobile")] себя и команду
  button(v-on:click="$router.push({name: 'auth'})").btn.btn_primary.__orange.__xl.fast__big__btn.continue-btn ПРОДОЛЖИТЬ
</template>

<script>
export default {
  data(){
		return {
			currentView: this.$route.params.id
		}
	},
	methods:{
		closeView(){
			if (this.isMobile){
				history.back();
			}else{
				parent.postMessage({name:"Close"}, "*");
			}
		}
	}
}
</script>

<style lang="css">
</style>
