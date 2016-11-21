import Vue from 'vue';
import Vuex from 'vuex';
import products from './products';
import user from './user';

Vue.use(Vuex)

const state = {
  count: 0,
}

const mutations = {
  INCREMENT(state) {
    state.count++
  }
}

const actions = {
  incrementAsync({commit}) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    products,
    user
  }
})

export default store
