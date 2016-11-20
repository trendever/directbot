import * as types from './mutation-types';
import * as products from 'services/products';

let state = {

  lists: {

    /*id:{
      products: [],
      scroll: 0
    }*/

  },

  list: ''

}


let getters = {

  listName(state) {

    return state.list;

  },

  listProducts({ lists, list }) {

    if(lists.hasOwnProperty(list)) {

      return lists[list].products;

    }


  },

  listScroll(state, getters) {

    return state.lists[getters.listName].scroll;

  },

}


let actions = {

  setScroll({ commit }, count){

    commit( types.PRODUCTS_SET_LIST_SCROLL, count)

  },

  openList({ commit, state }, { id, shop_id = null, limit = 30 } ) {

    if(state.lists[id]) {

      commit( types.PRODUCTS_SET_LIST, id );

      return;

    }

    return products.find( { shop_id, limit }).then(data=>{

      commit( types.PRODUCTS_ADD_LIST, { id , data } );

      commit( types.PRODUCTS_SET_LIST, id );

    })

  },

  closeList({commit}){

    commit(types.PRODUCTS_SET_LIST)

  },

  increaseLength({commit}, { shop_id, offset }){

    return products.find( { shop_id, offset } ).then(data=>{

      commit(types.PRODUCTS_INCREASE_LIST_LENGTH, data)

    })

  }

}



let mutations = {


  [types.PRODUCTS_SET_LIST_SCROLL]( { lists, list }, value ){

    if(lists.hasOwnProperty(list)) {

      lists[list].scroll = value;

    }


  },


  [types.PRODUCTS_SET_LIST]( { list }, id ){

    state.list = id;

  },


  [types.PRODUCTS_ADD_LIST]({ lists }, { id, data }) {

    lists[id] = {};

    lists[id].products = data;

  },


  [types.PRODUCTS_CLOSE_LIST]( { list } ) {

    list = '';

  },

  [types.PRODUCTS_INCREASE_LIST_LENGTH]( { lists, list }, products) {

    products.forEach(item=>{

      lists[list].products.push(item);

    })

  }

}

export default {

  state,
  actions,
  getters,
  mutations

}
