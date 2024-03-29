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

  deleteProduct( { commit, state }, index ) {

    if(state.listId){
      if(state.lists[state.listId]){
        let products = state.lists[state.listId].products;
        products.splice(index, 1)
      }
    }

  },

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

  openList({ commit, state }, { listId, shop_id = null, limit = 30, updateInstagram, mentioner_id = null } ) {

    if(state.lists[listId] && !updateInstagram) {

      commit( types.PRODUCTS_SET_LIST, listId );

      return Promise.resolve();

    }

    if(!shop_id && !mentioner_id){
      return productsService.find( { shop_id, limit, mentioner_id }).then(data=>{
        commit( types.PRODUCTS_ADD_LIST, { listId , data } );
        commit( types.PRODUCTS_SET_LIST, listId );
      })
    }

    if(shop_id || mentioner_id) {

      let findProducts = null;
      if(shop_id){
        findProducts = productsService.find( { shop_id, limit})
      }

      let findLikes = null;
      if(mentioner_id){
        findLikes = productsService.find( { limit, mentioner_id })
      }

      return Promise.all([findProducts, findLikes]).then(data=>{
        console.log('%cТовавы:','font-size:1.2rem')
        console.log(data[0] ? data[0].length : null)
        console.log('%cЛайки:','font-size:1.2rem')
        console.log(data[1] ? data[1].length : null)
        let products =[].concat(data[0],data[1]).filter(i=>i !== null);
        commit( types.PRODUCTS_ADD_LIST, { listId , data: products } );
        commit( types.PRODUCTS_SET_LIST, listId );
      })


    }

  },

  closeList({commit}){

    commit(types.PRODUCTS_CLOSE_LIST)

  },

  increaseListLength({commit}, { shop_id, mentioner_id, offset, tags, query }){

    if(shop_id || mentioner_id) {

      let findProducts = null;
      if(shop_id){
        findProducts = productsService.find( { shop_id, offset})
      }

      let findLikes = null;
      if(mentioner_id){
        findLikes = productsService.find( { offset, mentioner_id })
      }

      return Promise.all([findProducts, findLikes]).then(data=>{
        console.log('%cProducts added:','font-size:1.2rem')
        console.log(data[0] ? data[0].length : null)
        console.log('%cLikes added:','font-size:1.2rem')
        console.log(data[1] ? data[1].length : null)
        let products =[].concat(data[0],data[1]).filter(i=>i !== null);
        commit(types.PRODUCTS_INCREASE_LIST_LENGTH, products)
      })

    }

    return productsService.find( { offset, tags, query } ).then(data=>{

      commit(types.PRODUCTS_INCREASE_LIST_LENGTH, data)

      return data;

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
