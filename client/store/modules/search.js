import * as types from '../mutation-types';
import * as getters from '../getters/search';
import * as actions from '../actions/search';

const storeString = localStorage.getItem( 'SEARCH' );

let state = {
  value: '',
  tags: [],
  selected: [],
  pending: true
};

if ( storeString !== null ) {

  state = JSON.parse( localStorage.getItem( 'SEARCH' ) )

}

const mutations = {

  [ types.SET_SEARCH_VALUE ] ( state, value ) {

    state.value = value;

    localStorage.setItem( 'SEARCH', JSON.stringify( state ) );

  },

  [ types.RECEIVE_TAGS ] ( state, tags ) {

    state.tags    = tags;
    state.pending = false;

    localStorage.setItem( 'SEARCH', JSON.stringify( state ) );

  },

  [ types.SEARCH_SET_PENDING ] ( state, pending ) {

    state.pending = pending;

  },

  [ types.SELECT_TAG ] ( state, { id, name } ) {

    state.tags = state.tags.filter( ( tag ) => {

      if ( tag.id !== id ) {

        return tag;

      }

    } );

    state.selected.push( { id, name, active: true } );

    localStorage.setItem( 'SEARCH', JSON.stringify( state ) );

  },

  [ types.REMOVE_TAG ] ( state, { id, name, all=false } ) {

    state.tags = state.tags.map( ( tag ) => {

      if ( tag.id === id ) {

        return { id, name, active: false }

      } else {

        return tag

      }

    } )

    state.selected = state.selected.filter( ( tag ) => {

      if ( tag.id !== id ) {

        return tag;

      }

    } );

    localStorage.setItem( 'SEARCH', JSON.stringify( state ) );

  },

  [ types.CLEAR_SEARCH ] ( state ) {

    state.value = '';

    state.selected = [];

    state.tags = state.tags.map( ( { id, name } ) => {

      return { id, name, active: false };

    } );

    localStorage.setItem( 'SEARCH', JSON.stringify( state ) );

  }

};

export default {
  state,
  getters,
  actions,
  mutations
};
