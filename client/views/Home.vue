<template lang="pug">
#home
  photos

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
