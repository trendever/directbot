import * as types from '../mutation-types';
import * as accountService from 'services/account';


function getDaysOver(val) {
  let day = 3600 * 24;
  if(val < day)      return 3;
  if(val < day * 2 ) return 2;
  if(val < day * 3 ) return 1;
  if(val > day * 3)  return 0;
}



let state = {

  status: '',// test | test-over | active | disable
  days: 0,
  activity: false

}


let getters = {

  monetizationDays: state => state.days,

  monetizationStatus: state => state.status,

  monetizationTestOver: state => state.status === 'test-over',

  monetizationActive: state => state.status === 'active',

  botActivity: state => state.activity

}


let actions = {

  setMonetization( { commit, state }, value ){

    return new Promise((resolve, reject)=>{

        accountService.list({}).then( data => {

          if( data !== null ) {

            let days = getDaysOver(data[0].created_at_ago)

            if( days === 0) status = 'test-over';

            if( days > 0) status = 'test';

            commit( types.MONETIZATION_SET_STATUS, { status, days } )

          } else {

            commit( types.MONETIZATION_SET_STATUS, {} )

          }

      })

    })

  }

}


let mutations = {


  [types.MONETIZATION_SET_STATUS]( state, { status = null, days = null } ){

    state.status = status;
    state.days = days;
    state.activity = true;

  }


}


export default {

  actions,
  state,
  mutations,
  getters

}
