import * as userService from 'services/user';
import * as profile from 'services/profile';

import * as types from '../mutation-types';
import * as getters from '../getters/user';
import * as actions from '../actions/user';

function picProfile( profile ) {

  return Object.assign(
    {
      //shop_retrieve
      instagram_fullname: profile.instagram_fullname,
      instagram_id: profile.instagram_id,
      instagram_username: profile.instagram_username,
      plan_expires_at: profile.plan_expires_at,
      plan_id: profile.plan_id,
      shipping_rules: profile.shipping_rules,
      supplier: profile.supplier,
      supplier_id: profile.supplier_id,
      suspended: profile.suspended,
      instagram_avatar_url: profile.instagram_avatar_url,
      id: profile.id,
      created_at: profile.created_at,
      avatar_url: profile.avatar_url

    },

    {
      //user retrieve

      id: profile.id,
      instagram_id: profile.instagram_id,
      instagram_username: profile.instagram_username,
      instagram_fullname: profile.instagram_fullname,
      avatar_url: profile.avatar_url || profile.instagram_avatar_url,
      caption: profile.caption || profile.instagram_caption,
      slogan: profile.slogan,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,

    },

    (profile.supplier_of) ?
    {
      supplier_of: profile.supplier_of
    }
      :
    {
      supplier_of: null
    }
    ,
    (profile.seller_of) ?
    {
      seller_of: profile.seller_of
    }
      :
    {
      seller_of: null
    },
    (profile.supplier) ?
    {
      has_email: profile.supplier.has_email,
      has_phone: profile.supplier.has_phone,
    }
      :
    {
      has_email: profile.has_email,
      has_phone: profile.has_phone,
    }
  )

}

const state = {

  isAuth: false,
  token: null,
  id: null, // string - current profile
  myId: null, // Id profile of current user.
  all: {},
  photoConfigs: {},
  done: false,
  payment: {},

};




// mutations
const mutations = {
  [types.USER_AUTHENTICATED] ( state, token ) {
    state.isAuth = true;
    state.token  = token;
  },
  [types.USER_SET_MY_ID] ( state, myId ) {
    state.myId = myId;
    state.id   = myId;
  },
  [types.USER_RECEIVE_PROFILE] ( state, { profile, id = null } ) {
    state.all = Object.assign( {}, state.all, { [(id !== null) ? id : profile.id]: picProfile( profile ) } );
  },
  [types.USER_SET_PROFILE] ( state, id = state.myId) {

    if ( state.all.hasOwnProperty( id ) ) {

      state.id = id;

    }

    state.done = true;

  },

  [types.USER_SET_PHOTOS_CONFIG] ( state, { listId, photoFilter, id = state.myId } ) {

    if ( state.all.hasOwnProperty( id ) ) {

      state.photoConfigs = Object.assign( {}, state.photoConfigs, { [id]: { listId, photoFilter } } );

    } else {
      console.warn( `[ USER_SET_PHOTOS_CONFIG ] - profile with id: ${id}, not found.`, {
        state,
        listId,
        photoFilter,
        id
      } )
    }
  },
  [types.USER_CLOSE_PROFILE] ( state ) {
    state.id   = state.myId;
    state.done = false;
  },
  [types.USER_LOGOUT] ( state ){
    state.isAuth       = false;
    state.token        = null;
    state.id           = null; // string - current profile
    state.myId         = null; // Id profile of current user.
    state.all          = {};
    state.photoConfigs = {};
    state.done         = false;
  },
  [types.USER_SET_MY_CURRENT_LIST]( state , list ){
    state.myCurrentList = list;
  },
  [types.USER_SET_PAYMENT](state,value){
    state.payment = value;
  },
  [types.USER_SET_USE_DAYS](state, count) {
    state.useDays = count;
  },
  [types.USER_SET_SUPPLIER_STATUS](state, disable) {
    state.supplierStatus = disable;
  },
  [types.USER_SHOW_MENU](state, value){
    state.showMenu = value;
  }
};


export default {

  state,
  getters,
  actions,
  mutations

}
