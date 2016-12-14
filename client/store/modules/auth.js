import * as auth from 'services/auth';
import * as utils from '../../utils';
import * as types from '../mutation-types';

let state = {

  phone: null, // string

  username: null, // string

  instagram: true,

  callbackOnSuccess: null, // function

};


let getters = {

authData(state){
  return {
    phone: state.phone,
    username: state.username,
    instagram: state.instagram,
  };
},

callbackOnSuccessAuth(state){

  return state.callbackOnSuccess;

  }
}


let actions = {

  saveAuthData({ commit }, { phone, username, instagram }){

    phone = phone ? utils.formatPhone(phone, true) : '';

    commit(types.AUTH_SET_PAYLOAD, { phone, username, instagram });

  },

  signin({ commit, state }){
    return new Promise((resolve, reject) => {
      auth.sendPassword(state.auth.phone).then( () => {
        resolve(true);
      }).catch( error => {
        console.log(error);
      });
    });
  },

  signup({ commit, state }){

    return new Promise((resolve, reject) => {

      auth.signup(state.phone, state.username, state.instagram)

      .then( () => {

        resolve(true);

      })

      .catch( error => {

        if (error === auth.ERROR_CODES.USER_ALREADY_EXISTS) {

          return auth.sendPassword(state.phone).then( () => {

              resolve(true);

          }).catch( error => {

            console.log(error);

          });

        } else if (error === auth.ERROR_CODES.INCORRECT_PHONE_FORMAT) {

            return reject(error);
        }

        console.log(error);

      });

    });

  },

  setData({ commit, state }){

    return new Promise((resolve, reject) => {

      auth.setData(state.phone, state.username, state.instagram)

      .then( () => {

        resolve(true);

      }).catch( error => {

        return reject(error);

        console.log(error);

      });

    });

  },

  setCallbackOnSuccessAuth({ commit }, callback){

    commit(types.AUTH_SET_CALLBACK_ON_SUCCEESS, callback);

  },

  executeCallbackOnSuccessAuth({ commit, state }){

    if (state.callbackOnSuccess) {

      state.callbackOnSuccess()

      commit(types.AUTH_CLEAR_CALLBACK_ON_SUCCEESS);

    }
  }

}





// mutations
let mutations = {

  [types.AUTH_SET_PAYLOAD] (state, { phone, username, instagram }) {
    state.phone = phone;
    state.username = username;
    state.instagram = instagram;
  },

  [types.AUTH_SET_CALLBACK_ON_SUCCEESS] (state, callback) {
    state.callbackOnSuccess = callback
  },

  [types.AUTH_CLEAR_CALLBACK_ON_SUCCEESS] (state) {
    state.callbackOnSuccess = null
  },

};

export default {

  state,
  getters,
  actions,
  mutations

}
