<template lang="pug">
div#app
  keep-alive
    router-view
</template>

<script>
import listen from 'event-listener';

export default {
  data(){
    return {
      oldData: ''
    }
  },
  created(){

    this.saveScroll =  this.saveScroll.bind(this);

  },
  mounted(){

    //this.listenScroll =  listen( window, 'scroll', this.saveScroll );

  },

  methods: {

    saveScroll(){

      console.log(this.$route)

      this.scroll = window.scrollY;

      localStorage.setItem(`${this.$route.name}.scroll`, this.scroll);

    }

  },
  watch: {
    '$router'(){
      alert(1);
    }
  },

}
</script>

<style>
body {
  margin: 0;
  font-size: 2rem;
  font-family: -apple-system, BlinkMacSystemFont,
               'avenir next', avenir,
               helvetica, 'helvetica neue',
               Ubuntu,
               'segoe ui', arial,
               sans-serif;
}
.page {
  text-align: center;
  overflow: hidden;
}
code {
  background-color: #f0f0f0;
  padding: 3px 5px;
  border-radius: 2px;
}
</style>
