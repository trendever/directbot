import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import products from './modules/products';
import user from './modules/user';
import leads from './modules/leads';
import conversation from './modules/conversation';
import monetization from './modules/monetization';
import search from './modules/search';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    conversation,
    leads,
    products,
    auth,
    user,
    monetization,
    search,
  }
})

export default store
