import * as products from 'services/products';
import * as types from '../mutation-types';

let state = {

  lists: {

    /*id:{
      products: [],
      scroll: 0
    }*/

  },

  listId: ''

}


let getters = {

  listId(state) {

    return state.list;

  },

  listProducts(state) {

    if(state.lists.hasOwnProperty(state.listId)) {

      return state.lists[state.listId].products;

    }


  },

  listScroll(state) {

    if(state.lists.hasOwnProperty(state.listId)) {

      return state.lists[state.listId].scroll;

    }

    return null;

  },

}


let actions = {

  setScroll({ commit }, count) {

    commit( types.PRODUCTS_SET_LIST_SCROLL, count)

  },

  openList({ commit, state }, { listId, shop_id = null, limit = 30 } ) {

    if(state.lists[listId]) {

      commit( types.PRODUCTS_SET_LIST, listId );

      return;

    }

    return products.find( { shop_id, limit }).then(data=>{

      commit( types.PRODUCTS_ADD_LIST, { listId , data } );

      commit( types.PRODUCTS_SET_LIST, listId );

    })

  },

  closeList({commit}){

    commit(types.PRODUCTS_CLOSE_LIST)

  },

  increaseLength({commit}, { shop_id, offset }){

    return products.find( { shop_id, offset } ).then(data=>{

      commit(types.PRODUCTS_INCREASE_LIST_LENGTH, data)

    })

  }

}



let mutations = {


  [types.PRODUCTS_SET_LIST_SCROLL]( state, value ){

    if(state.lists.hasOwnProperty(state.listId)) {

      state.lists[state.listId].scroll = value;

    }

  },


  [types.PRODUCTS_SET_LIST]( state, listId ){

    state.listId = listId;

  },


  [types.PRODUCTS_ADD_LIST](state, { listId, data }) {

    state.lists = Object.assign(

      {},

      state.lists,{

        [listId]: {

          products : data,
          scroll: 0

        }

    } );

  },


  [types.PRODUCTS_CLOSE_LIST]( state ) {

    state.listId = null;

  },

  [types.PRODUCTS_INCREASE_LIST_LENGTH]( { lists, listId }, products) {

    products.forEach(item=>{

      lists[listId].products.push(item);

    })

  }

}

export default {

  state,
  actions,
  getters,
  mutations

}
