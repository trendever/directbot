import store from 'root/store';

import { getCustomerName } from './chat.js';

import { statusString } from 'views/chat/utils';
import config from 'root/../config';


export const getLeadTab = ( leads ) => {

  return leads.tab;

};

export const getLeadsLengthList = ( leads ) => {

  return leads.lengthList[ getLeadTab( leads ) ];

};

export const getHasMore = ( leads ) => {

  return leads.hasMore[ getLeadTab( leads ) ];

};

export const getScroll = ( leads ) => {

  return {
    scrollTop: leads.scrollTop[ getLeadTab( leads ) ],
    scrollHeight: leads.scrollHeight[ getLeadTab( leads ) ]
  };

};

export const getLeads = ( leads ) => {

  if(config.trendever){
    return [...leads.customer, ...leads.seller]
  }

  return leads[ getLeadTab( leads ) ];

};

export const getAllLeads = ( leads ) => {
  return leads;
};

export const getLeadByConversationId = (function() {

  const memoize = {};

  return ( state, conversation_id ) => {

    if ( memoize.hasOwnProperty( conversation_id ) ) {

      return memoize[ conversation_id ];

    }


    const leadGroup = [ 'seller', 'customer' ];

    const finder    = ( { chat } ) => {

      if ( chat !== null ) {

        return chat.id === conversation_id;

      }

    };

    for ( let i = leadGroup.length; i; i-- ) {

      const result = state[ leadGroup[ i - 1 ] ].find( finder )

      if ( result ) {

        memoize[ conversation_id ] = result;
        return result;

      }

    }
    return null;

  }

})();

export const getLeadById = ( state, id ) => {
  const leads = getLeads( state );
  for ( let i = leads.length; i; i-- ) {
    if ( leads[ i - 1 ].id === id ) {
      return leads[ i - 1 ];
    }
  }
  return null;
};

export const getOlderLead = ( state ) => {
  const leads = getLeads( state );
  const times = [];
  for ( let i = leads.length; i; i-- ) {
    times.push( leads[ i - 1 ].updated_at );
  }
  return Math.min.apply( Math, times );
};

export const getIsTab = ( leads ) => {
  return (leads.seller.length > 0) && (leads.customer.length > 0);
};

export const getTitle = ( state ) => {

  return;
  //старая логика
  /*if ( getIsTab( state ) ) {
    return;
  }
  return {
    seller: 'Чаты с покупателями',
    customer: 'Шопинг-чаты'
  }[ getLeadTab( state ) ];*/
};

export const getLastMessage = ( state ) => {

  const messages = {};
  const leads    = getLeads( state );

  for ( let i = leads.length; i; i-- ) {

    const { id, chat } = leads[ i - 1 ];

    if ( chat !== null ) {

      if ( chat.hasOwnProperty( 'recent_message' ) ) {

        if ( chat.recent_message.hasOwnProperty( 'parts' ) ) {

          const mime = chat.recent_message.parts[ 0 ].mime_type;
          const data = chat.recent_message.parts[ 0 ].content;

          let user_name = '';

          if ( chat.recent_message.user ) {

            if ( chat.recent_message.user.name ) {

              user_name = chat.recent_message.user.name;

              if (user_name.indexOf("customer_") >= 0){
                user_name = user_name.replace("customer_","client")
              }

            }

          }

          if (mime === 'text/html') {
            messages[ id ] = {
              message: data,
              user_name
            };

          }

          if ( mime === 'json/status' ) {

            const { type, value } = JSON.parse( data );

            messages[ id ] = {

              message: statusString(type, value, getCustomerName ),
              user_name

            };
          }

          if ( mime === 'image/json' ) {

            messages[ id ] = {

              message: 'фото',
              user_name

            };

          }

          if ( mime === 'text/plain' ) {

            messages[ id ] = {

              message: data,
              user_name

            };
          }

          if ( mime === 'text/json' ) {

            const res   = JSON.parse( data );
            const title = res.title ? res.title : '';

            if ( title.length > 0 ) {

              messages[ id ] = {

                message: `тренд: ${title}`,
                user_name

              };

            } else {

              messages[ id ] = {

                message: `тренд`,
                user_name

              };

            }

          }

        }

      }

    } else {

      messages[ id ] = '';

    }

  }

  return messages;

};

export const getGlobalNotifyCount = state => state.global_notify_count;

export const getNotifyCountList = state => state.notify_count;

export const isEmptyLeads = ( state ) => (state.seller.length === 0) && (state.customer.length === 0);

export const isDoneLead = ( state ) => state.done;

export const getGroup = ( state, lead ) => lead.customer_id === store.getters.userID ? 'customer' : 'seller';

export const getCountForLoading = state => (window.browser.mobile) ? 6 : 12;
