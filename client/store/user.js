import * as types from './mutation-types';
import * as profile from 'services/profile';

function getValidUserObject( user, user_id ) {

  if ( user.hasOwnProperty( 'id' ) ) {
    return user
  }

  if ( user.hasOwnProperty( 'User' ) ) {
    return user.User;
  }

  if ( user.hasOwnProperty( 'Shop' ) ) {
    return user.Shop;
  }

  return { id: user_id }

};

function picProfile( profile ) {

  return Object.assign(
    {
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


let getters = {


};

let actions = {

  openProfile( { commit, state }, id ) {
    return new Promise( ( resolve, reject ) => {
      if ( typeof id === 'undefined' ) {

        commit( types.USER_SET_PROFILE, id );

      }

      const requestData = {
        user_id: null,
        instagram_name: null
      };

      const photosConfig = {
        listId: 'profile',
        photosFilter: {
          user_id: null,
          instagram_name: getUserName( state )
        }
      };


      if ( typeof id === 'string' ) {
          requestData.instagram_name               = id;
          photosConfig.listId                      = `profile_${ id }`;
          photosConfig.photosFilter.instagram_name = id;
      }

      if ( requestData.user_id !== null || requestData.instagram_name !== null ) {

        const cacheProfile = getProfile( state, id );

        if ( cacheProfile !== null ) {

          commit( types.USER_SET_PHOTOS_CONFIG, photosConfig.listId, photosConfig.photosFilter, id );
          commit( types.USER_SET_PROFILE, id );
          resolve();

        } else {
          userService
            .get( requestData )
            .then( ( user ) => {
              commit( types.USER_RECEIVE_PROFILE, getValidUserObject( user, id ), id );
              commit( types.USER_SET_PHOTOS_CONFIG, photosConfig.listId, photosConfig.photosFilter, id );
              commit( types.USER_SET_PROFILE, id );
              resolve();
            } )
            .catch( error => {
              reject( error );
              console.error(
                new Error( 'User doesn`t exists or opened incorect url' ),
                {
                  extra: { errorData: error, username: id }
                }
              );
            } );

        }

      } else {

        commit( types.USER_SET_PROFILE );
        commit( types.USER_SET_PHOTOS_CONFIG, photosConfig.listId, photosConfig.photosFilter );
        resolve();
      }

    } );

  },

  authUser( { commit },{ user, token} ) {

    return new Promise( ( resolve, reject ) => {

      const { user: cookieUser } = profile.getProfile();

      if ( typeof token === 'string' && user ) {

        const user_id = profile.saveToken( token );

        profile.saveUser( getValidUserObject( user, user_id ) );

        commit( types.USER_AUTHENTICATED, token );
        commit( types.USER_RECEIVE_PROFILE, profile.getProfile( true ).user );
        commit( types.USER_SET_MY_ID, user_id );

        resolve();

        return null;

      }

      if ( typeof token === 'string' ) {

        const user_id = profile.saveToken( token );

        if ( Number.isFinite( user_id ) ) {

          if ( cookieUser !== null ) {

            if ( user_id === cookieUser.id ) {

              const { user } = profile.getProfile( true );

              profile.saveUser( getValidUserObject( user, user_id ) );

              commit( types.USER_AUTHENTICATED, token );
              commit( types.USER_RECEIVE_PROFILE, user );
              commit( types.USER_SET_MY_ID, user_id );

              resolve();

              return null;

            }

          }

          return userService
            .get( { user_id } )
            .then( ( user ) => {

              profile.saveUser( getValidUserObject( user, user_id ) );

              commit( types.USER_AUTHENTICATED, token );
              commit( types.USER_RECEIVE_PROFILE, profile.getProfile( true ).user );
              commit( types.USER_SET_MY_ID, user_id );

              resolve();

            } )
            .catch( ( error ) => {
              if ( error === 1 ) {
                console.error( '[ USER_NOT_FOUND ]', { user_id } );
              } else {
                console.error( '[ USER_UNDEFINED_ERROR ]', error );
              }
              reject( error );
            } );

        } else {

          console.warn( '[ TOKEN IS NOT CORRECT ]', { token } );

          reject( '[ TOKEN IS NOT CORRECT ]', { token } );

          return null;

        }

      } else {

        const { user, token } = profile.getProfile();

        if ( user && token ) {

          commit( types.USER_AUTHENTICATED, token );
          commit( types.USER_RECEIVE_PROFILE, user );
          commit( types.USER_SET_MY_ID, user.id );

        }

        resolve();

        return null;

      }

    } );

  }


}

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
  [types.USER_RECEIVE_PROFILE] ( state, profile, id = null ) {
    state.all = Object.assign( {}, state.all, { [(id !== null) ? id : profile.id]: picProfile( profile ) } );
  },
  [types.USER_SET_PROFILE] ( state, id = state.myId ) {
    if ( state.all.hasOwnProperty( id ) ) {
      state.id = id;
    }
    state.done = true;
  },
  [types.USER_SET_PHOTOS_CONFIG] ( state, listId, photoFilter, id = state.myId ) {
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
  [types.USER_SET_TOOLTIP](state, name, value) {
    state.tooltips[name] = value;
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
