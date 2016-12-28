import * as types from '../mutation-types'
import * as messageService from 'services/message.js'
import * as leads from 'services/leads.js'
import * as chat from 'services/chat.js'

import store from 'root/store';

import {
  getId,
  isJoined,
  getMessageByLead,
  getMessages,
  getLastMessageId,
  chatCountForLoading,
  getCurrentMember
} from '../getters/chat.js'

import { userID } from '../getters/user.js'

import { getLeadById, getGroup, getLeadByConversationId } from '../getters/lead.js'


export const setConversation = ( { commit, state }, lead_id ) => {

  function chatJoin( lead_id, callBack ) {
    /**
     * Если пользователь не участник чата то его необходимо присоединить к чату.
     * */
    return chat
      .join( { lead_id } )
      .then( () => {
        return leads
          .get( { lead_id } )
          .then( ( { messages, lead, error } ) => {
            return callBack( { messages, lead, error } )
          } )
          .catch( ( error ) => {
            leads.sendError( error )
          } )

      } )
      .catch( ( error ) => {
        chat.sendError( error )
      } )

  }

  function run( messages = [], lead = {} ) {

    /**
     * Запучкает чат.
     * */
    console.log('%cChat Run!','font-size:1.4rem; color: blue');

    if ( lead.chat ) {
      console.log('%cLead:','font-size:1.4rem; color: blue',JSON.parse(JSON.stringify(lead)));
      if ( lead.chat.id ) {

        const { chat:{ id:conversation_id } } = lead

        if ( Array.isArray( messages ) ) {
          console.log('%cMessages:','font-size:1.4rem; color: blue',JSON.parse(JSON.stringify(messages)));
          if ( messages.length > 0 ) {

            const msg = messages[ messages.length - 1 ]

            if ( store.state.leads.notify_count[ lead_id ] ) {

              const currentRole  = getCurrentMember( state, lead ).role
              const customerRole = chat.MEMBER_ROLES.CUSTOMER

              // TODO Объединить в функцию #logicReading

          //    if (
          //      ( customerRole === currentRole ) ||
          //      ( ( msg.user ) ? ( msg.user.role === customerRole && currentRole !== customerRole ) : true )
          //    ) {
                messageService
                  .update( conversation_id, msg.id )
                  .catch( ( error ) => {
                    messageService.sendError( error, {
                      conversation_id,
                      messages,
                      lastMessageId: msg.id
                    } )
                  } )
                console.log('%cОбновление Сообщений!','font-size:1.4rem; color: blue');
          //    }

            }

          }

        }

        commit( types.CONVERSATION_SET, { id: conversation_id, messages, lengthList: chatCountForLoading } )

      }

    }

  }

  const lead = getLeadById(store.state.leads, lead_id)

  if ( lead !== null ) {

    /**
     * Переход состраницы списка чатов.
     * */

    if ( isJoined( store.state.conversation, lead ) ) {

      return new Promise( ( resolve, reject ) => {

        const messages = getMessageByLead( store.state.conversation, lead )

        if ( /*messages === null*/ !state.allInit[lead.chat.id] ) {

          if ( lead.chat ) {

            if ( lead.chat.id ) {
              console.log('Из чатов');
              return messageService
                .find( lead.chat.id, null, chatCountForLoading, true )
                .then(
                  ( messages ) => {
                    if ( Array.isArray( messages ) ) {
                      run( messages, lead )
                    }
                    resolve()
                  } )
                .catch( ( error ) => {
                  messageService.sendError( error, state )
                  reject( error, state )
                } )

            }

          }

        } else {

          run( messages, lead )

          resolve()

        }

      } )

    } else {

      return chatJoin( lead.id, ( { lead } ) => {

        if ( lead.chat ) {

          commit( types.LEAD_UPDATE, {
            conversation_id: lead.chat.id,
            members: lead.chat.members,
            updated_at: lead.chat.recent_message.created_at * 1e9
          } )

          return setConversation( { commit, state }, lead_id )

        }

      } )

    }

  } else {

    /**
     * Лиды инициализирутся отдельно, setConversation будет вызвана как только лиды инициализируются.
     * Прямой переход на страницу чата.
     * */

    return leads
      .get( { lead_id } )
      .then(
        ( { messages = [], lead, error } ) => {

          if ( error !== null ) {

            if ( error.code === 2 ) { // User in't a member it is mean that user need to join.

              return chatJoin( lead_id, ( { lead } ) => {

                commit( types.LEAD_RECEIVE, {
                  leads: [ lead ],
                  tab: getGroup( store.state.leads, lead )
                } )

                return setConversation( { commit, state }, lead_id )

              } )

            }

          } else {
            console.log('Запускается здесь');
            commit( types.LEAD_RECEIVE, {
              leads: [ lead ],
              tab: getGroup( store.state.leads, lead )
             } )
            return messageService
                .find( lead.chat.id, null, chatCountForLoading )
                .then(
                  ( messages ) => {
                    if ( Array.isArray( messages ) ) {
                      run( messages, lead )
                    }
                    resolve()
                  } )
                .catch( ( error ) => {
                  messageService.sendError( error, state )
                  reject( error, state )
                } )

          }

        } )
      .catch( ( error ) => {

        leads.sendError( error, state )
        return error

      } )

  }

}

