<template>
  <div class="user-info" @click='goFinder'>
    <img class="avatar" :src="img" v-if="name">
    <div class="description" :class="{'no-name': !name}">
      <div class="userName" v-if="name">
        <span class="title">Нашёл</span>
        <span class="name">{{name}}</span>
      </div>
      <span class="code">{{code}}, {{ lastUpdate}}</span>
    </div>
  </div>
</template>

<style src="./style.pcss" scoped lang="postcss"></style>

<script type="text/babel">
  export default {
    methods:{
      goFinder(){
        if(this.name){
          this.$router.push({name: "user", params: {id: this.name}})
        }
        return;
      }
    },
    props: {
      img: {
        type: String,
        required: true
      },
      code: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      lastUpdate: {
        type: String,
        required: true
      }
    }
  }
</script>
