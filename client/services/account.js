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

  		resolve(data);

    }).catch( error => {

      	console.error('ADD ACCOUNT', error);

    });

  });
}

export function list({ role, with_invalids, with_non_owned }) {

  return new Promise( (resolve, reject) => {

    role = "User";

    channel.req('list', 'account', { role, with_invalids, with_non_owned }).then( data => {

      resolve(data);

    }).catch( error => {

        console.error('LIST ACCOUNT', error);

    });

  });
}


export function confirm(code) {

  return new Promise( (resolve, reject) => {

    channel.req('confirm', 'account', { code } ).then( data => {

      resolve(data);

    }).catch( error => {

        console.error('CONFIRM ACCOUNT', error);

    });

  });

}
