import * as userService from 'services/user';
import * as shopService from 'services/shop';
import * as profile from 'services/profile.js';
import * as types from '../mutation-types';
import { getUserName, getProfile } from '../getters/user.js';
import { removeToken } from 'services/profile'


export const getValidUserObject = ( user, user_id ) => {

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

export const authUser = ( { commit }, { user, token } ) => {

  return new Promise( ( resolve, reject ) => {

    const { user: cookieUser } = profile.getProfile();

    if ( typeof token === 'string' && user ) {

      const user_id = profile.saveToken( token );

      profile.saveUser( getValidUserObject( user, user_id ) );

      commit( types.USER_AUTHENTICATED, token );
      commit( types.USER_RECEIVE_PROFILE, { profile: profile.getProfile( true ).user });
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
            commit( types.USER_RECEIVE_PROFILE, { profile:  user });
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
            commit( types.USER_RECEIVE_PROFILE, { profile: profile.getProfile( true ).user } );
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
        commit( types.USER_RECEIVE_PROFILE, { profile: user } );
        commit( types.USER_SET_MY_ID, user.id );

      }

      resolve();

      return null;

    }

  } );

};

export const openProfile = ( { commit, state }, id ) => {

  return new Promise( ( resolve, reject ) => {

    if ( typeof id === 'undefined' ) {

      commit( types.USER_SET_PROFILE, id);

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

        commit( types.USER_SET_PHOTOS_CONFIG, { listId: photosConfig.listId, photoFilter:photosConfig.photosFilter, id });
        commit( types.USER_SET_PROFILE, id );
        resolve();

      } else {

        shopService
          .get( requestData )
          .then( ( user ) => {
            commit( types.USER_RECEIVE_PROFILE,{ profile: getValidUserObject( user, id ), id } );
            commit( types.USER_SET_PHOTOS_CONFIG, { listId: photosConfig.listId, photoFilter:photosConfig.photosFilter, id });
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

      Promise.resolve().then(()=>{

        commit( types.USER_SET_PROFILE, id );
        commit( types.USER_SET_PHOTOS_CONFIG, {

          listId: photosConfig.listId,
          photoFilter:photosConfig.photosFilter

        });

      })

      resolve();
    }

  } );

};

export const closeProfile = ( { commit } ) => {

  commit( types.USER_CLOSE_PROFILE );

};

export const logOut = ( { commit } ) => {

  removeToken();

  commit( types.USER_LOGOUT )

};


export const setMyCurrentList = ( { commit }, list ) => {

  commit(types.USER_SET_MY_CURRENT_LIST, list);

};


export const setPayment = ( { commit }, value) => {

  commit(types.USER_SET_PAYMENT, value);

};

export const setUseDays = ({commit}, count) => {

  commit(types.USER_SET_USE_DAYS, count)
}

export const setSupplierStatus = ({ commit }, disable) => {

  commit(types.USER_SET_SUPPLIER_STATUS, disable);

}

export const setShowMenu = ({commit}, value) =>{

  commit(types.USER_SHOW_MENU, value);
}

