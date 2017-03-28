import * as types from '../mutation-types';
import * as getters from '../getters/lead.js';
import * as actions from '../actions/lead.js';

let getCountForLoading = getters.getCountForLoading;

import Vue from 'vue';

// initial state
const state = {
  done: false,
  seller: [],
  customer: [],
  hasMore: {
    seller: true,
    customer: true
  },
  scrollTop: {
    seller: 0,
    customer: 0
  },
  scrollHeight: {
    seller: 0,
    customer: 0
  },
  lengthList: {
    seller: 12,
    customer: 12
  },
  notify_count: {},
  tab: 'customer',
  global_notify_count: 0,
  scrollLogic:{
    seller:{spaceBlock:0,idStart:0,idEnd:30,scroll:0},
    customer:{spaceBlock:0,idStart:0,idEnd:30,scroll:0}
  }
};

function checkUnreadMessage( items ) {
  for ( let i = items.length; i; i-- ) {
    const { chat, id } = items[ i - 1 ];
    if ( chat !== null ) {
      if ( chat.hasOwnProperty( 'unread_count' ) ) {
        state.notify_count[ id ] = chat.unread_count;
      } else {
        state.notify_count[ id ] = 0;
      }
    }
  }
}

// mutations
const mutations = {

  [types.LEAD_INIT]( state, { seller, customer, countUnread, lengthList } ) {

    state.seller              = seller;
    state.customer            = customer;
    state.done                = true;
    state.global_notify_count = state.tab === 'customer' ? 0 : countUnread;
    state.lengthList          = {
      seller: lengthList,
      customer: lengthList
    };
    state.hasMore             = {
      seller: lengthList <= seller.length,
      customer: lengthList <= customer.length
    }

    //check super seller
    if(seller.length) {
      state.tab = "seller";
    }

    checkUnreadMessage( seller );
    checkUnreadMessage( customer );

  },

  [types.LEAD_RECEIVE] ( state, { leads, tab }) {
    console.log("LEADS RECIEVE HERE");
    if ( !state.hasOwnProperty( tab ) ) {
      console.error( `${types.LEAD_RECEIVE}: передан таб который не поддерживается : ${tab}`, state );
    }

    if ( Array.isArray( leads ) ) {

      if ( getCountForLoading > leads.length ) {

        state.hasMore = Object.assign( {}, state.hasMore, { [tab]: false } );

      }

      const matchedId = [];

      for ( let i = state[ tab ].length; i; i-- ) {

        for ( let j = leads.length; j; j-- ) {

          if ( state[ tab ][ i - 1 ].id === leads[ j - 1 ].id ) {

            Vue.set(state[ tab ],i - 1, leads[ j - 1 ] )

            //state[ tab ].$set( i - 1, leads[ j - 1 ] );

            matchedId.push( leads[ j - 1 ].id );

          }

        }

      }

      if ( matchedId.length === 0 ) {

        checkUnreadMessage( leads );

        state[ tab ] = state[ tab ].concat( leads );

      } else if ( matchedId.length !== leads.length ) {

        const newLeads = [];

        for ( let i = leads.length; i; i-- ) {

          let isNew = true;

          for ( let j = matchedId.length; j; j-- ) {

            if ( matchedId[ i - 1 ] === leads[ i - 1 ].id ) {

              isNew = false;
              break;

            }

          }

          if ( isNew ) {
            newLeads.push( leads[ i - 1 ] );
          }

        }

        checkUnreadMessage( newLeads );

        state[ tab ] = state[ tab ].concat( newLeads );

      }

    }

  },

  [types.LEAD_SET_TAB] ( state, { tab = 'customer', lengthList = getCountForLoading } ) {
    console.log("LEAD SET TAB");
    state.tab        = tab;
    /*state.lengthList = {
      seller: lengthList,
      customer: lengthList
    };*/
  },

  [types.LEAD_INC_LENGTH_LIST] ( state, { lengthList = getCountForLoading, tab = null } ) {

    state.lengthList = Object.assign( {}, state.lengthList, { [ tab ]: state.lengthList[ tab ] + lengthList } );

  },

  [types.LEAD_UPDATE] ( state, { conversation_id = null, members = null, parts = null, updated_at = null, status = null } ) {

    if ( conversation_id !== null ) {

      if ( members !== null || parts !== null || updated_at !== null || status !== null ) {

        [ state.seller, state.customer ].forEach( ( leads, groupsIndex, groups ) => {

          leads.forEach( ( lead, index ) => {

            if ( lead.chat !== null ) {
              if ( conversation_id === lead.chat.id ) {

                if ( members !== null ) {
                  lead.chat.members = members;
                }
                if ( parts !== null ) {
                  //try to fix bug
                  if(!lead.chat.recent_message){
                    lead.chat.recent_message = {};
                  }
                  lead.chat.recent_message.parts = parts;
                }
                if ( updated_at !== null ) {
                  lead.updated_at = updated_at;
                }
                if ( status !== null ) {
                  lead.status = status;
                }

                Vue.set(groups[ groupsIndex ], index, lead)
                //groups[ groupsIndex ].$set( index, lead );
              }

            }

          } );

        } );

      }

    }

  },

  [types.LEAD_INC_NOTIFY] ( state, lead_id ) {

    if ( lead_id !== null ) {

      if ( !state.notify_count.hasOwnProperty( lead_id ) ) {

        state.notify_count = Object.assign( {}, state.notify_count, { [ lead_id ]: 1 } );

      } else {

        state.notify_count = Object.assign( {}, state.notify_count, { [ lead_id ]: state.notify_count[ lead_id ] + 1 } );

      }

    }

    state.global_notify_count++;

  },

  [types.LEAD_CLEAR_NOTIFY] ( state, lead_id ) {

    if ( state.notify_count.hasOwnProperty( lead_id ) ) {

      const globalCount = state.global_notify_count - state.notify_count[ lead_id ];

      state.global_notify_count = globalCount >= 0 ? globalCount : 0;

    }

    state.notify_count = Object.assign( {}, state.notify_count, { [ lead_id ]: 0 } );

  },

  [types.LEAD_SET_SCROLL] ( state, { scrollTop, scrollHeight, tab } ) {

    state.scrollTop = Object.assign( {}, state.scrollTop, { [ tab ]: scrollTop } );
    state.scrollHeight = Object.assign( {}, state.scrollHeight, { [ tab ]: scrollHeight } );

  },

  [types.LEAD_CLOSE] ( state ) {

    /*state.lengthList = {
      seller: getCountForLoading,
      customer: getCountForLoading
    };*/

  }

};

export default {
  state,
  getters,
  actions,
  mutations
};