export const loadMessage = (() => {

  const hasMore = {};

  return ( { commit, state } ) => {

    if ( !hasMore.hasOwnProperty( state.id ) ) {

      hasMore[ state.id ] = true

    }

    return new Promise( ( resolve, reject ) => {

      const messages = getMessages( state )
      const id       = state.id

      if ( Array.isArray( messages ) ) {

        if ( hasMore[ state.id ] ) {

          return messageService
            .find( id, messages.length > 0 ? messages[ 0 ].id : undefined, chatCountForLoading, true )
            .then(
              ( messages ) => {

                if ( messages === null || messages.length < chatCountForLoading ) {

                  hasMore[ state.id ] = false;

                }

                if ( Array.isArray( messages ) ) {

                  commit( types.CONVERSATION_LOAD_MESSAGE, messages )
                  commit( types.CONVERSATION_INC_LENGTH_LIST, messages.length )
                  resolve( messages )

                }

              },
              ( error ) => {

                messageService.sendError( error, state )
                reject()

              }
            )

        }

        if ( !hasMore[ state.id ] && messages.length >= state.lengthList ) {

          commit( types.CONVERSATION_INC_LENGTH_LIST, chatCountForLoading )

          resolve( messages );

          return null;

        }

        resolve( null )

      } else {

        reject()

        console.error( '[ loadMessage ]: messages must be array' )

      }

    } )

  }

})();

export const createMessage = ( { commit, state },{ conversation_id, text, mime_type } ) => {

  const beforeLoadId = Math.random()

  const rowMessage = [
    {
      beforeLoadId,
      loaded: false,
      conversation_id: conversation_id,
      user_id: userID (store.state.user),
      parts: [
        {
          content: text,
          mime_type: mime_type
        }
      ],
      created_at: null,
      id: Date.now() + beforeLoadId,
      user: {
        user_id: userID( store.state.user )
      }
    }
  ]

  commit( types.CONVERSATION_RECEIVE_MESSAGE, { messages: rowMessage, id: conversation_id } )

  return messageService
    .create( conversation_id, text, mime_type )
    .then( ( { chat, messages, error } ) => {

      commit( types.CONVERSATION_CONFIRM_MSG, { beforeLoadId, newMessage: messages[ 0 ], id: conversation_id } )

    } )
    .catch( ( error ) => {

      messageService.sendError( error, state )

    } )

}

export const receiveMessage = ( { commit, state }, conversation_id, messages ) => {
  console.log("RECEIVE MESSAGE!");
  console.log(conversation_id);
  console.log("MESSAGES");
  console.log(messages);
  if ( Array.isArray( messages ) ) {

    if ( messages.length > 0 ) {

      const msg = messages[ messages.length - 1 ]

      const msgUserId = msg.user ? msg.user.user_id : null

      commit( types.CONVERSATION_RECEIVE_MESSAGE, { messages, id: conversation_id } )


      console.log(msg.conversation_id)
      console.log(msg)

      if ( userID( store.state.user ) !== msgUserId ) {

        if ( state.id === msg.conversation_id ) {

          if ( getLastMessageId( state ) !== msg.id ) {

            const currentRole  = getCurrentMember( state ).role
            const customerRole = chat.MEMBER_ROLES.CUSTOMER

            // TODO Объединить в функцию #logicReading

            if (
              ( customerRole === currentRole ) ||
              ( ( msg.user ) ? ( msg.user.role === customerRole && currentRole !== customerRole ) : true )
            ) {

              messageService
                .update( conversation_id, msg.id )
                .catch( ( error ) => {
                  messageService.sendError( error, {
                    conversation_id,
                    messages,
                    lastMessageId: msg.id
                  } )
                } )

              return null

            }

          }

        }

      }

      if ( msg.parts[ 0 ].mime_type === 'json/status' ) {

        commit( types.CONVERSATION_CONFIRM_STATUS_MSG,{ messages, id: conversation_id })

      }

    }

  }

}

