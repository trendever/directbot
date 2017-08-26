import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import config from 'root/../config'
import {isStandalone} from 'root/utils'

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})


Vue.config.errorHandler = function (err) {
  console.error("ОШИБКА!")
  console.log(err);
}


Vue.mixin({
  data(){
    return {
    	landingCounter: 0,
    	isMobile: window.browser.mobile,
    	isIos: window.browser.ios,
      isInstagram: window.browser.instagram,
      isTrendever: config.trendever,
      isStandalone: isStandalone()
    }
  },
  methods:{
    connectDirect(){
      if(!this.isTrendever){
        this.$router.push({name: 'connect-bot'})
      } else {
        window.open('https://directbot.io/profile?token=' + this.$store.state.user.token)
      }
    },
    openMenuProduct(product_id){
      this
        .$store
        .dispatch("createLead", product_id )
        .then(
          ( lead ) => {
            if ( lead !== undefined && lead !== null ) {
              this.$router.push( { name: 'chat', params: { id: lead.id } } )
            }
          }
        )
        .catch(()=>{
          console.warn(`NO LEAD '${product_id}'`)
        })

    }
  }
});

window.eventHub = new Vue()


export {app, router, store}
