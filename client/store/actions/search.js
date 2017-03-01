import * as tagsService from 'services/tags';
import * as types from '../mutation-types';
import { selectedTagsId } from '../getters/search';

export const setSearchValue = ( { commit }, value ) => {

  commit( types.SET_SEARCH_VALUE, value );

};

export const loadTags = (() => {

  // TODO Внимание кеширование тегов.

  // TODO Подумать как регулярно перезапрашивать в фоне комбинации тегов.

  let lastSelectedTagsId = [];

  const result = null;//localStorage.getItem( 'TAGS' );

  const memoize = (result !== null) ? JSON.parse( result ) : {};

  return ( { commit, state } ) => {

    const tags = selectedTagsId( state );

    let neeLoad = false;

    if ( lastSelectedTagsId.length === 0 && tags.length === 0 ) {

      neeLoad = true;

    }

    if ( lastSelectedTagsId.length === tags.length ) {

      for ( let i = 0; i < tags.length; i++ ) {

        if ( tags[ i ] !== lastSelectedTagsId[ i ] ) {

          neeLoad = true;
          break;

        }

      }

    } else {

      neeLoad = true;

    }

    if ( neeLoad ) {

      commit( types.SEARCH_SET_PENDING, true );

      lastSelectedTagsId = tags;

      const key = tags.join( ',' );

      if ( memoize.hasOwnProperty( key ) ) {

        commit( types.RECEIVE_TAGS, memoize[ key ] );
        commit( types.SEARCH_SET_PENDING, false );

        return Promise.resolve( memoize[ key ] );

      }

      return tagsService
        .find( { tags } )
        .then( tags => {
          memoize[ key ] = tags;
         // localStorage.setItem( 'TAGS', JSON.stringify( memoize ) );
          commit( types.RECEIVE_TAGS, tags );
          commit( types.SEARCH_SET_PENDING, false );
        } );

    }

    return Promise.resolve();

  }

})();

export const selectTag = ( store, tag, clear ) => {

  if ( clear === true ) {

    store.commit( types.CLEAR_SEARCH );

  }

  if ( tag.active ) {

    store.commit( types.REMOVE_TAG, tag );

  } else {

    store.commit( types.SELECT_TAG, tag );

  }

  return loadTags( store );

};

export const removeTag = ( store, tag ) => {

  store.commit( types.REMOVE_TAG, tag );

  return loadTags( store );

};

export const clearSearch = ( store ) => {

  store.commit( types.CLEAR_SEARCH );

  return loadTags( store );

};