export const addPreLoadMessage = ( { commit, state }, base64, base64WithPrefix, MIME, { width, height } ) => {

  const beforeLoadId = Math.random()

  const preLoadMessage = {
    id: Date.now() + beforeLoadId,
    beforeLoadId,
    loaded: false,
    conversation_id: getId( state ),
    created_at: null,
    user_id: store.getters.userID( state ),
    user: {
      user_id: store.getters.userID( state )
    },
    parts: [
      {
        content: {
          link: base64WithPrefix,
          width,
          height
        },
        mime_type: 'image/base64'
      }
    ]
  }

  commit( types.CONVERSATION_RECEIVE_MESSAGE, { messages: [ preLoadMessage ], id: getId( state ) } )

  messageService.create( getId( state ), base64, MIME ).then( ( { messages } ) => {

    commit( types.CONVERSATION_CONFIRM_MSG, { beforeLoadId, newMessage: messages[ 0 ], id: getId( state ) })

  }, messageService.sendError )

}

export const setStatus = ( { commit, state }, status, type, cancel_reason = null ) => {

  const statusMap = {
    COMPLETE: 'COMPLETED',
    DELIVERY: 'ON_DELIVERY',
    SUBMIT: 'SUBMITTED',
    CANCEL: 'CANCELLED'
  }

  const messages = getMessages( state )

  const { parts } = messages[ messages.length - 1 ]

  commit( types.CONVERSATION_SEND_STATUS )

  /**
   * Добавлять одинаковый статус нет необходимости.
   * */

  if ( parts[ 0 ].mime_type === "json/status" ) {

    if ( JSON.parse( parts[ 0 ].content ).value === statusMap[ status ] ) {

      return null

    }

  }

  const dirtyStatusMessage = [
    {
      dirty: true,
      id: Date.now() + Math.random(),
      conversation_id: state.id,
      parts: [ {
        content: JSON.stringify( {
          type: type,
          value: statusMap[ status ]
        } ),
        mime_type: "json/status"
      } ],
      created_at: null
    }
  ]

  const lead = getLeadByConversationId(store.state.leads, state.id )

  if ( lead !== null ) {

    commit( types.CONVERSATION_RECEIVE_MESSAGE, dirtyStatusMessage, state.id )

    return new Promise( ( resolve, reject ) => {
      leads
        .setEvent( lead.id, status, cancel_reason )
        .then( ( { status } ) => {
          resolve( status )
        } )
        .catch( error => {
          reject( error )
        } )
    } )

  } else {

    console.error( '[ ACTION/CHAT ] - В момент установки статуса lead не может быть null.', {
      conversation_id: state.id
    } )

  }

}

export const onMessagesChat = ( { commit, state },  data  ) => {
  if ( data.response_map ) {

    if ( data.response_map.chat && data.response_map.messages ) {

      const conversation_id = data.response_map.chat.id
      const messages        = data.response_map.messages

      return receiveMessage( { commit, state }, conversation_id, messages )

    }

  }

  return null

}

export const setShowMenu = ( { commit }, showMenu ) => {

  commit( types.CONVERSATION_SET_SHOW_MENU, showMenu )

}

export const setShowStatusMenu = ( { commit }, showStatusMenu ) => {

  commit( types.CONVERSATION_SET_SHOW_STATUS_MENU, showStatusMenu )

}

export const setShowCancelMenu = ( { commit }, showCancelMenu ) => {

  commit( types.CONVERSATION_SET_SHOW_CANCEL_MENU, showCancelMenu );

}

export const closeConversation = ( { commit } ) => {

  commit(types.CONVERSATION_SET_ACTION, '');
  commit( types.CONVERSATION_CLOSE );

}

export const openPopUp = ( { commit }, { url = false, width = 0, height = 0 } ) => {

  commit( types.CONVERSATION_OPEN_IMG_POPUP, { url, width, height } );

}

export const closeImgPopUp = ( { commit }) => {

  commit( types.CONVERSATION_CLOSE_IMG_POPUP);

}

export const setConversationAction = (({commit}, value)=>{

  commit( types.CONVERSATION_SET_ACTION, value);

})

export const setConversationActionData = (({commit}, value)=>{

  commit( types.CONVERSATION_SET_ACTION_DATA, value);

})

export const setConversationImgLoader = ({commit}, value) => {
  commit( types.CONVERSATION_SET_IMG_LOADER, value);
}
