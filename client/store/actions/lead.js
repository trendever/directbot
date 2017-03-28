import * as types from '../mutation-types';

import * as leads from 'services/leads.js';

import * as message from 'services/message';

import store from '../index';

import {

  getOlderLead,
  getLeadByConversationId,
  getLeadTab,
  getHasMore,
  getLeads,
  getLeadsLengthList,
  getGroup,
  getCountForLoading

} from '../getters/lead';


export const initLead = ( { commit } ) => {

  return new Promise( ( resolve, reject ) => {

    Promise
      .all( [
        message.getCountUnread(),
        leads.find( getCountForLoading )
      ] )
      .then(
        ( [countUnread, { customer, seller }] ) => {
          commit( types.LEAD_INIT, {
            customer,
            seller,
            countUnread,
            lengthList: getCountForLoading
          } );
          resolve();
        },
        ( errors ) => {
          message.sendError( errors[ 0 ] );
          leads.sendError( errors[ 1 ] );
          reject();
        }
      );

  } );

};

export const incLengthList = ( { commit, state }, count = getCountForLoading ) => {

  commit( types.LEAD_INC_LENGTH_LIST, {
    lengthList: count,
    tab: getLeadTab(state)
  } );

};

export const loadLeads = ( { commit, state }, count = getCountForLoading ) => {

  return new Promise( ( resolve, reject ) => {

    const tab = getLeadTab( state );

    if ( getLeads( state ).length > (getLeadsLengthList( state ) + count) ) {

      incLengthList( { commit, state }, (!getHasMore( state )) ? count * 2 : count );
      resolve();

    } else {

      if ( true /*getHasMore( state )*/ ) {


        //-Тупо правим ошибку загрузки чатов для магазина
        let newTab = tab;
        let user = store.state.user;
        let profile = user.all[user.myId]
        if(profile){
          if(profile.supplier_of !== null){
            newTab = 'seller,supplier'
          }
        }
        //------------------------------------------
        leads
          .find( count, getOlderLead( state ), newTab/*tab */)
          .then(
            ( { leads } ) => {
              incLengthList( { commit, state }, leads.length );
              commit( types.LEAD_RECEIVE, { leads, tab } );
              resolve( leads.length );
            },
            ( error ) => {
              leads.sendError( error );
              reject();
            }
          );

      } else {

        resolve();

      }

    }

  } );

};

export const createLead = ( { commit, state }, product_id ) => {

  return leads
    .create( product_id )
    .then(
      ( lead ) => {
        incLengthList( { commit, state }, 1 );
        commit( types.LEAD_RECEIVE, {leads: [ lead ], tab: 'customer'} );
        return lead;
      },
      leads.sendError
    );

};

export const setTab = ( { commit }, tab ) => {

  commit( types.LEAD_SET_TAB, { tab, lengthList: getCountForLoading } );

};

export const setScrollLeads = ( { commit, state }, { scrollTop, scrollHeight } ) => {

  commit( types.LEAD_SET_SCROLL, { scrollTop, scrollHeight , tab: getLeadTab( state ) } )

}

export const onMessagesLead = (
  { commit, state },
   { response_map:{ chat:{ id:conversation_id, members }, messages } }
) => {

  function handler( lead ) {

    const MIME       = messages[ 0 ].parts[ 0 ].mime_type;
    const updated_at = messages[ 0 ].created_at * 1e9;
    const parts      = messages[ 0 ].parts;

    if ( MIME === "json/status" ) {

      const value = JSON.parse( messages[ 0 ].parts[ 0 ].content ).value;

      commit( types.LEAD_UPDATE, Object.assign( {
        conversation_id,
        members,
        updated_at
      }, (typeof value !== 'undefined') ? { status: leads.getStatusCode( value ) } : {} ) );

    }

    if ( MIME === "text/plain" ) {

      commit( types.LEAD_UPDATE, { conversation_id, members, parts, updated_at } );

      if ( state.id !== conversation_id ) {

        commit( types.LEAD_INC_NOTIFY, (lead !== undefined) ? lead.id : null );

      }

    }

    if ( MIME === "image/base64" ) {

      commit( types.LEAD_UPDATE, { conversation_id, members, parts: '', updated_at } );

      if ( state.id !== conversation_id ) {

        commit( types.LEAD_INC_NOTIFY, (lead !== undefined) ? lead.id : null );

      }
    }

  }

  const lead = getLeadByConversationId( state, conversation_id );

  if ( lead ) {

    handler( lead );

  } else {

    leads
      .get( { conversation_id } )
      .then(
        ( { lead } ) => {
          // TODO Спросить как можно определить, для текущего пользователя lead в покупаю || продаю.
          commit( types.LEAD_RECEIVE, { leads: [ lead ], tab: getGroup( state, lead ) } );
          handler( lead );
        } )
      .catch( ( error ) => {
        leads.sendError( error, state );
      } );

  }

};

export const onMessageReadLead = ( { commit, state }, data ) => {

  if ( data.response_map ) {
    if ( data.response_map.chat ) {
      if ( Array.isArray( data.response_map.chat.members ) ) {

        const lead = getLeadByConversationId( state, data.response_map.chat.id );

        if ( lead ) {

          if ( lead.chat ) {

            commit( types.LEAD_UPDATE, {
              conversation_id: lead.chat.id,
              members: data.response_map.chat.members,
              updated_at: lead.chat.recent_message ? lead.chat.recent_message.created_at * 1e9 : null
            } );

          }

        }

      }
    }
  }

};

export const clearNotify = ( { commit }, lead_id ) => {

  commit( types.LEAD_CLEAR_NOTIFY, lead_id );

};

export const leadClose = ( { commit } ) => {

  commit( types.LEAD_CLOSE );

};
