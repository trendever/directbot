import * as types from './mutation-types';
import * as products from 'services/products';

let state = {

  lists: {

    /*sample:{
      products: [],
      scroll: 0
    }*/

  },

  list: 'id'

}


let getters = {

  listName(state) {

    return state.list;

  },

  listPhotos(state, getters) {

    if(state.lists.hasOwnProperty(state.list)) {

      return state.lists[getters.listName].products;
    }


  },

  listScroll(state) {

    return state.lists[getters.listName].products;

  },

}


let actions = {

  setScroll({ commit }, count){

    commit( types.PRODUCTS_SET_LIST_SCROLL, count)

  },

  openList({ commit, state }, { id, shop_id = null } ) {

    if(state.lists[id]) {

      commit( types.PRODUCTS_SET_LIST, id );

      return;

    }

    return products.find( { shop_id }).then(data=>{

      commit( types.PRODUCTS_ADD_LIST, { id , data } );

      commit( types.PRODUCTS_SET_LIST, id );

    })

  },

  closeList({commit}){

    commit(types.PRODUCTS_SET_LIST)

  }

}



let mutations = {


  [types.PRODUCTS_SET_LIST_SCROLL](state, { id, value }){

   state.lists[id].scroll = value;

  },


  [types.PRODUCTS_SET_LIST]( state, value ){

   state.list = value;

  },


  [types.PRODUCTS_ADD_LIST](state, { id, data }) {

    state.lists[id] = {};

    state.lists[id].products = data;

  },


  [types.PRODUCTS_CLOSE_LIST]( state ) {

    state.list = '';

  }

}

export default {

  state,
  actions,
  getters,
  mutations

}
