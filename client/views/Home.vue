<template lang="pug">
div.page
	router-link(to="/chat")
		photos(:shop-id="$route.query.shopid ? +$route.query.shopid : null")

</template>
<script>
import Counter from '../components/Counter'
import Photos from '../components/photos'

export default {
  watch: {
    '$route' (to, from) {
      this.$emit('setList')
    }
  },
  components: {
    Counter,
    Photos
  }
}
</script>
