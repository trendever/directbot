let state = {

  status: 'test'// test | test-over | active | disable

}


let getters = {

  monetizationStatus: state => state.status;

  monetizationTestOver: state => state.status === 'test-over';

  monetizationActive: state => state.status === 'active';


}

import * as types from '../mutation-types';
import * accountService from 'services/account';

let actions = {

  setMonetizationStatus( { commit, state }, value ){

    return new Promise(resolve, reject){


      accountService.list().then(data=>{





      })

    }

  }

}


let mutations = {


  [types.MONETIZATION_SET_STATUS]( state, value) => {

    state.status = value;

  }


}
