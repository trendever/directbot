<template lang="pug">

#list
  .tags-wrap
    tags
  photos

</template>

<script>
import photos from 'components/photos';
import tags from 'components/tags';

export default {
  components: {
    photos,
    tags
  },
};

</script>

<style lang="postcss" >
.tags-wrap {
  position: fixed 0 0 * 0;
  width: 100%;
}
</style>
