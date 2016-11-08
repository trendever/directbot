<template lang="pug">
div.page
	counter
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
