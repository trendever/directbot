<template>
  <div class="user-info">
    <router-link  :to='{name: "user", params: {id: name}}'>
      <img class="avatar" :src="img">
    </router-link>
    <div class="description">
      <div class="userName">
        <router-link class="title" :to='{name: "user", params: {id: name}}'>Нашёл</router-link>
        <router-link class="name" :to='{name: "user", params: {id: name}}'>{{name}}</router-link>
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
