import * as types from './mutation-types';
import * as userService from 'services/user';


let state = {

  all: {

  },

  id: '',

  authId: ''

}


let getters = {

  currentUserId(){
    return state.id;
  },

  authUserId(){
    return state.authId;
  }
}


let actions = {

  openProfile({commit, state}, {instagram_name  = null, user_id = null}) {

    if(state.all.hasOwnProperty(state.id)){

      commit(types.USER_SET_PROFILE);
      return;

    }

    userService.get({ instagram_name, user_id }).then(data=>{

      commit(types.USER_ADD_PROFILE, data);

      commit(types.USER_SET_PROFILE);

    })

  }

}

let mutations = {

  [types.USER_ADD_PROFILE](state, { id, data }) {

    state.all = Object.assign({}, state.all, {[id]: data})

  },

  [types.USER_SET_PROFILE](state, id) {

    state.id = id;

  }

}


export default {

  state,
  getters,
  actions,
  mutations


}
