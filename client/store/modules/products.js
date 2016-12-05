import * as getters from '../getters/products';
import * as productsService from 'services/products';
import * as types from '../mutation-types';

let state = {

  lists: {

    /*id:{
      products: [],
      scroll: 0
    }*/

  },

  listId: '',

  openedProduct: {}

}

let actions = {

  closeProduct( { commit, state },) {

    commit(types.PRODUCTS_CLOSE_PRODUCT);

  },

  openProduct( { commit, state }, id ){

    return productsService
      .get( id )
      .then( ( product ) => {
        commit( types.PRODUCTS_SET_OPENED_PRODUCT, product );
      } )
      .catch( ( error ) => {
        productsService.sendError( error, { state, id } );
      } );

  },


  setScrollToList({ commit }, count) {

    commit( types.PRODUCTS_SET_LIST_SCROLL, count)

  },

  openList({ commit, state }, { listId, shop_id = null, limit = 50 } ) {

    if(state.lists[listId]) {

      commit( types.PRODUCTS_SET_LIST, listId );

      return;

    }

    return productsService.find( { shop_id, limit }).then(data=>{

      commit( types.PRODUCTS_ADD_LIST, { listId , data } );

      commit( types.PRODUCTS_SET_LIST, listId );

    })

  },

  closeList({commit}){

    commit(types.PRODUCTS_CLOSE_LIST)

  },

  increaseListLength({commit}, { shop_id, offset }){

    return productsService.find( { shop_id, offset } ).then(data=>{

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

  },
  [types.PRODUCTS_SET_OPENED_PRODUCT] ( state, product ) {

    state.openedProduct = product;

  },

  [types.PRODUCTS_CLOSE_PRODUCT] (state) {

    state.openedProduct = {};

  }

}

export default {

  state,
  actions,
  getters,
  mutations

}
