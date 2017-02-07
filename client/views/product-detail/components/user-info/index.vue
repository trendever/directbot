<template>
  <div class="user-info">
    <img class="avatar" :src="img" @click='$router.push({name: "user", params: {id: name}})'>
    <div class="description" :class="{'no-name': !name}">
      <div class="userName" v-if="name">
        <span class="title" @click='$router.push({name: "user", params: {id: name}})'>Нашёл</span>
        <span class="name" @click='$router.push({name: "user", params: {id: name}})'>{{name}}</span>
      </div>
      <span class="code">{{code}}, {{ lastUpdate}}</span>
    </div>
  </div>
</template>

<style src="./style.pcss" scoped lang="postcss"></style>

<script type="text/babel">
  export default {
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
