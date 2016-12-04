<template lang="pug">

popup-img(v-if="imgPopUpUrl", :url="imgPopUpUrl", :width="imgWidth", :height="imgHeight", :on-close="closePopUp")

</template>

<script>

import popupImg from './index';
import { mapGetters } from 'vuex';
export default {

  components: {
    popupImg
  },
  computed: {
    ...mapGetters([
      'imgWidth',
      'imgHeight',
      'imgPopUpUrl'
    ])
  },
  methods: {
    closePopUp(){
      let id = this.$route.query.chatid;

      if ( id ) {

        this.$router.replace({name: 'chat', params: {id: id}});

        this.$store.dispatch('closeImgPopUp');

      }
    }
  }
};
</script>


