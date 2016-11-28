import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import products from './modules/products';
import user from './modules/user';
import leads from './modules/leads';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    leads,
    products,
    auth,
    user
  }
})

export default store
