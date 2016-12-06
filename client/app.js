import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})


Vue.mixin({
  data(){
    return {
    	landingCounter: 0,
    	isMobile: window.browser.mobile
    }
  }
});


export {app, router, store}
