import channel from './channel/channel.js';

export function get({ user_id, instagram_name }) {

  return new Promise( (resolve, reject) => {

    channel.req('retrieve', 'shop', { user_id, instagram_name })
    .then( data => {

      let shop = data.response_map.shop;
      shop.products_count = data.response_map.products_count;

      resolve(shop);

    }).catch( error => {

      reject({ code: ERROR_CODES.NOT_FOUND, response: error });

    });

  });
}
