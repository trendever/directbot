import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import config from 'root/../config'

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})


Vue.config.errorHandler = function (err) {
  console.log(err);
  alert("ОШИБКА!")
}


Vue.mixin({
  data(){
    return {
    	landingCounter: 0,
    	isMobile: window.browser.mobile,
    	isIos: window.browser.ios,
      isInstagram: window.browser.instagram,
      isTrendever: config.trendever,
      isDirectbot: config.directbot,
      isStandalone: config.testBrowserStandalone || window.browser.standalone
    }
  }
});

window.eventHub = new Vue()


export {app, router, store}
