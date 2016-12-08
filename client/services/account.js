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
  	let request = {username,password}
  	request.role = "User";
  	request.prefer_email = true;

    channel.req('add', 'account', request).then( data => {
		console.log("ADD ACCOUNT");
		console.log(data);
    }).catch( error => {
      	console.error('ADD ACCOUNT', error);
    });

  });
}