<template lang="pug">
div.counter(@click="$store.dispatch('incrementAsync')")
  | {{ count }}
</template>

<script>

import * as user from '../services/user.js';

export default {
  mounted(){
    user.get({instagram_name: "anlopan"}).then(function(data){
      console.log(data);
    })
  },
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
</script>

<style>
.counter {
  cursor: pointer;
  margin: 100px auto;
  border-radius: 3px;
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 5rem;
  background-color: #f0f0f0;
  user-select: none;
}
</style>
