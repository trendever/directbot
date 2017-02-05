import channel from './channel/channel.js';

export const ERROR_CODES = {
};

/**
 * Signup user with phone and username
 * (if username is instagram username then instagram=true)
 * @param  {Object} config
 * @return {Promise<bool>}       true if send or code error
 */
export function add(username, password) {
  // this for resend SMS (save locally params)
  // CONFIG = config ? config : CONFIG;

  return new Promise( (resolve, reject) => {

  	let request = { username, password }

  	request.role = "User";

  	request.prefer_email = true;


    channel.req('add', 'account', request).then( data => {

  		console.log("ADD ACCOUNT");

  		resolve(data.response_map);

    }).catch( error => {

      console.error('ADD ACCOUNT', error);
      reject()
    });

  });
}

export function list({ role = 'User', with_invalids, with_non_owned }) {

  return new Promise( (resolve, reject) => {

    channel.req('list', 'account', { role, with_invalids, with_non_owned }).then( data => {

      resolve(data.response_map);

    }).catch( error => {

        console.warn('LIST ACCOUNT', error);
        reject()
    });

  });
}


export function confirm(name,code, password ) {

  return new Promise( (resolve, reject) => {

    channel.req('confirm', 'account', {instagram_username: name, code, password } ).then( data => {

      resolve(data.response_map);

    }).catch( error => {

        console.error('CONFIRM ACCOUNT', error);
        reject()
    });

  });

}
