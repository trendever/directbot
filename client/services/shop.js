import channel from './channel/channel.js';

export function get({ user_id, instagram_name }) {

  return new Promise( (resolve, reject) => {

    channel.req('retrieve', 'shop', { user_id, instagram_name })
    .then( data => {
      resolve(data.response_map.shop);
    }).catch( error => {
      reject({ code: ERROR_CODES.NOT_FOUND, response: error });
    });

  });
}
