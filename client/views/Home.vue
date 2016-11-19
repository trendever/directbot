<template lang="pug">
div.page
	router-link(to="/chat")
		photos
</template>
<script>
import Counter from '../components/Counter'
import Photos from '../components/photos'

export default {
  components: {
    Counter,
    Photos
  }
}
</script>
